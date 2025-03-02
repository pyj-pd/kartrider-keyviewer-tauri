import { useConfigStore } from "@/stores/useConfigStore"
import { storeToRefs } from "pinia"
import { useFileHandler } from "./useFileHandler"
import { KeyTemplate } from "@/types/key-templates"
import { invoke } from "@tauri-apps/api/core"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { useKeyTemplateStore } from "@/stores/useKeyTemplateStore"
import { defaultKeyTemplate } from "@/constants/key-template"
import { logMessages } from "@/constants/log-messages"
import { useLogMessage } from "./useLogMessage"

/**
 * Handler for handling key template files.
 * @returns Functions for saving and loading key template file
 */
export const useKeyTemplateFile = () => {
  const { keyTemplate } = storeToRefs(useKeyTemplateStore())
  const { keyTemplatePath } = storeToRefs(useConfigStore())

  const { getFileData, saveDataToFile } = useFileHandler(
    keyTemplatePath,
    KeyTemplate,
  )

  const { writeLogMessage } = useLogMessage()

  /**
   * Loads key template file and mutate the key template store.
   */
  const loadKeyTemplateFile = async () => {
    try {
      const keyTemplateFileData =
        keyTemplatePath.value === null
          ? defaultKeyTemplate // Use default key template if file path is `null`
          : await getFileData(defaultKeyTemplate)

      // No key template file
      if (keyTemplateFileData === null) {
        setDefaultKeyTemplate()

        writeLogMessage({
          detail: logMessages.keyTemplate.noFile,
          severity: "error",
        })
        return
      }

      keyTemplate.value = keyTemplateFileData
    } catch {
      await saveKeyTemplateAsFile(true) // Create backup before fallbacking
      setDefaultKeyTemplate()

      writeLogMessage({
        detail: logMessages.keyTemplate.failedToLoadFallbackDefault,
        severity: "error",
      })
    }
  }

  /**
   * Saves key template store data to the key template file.
   * @param shouldCreateBackup Whether to create backup file before saving.
   */
  const saveKeyTemplateAsFile = async (shouldCreateBackup: boolean = false) => {
    if (keyTemplate.value === null) {
      writeLogMessage(
        {
          detail: logMessages.keyTemplate.noData,
          severity: "error",
        },
        false,
      )
      return
    }

    try {
      // Write to the file
      await saveDataToFile(keyTemplate.value, shouldCreateBackup)

      // Ping all windows
      await invoke("update_template", {
        from: getCurrentWebviewWindow().label,
      })
    } catch {
      writeLogMessage(
        {
          detail: logMessages.keyTemplate.failedToSave,
          severity: "error",
        },
        false,
      )
    }
  }

  const setDefaultKeyTemplate = () => (keyTemplate.value = defaultKeyTemplate)

  return { loadKeyTemplateFile, saveKeyTemplateAsFile, setDefaultKeyTemplate }
}
