import { onBeforeUnmount, onMounted, ref } from "vue"
import { useConfigFile } from "./useConfigFile"
import { useConfigModifiedStore, useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import { listen, type UnlistenFn } from "@tauri-apps/api/event"

/**
 * Initialize config store by loading config file data for the first time. Should only be used on `App` components once.
 */
export const initConfigStore = () => {
  const configStore = useConfigStore()
  const { isConfigModified } = storeToRefs(useConfigModifiedStore())

  const isConfigLoaded = ref<boolean>(false)
  const { loadConfigFile } = useConfigFile()

  let configUpdateListener: UnlistenFn

  onMounted(async () => {
    // Listen to config update
    configUpdateListener = await listen<string>("config-updated", () =>
      loadConfigFile(),
    )

    // Load initial config from the config file
    try {
      await loadConfigFile()
    } catch {
      console.error(
        "Failed to load default config file. Fallback to default config.",
      )
    } finally {
      isConfigLoaded.value = true
    }
  })

  onBeforeUnmount(() => {
    configUpdateListener()
  })

  configStore.$subscribe(() => {
    if (isConfigLoaded.value === false) return

    isConfigModified.value = true
  })

  return { isConfigLoaded }
}
