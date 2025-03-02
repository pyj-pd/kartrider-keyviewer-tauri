import {
  configFileRelativePath,
  defaultKeyViewerConfig,
} from "@/constants/config"
import { useFileHandler } from "./useFileHandler"
import { useConfigStore } from "@/stores/useConfigStore"
import { KeyViewerConfigV1 } from "@/types/config"
import { logMessages } from "@/constants/log-messages"
import { useLogMessage } from "./useLogMessage"

/**
 * Handler for handling config files.
 * @returns Functions for saving and loading config file
 */
export const useConfigFile = () => {
  const configStore = useConfigStore()
  const { getFileData, saveDataToFile } = useFileHandler(
    configFileRelativePath,
    KeyViewerConfigV1,
  )
  const { writeLogMessage } = useLogMessage()

  /**
   * Loads config file and mutate the config store.
   */
  const loadConfigFile = async () => {
    try {
      const configFileData = await getFileData(defaultKeyViewerConfig)

      if (configFileData === null) {
        // No config file
        writeLogMessage(
          {
            detail: logMessages.config.noFileFallbackDefault,
          },
          false,
        )
        return
      }

      configStore.$patch(configFileData)
    } catch {
      // Fallback to default config because of error
      await saveConfigAsFile(true) // Save default data to file
      writeLogMessage({
        detail: logMessages.config.failedToLoadFallbackDefault,
        severity: "error",
      })
    }
  }

  /**
   * Saves config store data to the config file.
   * @param shouldCreateBackup Whether to create backup file before saving.
   */
  const saveConfigAsFile = async (shouldCreateBackup: boolean = false) =>
    // Write to the file
    saveDataToFile(configStore.$state, shouldCreateBackup, "update_config")

  return { loadConfigFile, saveConfigAsFile }
}
