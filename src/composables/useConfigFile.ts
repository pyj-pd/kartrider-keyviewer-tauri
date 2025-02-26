import { configFilePath } from "@/constants/config"
import { useFileHandler } from "./useFileHandler"
import { useConfigStore } from "@/stores/useConfigStore"
import { KeyViewerConfigV1 } from "@/types/config"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

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

  /**
   * Loads config file and mutate the config store.
   * @returns `true` if successfully read the file, `false` if no config file exists.
   */
  const loadConfigFile = async () => {
    const configFileData = await getFileData()

    if (configFileData === null) return false // No config file

    configStore.$patch(configFileData)
    return true
  }

  /**
   * Saves config store data to the config file.
   */
  const saveConfigAsFile = async () => {
    // Write to the file
    await saveDataToFile(configStore.$state)

    // Ping all windows
    await invoke("update_config", {
      from: await getCurrentWebviewWindow().label,
    })
  }

  return { loadConfigFile, saveConfigAsFile }
}
