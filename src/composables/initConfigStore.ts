import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import { listen, type UnlistenFn } from "@tauri-apps/api/event"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { useConfigFile } from "./useConfigFile"
import { useKeyTemplateFile } from "./useKeyTemplateFile"
import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"

/**
 * Initialize config store by loading config file and key template data for the first time.
 * Should only be used on `App` components once.
 */
export const initConfigStore = () => {
  // Config
  const isConfigLoaded = ref<boolean>(false)
  const { loadConfigFile } = useConfigFile()

  // Key template
  const { keyTemplatePath } = storeToRefs(useConfigStore())
  const { loadKeyTemplateFile } = useKeyTemplateFile()

  let configUpdateListener: UnlistenFn
  let keyTemplateUpdateListener: UnlistenFn

  // Apply key template if path changes
  watch(
    keyTemplatePath,
    async () => {
      // @todo add error listener
      await loadKeyTemplateFile()
    },
    { immediate: true },
  )

  onMounted(async () => {
    // Listen to config update
    const currentWindow = await getCurrentWebviewWindow()

    configUpdateListener = await listen<string>(
      "config-updated",
      async (event) => {
        // @todo add error listener
        if (currentWindow.label !== event.payload) await loadConfigFile() // Reload config upon change
      },
    )

    // Listen to key template update
    keyTemplateUpdateListener = await listen<string>(
      "template-updated",
      async (event) => {
        if (currentWindow.label !== event.payload) await loadKeyTemplateFile() // Reload key template upon change
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

    // Loading key template initially will be automatic and doesn't need to be specified here.
    // When `keyTemplatePath` changes in config store, it will be automatically reloaded.
  })

  onBeforeUnmount(() => {
    // Unlisten update listeners
    configUpdateListener()
    keyTemplateUpdateListener()
  })

  return { isConfigLoaded }
}
