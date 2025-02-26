import { exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import type { ZodType } from "zod"
import { path } from "@tauri-apps/api"
import { baseDir } from "@/constants/path"

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
   * @@param data Data to write.
   */
  const saveDataToFile = async (data: FileType) => {
    if (filePath === null) throw new Error("No config file path passed.")

    const resolvedFilePath = await path.join(baseDir, filePath)
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
   * @returns Data of the file if the file exists, otherwise `null`.
   */
  const getFileData = async (): Promise<FileType | null> => {
    if (filePath === null) throw new Error("No config file path passed.")

    const resolvedFilePath = await path.join(baseDir, filePath)
    if (await exists(resolvedFilePath)) {
      // Read file
      const rawFileData = await readTextFile(resolvedFilePath)

      const data = zodValidator.parse(JSON.parse(rawFileData))

      return data
    } else {
      // File doesn't exist
      return null
    }
  }

  return {
    saveDataToFile,
    getFileData,
  }
}
