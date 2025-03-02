import {
  copyFile,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import type { ZodType } from "zod"
import { path } from "@tauri-apps/api"
import { baseDir } from "@/constants/path"
import _ from "lodash"
import { computed, isRef, type Ref } from "vue"

type _FileRelativePath = string | null

/**
 * Prevent backup being created by multiple windows.
 */
export const CREATE_BACKUP_WINDOW = "keyviewer"

const fileSaveDebounce = 300 // ms

/**
 * Handler for saving, loading files.
 *
 * Mostly used internally.
 * - Use `useConfigFile` for handling config file.
 * - Use `useKeyTemplateFile` for handling key template file.
 * @param fileRelativePathArgument Relative path of file as ref or normal value. Should be resolved in order to be handled correctly.
 * @param zodValidator Zod validator for parsing the file
 * @returns Functions for saving, loading the file
 */
export const useFileHandler = <FileType>(
  fileRelativePathArgument: _FileRelativePath | Ref<_FileRelativePath>,
  zodValidator: ZodType<FileType>,
) => {
  const fileRelativePath = computed<_FileRelativePath>(() =>
    isRef(fileRelativePathArgument)
      ? fileRelativePathArgument.value
      : fileRelativePathArgument,
  )

  let debounceTimer: NodeJS.Timeout | null = null

  /**
   * Saves data to the file.
   * @param data Data to write.
   * @param shouldCreateBackup Whether to create backup file before saving.
   */
  const saveDataToFile = async (
    data: FileType,
    shouldCreateBackup: boolean = false,
  ) => {
    if (debounceTimer !== null) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(
      () => _writeDataToFile(data, shouldCreateBackup),
      fileSaveDebounce,
    )
  }

  /**
   * Saves data to the file. Internal.
   */
  const _writeDataToFile = async (
    data: FileType,
    shouldCreateBackup: boolean = false,
  ) => {
    if (fileRelativePath.value === null)
      throw new Error("No config file path passed.")

    const filePath = await path.join(baseDir, fileRelativePath.value)

    if (
      shouldCreateBackup &&
      getCurrentWebviewWindow().label === CREATE_BACKUP_WINDOW
    ) {
      // Create backup
      const backupFilePathBase = `${filePath}.backup`
      let backupFilePath: string = backupFilePathBase

      // Check for duplicates
      let backupFileTries: number = 0
      while (await exists(backupFilePath)) {
        backupFileTries++
        backupFilePath = `${backupFilePathBase}${backupFileTries}`
      }

      // Copy
      await copyFile(filePath, backupFilePath)
    }

    const configDataString = JSON.stringify(data, undefined, 2)

    // Write to the file
    await writeTextFile(filePath, configDataString)

    // Ping all windows
    await invoke("update_config", {
      from: getCurrentWebviewWindow().label,
    })
  }

  /**
   * Reads file and returns data of the file.
   * @param defaultDataToMergeWith If this parameter is passed, it will accept partial match of the data, and merge rest of the file data with default data provided.
   * @returns Data of the file if the file exists, otherwise `null`.
   * @throws Error if data parsing failed.
   */
  const getFileData = async (
    defaultDataToMergeWith?: FileType,
  ): Promise<FileType | null> => {
    if (fileRelativePath.value === null)
      throw new Error("No config file path passed.")

    const filePath = await path.join(baseDir, fileRelativePath.value)
    if (!(await exists(filePath))) return null // File doesn't exist

    // Read file
    const rawFileData = await readTextFile(filePath)

    let fileData = JSON.parse(rawFileData)

    if (defaultDataToMergeWith !== undefined)
      // Merge with default data first before parsing
      fileData = _.merge(structuredClone(defaultDataToMergeWith), fileData)

    // Parse data and return
    const data = zodValidator.parse(fileData)

    return data
  }

  return {
    saveDataToFile,
    getFileData,
  }
}
