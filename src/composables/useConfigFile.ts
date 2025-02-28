import { configFilePath, defaultKeyViewerConfig } from "@/constants/config"
import { useFileHandler } from "./useFileHandler"
import { useConfigStore } from "@/stores/useConfigStore"
import { KeyViewerConfigV1 } from "@/types/config"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { logMessages } from "@/constants/log-messages"
import { useLogMessage } from "./useLogMessage"

/**
 * Handler for handling config files.
 * @returns Functions for saving and loading config file
 */
export const useConfigFile = () => {
  const configStore = useConfigStore()
  const { getFileData, saveDataToFile } = useFileHandler(
    configFilePath,
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
      saveConfigAsFile(true) // Save default data to file
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
  const saveConfigAsFile = async (shouldCreateBackup: boolean = false) => {
    // Write to the file
    await saveDataToFile(configStore.$state, shouldCreateBackup)

    // Ping all windows
    await invoke("update_config", {
      from: await getCurrentWebviewWindow().label,
    })
  }

  return { loadConfigFile, saveConfigAsFile }
}
