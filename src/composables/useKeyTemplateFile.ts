import { useConfigStore } from "@/stores/useConfigStore"
import { useKeyViewerStore } from "@/stores/useKeyViewerStore"
import { storeToRefs } from "pinia"
import { useFileHandler } from "./useFileHandler"
import { KeyTemplate } from "@/types/key-templates"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

/**
 * Handler for handling key template files.
 * @returns Functions for saving and loading key template file
 */
export const useKeyTemplateFile = () => {
  const { keyTemplate } = storeToRefs(useKeyViewerStore())
  const { keyTemplatePath } = storeToRefs(useConfigStore())

  const { getFileData, saveDataToFile } = useFileHandler(
    keyTemplatePath.value,
    KeyTemplate,
  )

  /**
   * Loads key template file and mutate the key template store.
   * @returns `true` if successfully read the file, `false` if no key template file exists.
   */
  const loadKeyTemplateFile = async () => {
    const keyTemplateFileData = await getFileData()

    if (keyTemplateFileData === null) return false // No key template file

    keyTemplate.value = keyTemplateFileData
    return true
  }

  /**
   * Saves key template store data to the key template file.
   * @returns `true` if successfully wrote the file, `false` if no key template data is provided.
   */
  const saveKeyTemplateAsFile = async () => {
    if (keyTemplate.value === null) return false

    // Write to the file
    await saveDataToFile(keyTemplate.value)

    // Ping all windows
    await invoke("update_template", {
      from: await getCurrentWebviewWindow().label,
    })
  }

  return { loadKeyTemplateFile, saveKeyTemplateAsFile }
}
