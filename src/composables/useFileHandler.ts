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

/**
 * Handler for saving, loading files.
 *
 * Mostly used internally.
 * - Use `useConfigFile` for handling config file.
 * - Use `useKeyTemplateFile` for handling key template file.
 * @param filePath Path of file. Should be resolved in order to be handled correctly.
 * @param zodValidator Zod validator for parsing the file
 * @returns Functions for saving, loading the file
 */
export const useFileHandler = <FileType>(
  filePath: string | null,
  zodValidator: ZodType<FileType>,
) => {
  /**
   * Saves data to the file.
   * @param data Data to write.
   * @param shouldCreateBackup Whether to create backup file before saving.
   */
  const saveDataToFile = async (
    data: FileType,
    shouldCreateBackup: boolean = false,
  ) => {
    if (filePath === null) throw new Error("No config file path passed.")

    const resolvedFilePath = await path.join(baseDir, filePath)

    if (shouldCreateBackup) {
      // Create backup
      const resolvedBackupFilePathBase = `${resolvedFilePath}.backup`
      let resolvedBackupFilePath: string = resolvedBackupFilePathBase

      // Check for duplicates
      let backupFileTries: number = 0
      while (await exists(resolvedBackupFilePath)) {
        backupFileTries++
        resolvedBackupFilePath = `${resolvedBackupFilePathBase}${backupFileTries}`
      }

      // Copy
      await copyFile(resolvedFilePath, resolvedBackupFilePath)
    }

    const configDataString = JSON.stringify(data, undefined, 2)

    // Write to the file
    await writeTextFile(resolvedFilePath, configDataString)

    // Ping all windows
    await invoke("update_config", {
      from: await getCurrentWebviewWindow().label,
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
    if (filePath === null) throw new Error("No config file path passed.")

    const resolvedFilePath = await path.join(baseDir, filePath)
    if (!(await exists(resolvedFilePath))) return null // File doesn't exist

    // Read file
    const rawFileData = await readTextFile(resolvedFilePath)

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
