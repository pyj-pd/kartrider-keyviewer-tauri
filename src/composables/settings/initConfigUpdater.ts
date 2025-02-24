import { useConfigStore } from "@/stores/useConfigStore"
import { useConfigFile } from "../useConfigFile"

/**
 * Initialize config updater so that changes in config store lead to automatic config file update.
 * Should only be used on `SettingsWebview` components once.
 */
export const initConfigUpdater = () => {
  const configStore = useConfigStore()

  const { saveConfigAsFile } = useConfigFile()

  configStore.$subscribe(() => {
    saveConfigAsFile()
  })
}
