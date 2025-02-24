import { useConfigModifiedStore, useConfigStore } from "@/stores/useConfigStore"
import { KeyViewerConfig } from "@/types/config"
import { storeToRefs } from "pinia"

import { exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs"
import * as path from "@tauri-apps/api/path"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

const baseDir = await path.resourceDir()
const configFilePath = await path.join(baseDir, "config.json")

export const useConfigFile = () => {
  const configStore = useConfigStore()
  const configData = storeToRefs(configStore)
  const { clearModifiedKeys } = useConfigModifiedStore()

  /**
   * Saves config store data to the config file.
   */
  const saveConfigAsFile = async () => {
    const configDataString = JSON.stringify(configStore.$state, undefined, 2)

    // Write to the file
    await writeTextFile(configFilePath, configDataString)

    // Clear modified keys
    clearModifiedKeys()

    // Ping all windows
    await invoke("update_config", {
      from: await getCurrentWebviewWindow().label,
    })
  }

  /**
   * Loads config file and mutate the config store.
   * @returns `true` if successfully read the file, `false` if no config file exists.
   */
  const loadConfigFile = async (): Promise<boolean> => {
    if (await exists(configFilePath)) {
      // Read file
      const rawConfigFileData = await readTextFile(configFilePath)

      const configFileData = KeyViewerConfig.parse(
        JSON.parse(rawConfigFileData),
      )
      configStore.$patch(configFileData)

      // Clear modified keys
      clearModifiedKeys()

      return true
    } else {
      // Use default config
      // (nothing will happen)
      return false
    }
  }

  return { saveConfigAsFile, loadConfigFile, configData }
}
