import { useConfigStore } from "@/stores/useConfigStore"
import { useConfigFile } from "../useConfigFile"
import { useKeyTemplateFile } from "../useKeyTemplateFile"
import { storeToRefs } from "pinia"
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import { watch } from "vue"

/**
 * Initialize config updater so that changes in config store lead to automatic config file update.
 * Should only be used on `SettingsWebview` components once.
 */
export const initConfigUpdater = () => {
  const configStore = useConfigStore()
  const { saveConfigAsFile } = useConfigFile()

  const { keyTemplate } = storeToRefs(useKeyViewerStore())
  const { saveKeyTemplateAsFile } = useKeyTemplateFile()

  configStore.$subscribe(() => saveConfigAsFile())

  watch(keyTemplate, () => saveKeyTemplateAsFile(), { deep: true })
}
