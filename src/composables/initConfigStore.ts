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
    [keyTemplatePath, isConfigLoaded],
    async () => {
      if (isConfigLoaded.value === false) return

      await loadKeyTemplateFile()
    },
    {
      immediate: true,
    },
  )

  onMounted(async () => {
    // Listen to config update
    const currentWindow = getCurrentWebviewWindow()

    configUpdateListener = await listen<string>(
      "config-updated",
      async (event) => {
        // Reload config upon change
        if (currentWindow.label !== event.payload) await loadConfigFile()
      },
    )

    // Listen to key template update
    keyTemplateUpdateListener = await listen<string>(
      "template-updated",
      async (event) => {
        if (currentWindow.label !== event.payload)
          // Reload key template upon change
          await loadKeyTemplateFile()
      },
    )

    // Load initial config from the config file
    await loadConfigFile()
    isConfigLoaded.value = true

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
