import { onBeforeUnmount, onMounted, ref } from "vue"
import { useConfigFile } from "./useConfigFile"
import { listen, type UnlistenFn } from "@tauri-apps/api/event"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

/**
 * Initialize config store by loading config file data for the first time. Should only be used on `App` components once.
 */
export const initConfigStore = () => {
  const isConfigLoaded = ref<boolean>(false)
  const { loadConfigFile } = useConfigFile()

  let configUpdateListener: UnlistenFn

  onMounted(async () => {
    // Listen to config update
    const currentWindow = await getCurrentWebviewWindow()

    configUpdateListener = await listen<string>(
      "config-updated",
      async (event) => {
        if (currentWindow.label !== event.payload) await loadConfigFile() // Reload config upon change
      },
    )

    // Load initial config from the config file
    try {
      if ((await loadConfigFile()) === true)
        console.log("Config loaded successfully.")
      else console.log("No config file found. Using default config.")
    } catch {
      console.error(
        "Failed to load default config file. Looks like its structure is damaged. Fallback to default config.",
      )
    } finally {
      isConfigLoaded.value = true
    }
  })

  onBeforeUnmount(() => {
    configUpdateListener() // Unlisten config update listener
  })

  return { isConfigLoaded }
}
