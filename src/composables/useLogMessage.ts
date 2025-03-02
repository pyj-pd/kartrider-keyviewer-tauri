import { defaultToastTitles } from "@/constants/toast"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { useToast, type ToastMessageOptions } from "primevue"

/** Labels of windows to show toasts on. */
const TOAST_SHOW_WINDOWS = ["settings"]

type LogMessageOptions = Omit<ToastMessageOptions, "detail"> & {
  detail: string
}

/**
 * Composable for handling log messages.
 */
export const useLogMessage = () => {
  const toast = useToast()

  /**
   * Logs specific message.
   * @param messageOption Message option
   * @param messageOption.detail Required. Detailed content of the log message.
   * @param showToast Whether to show the message as a toast in windows that are included in `TOAST_SHOW_WINDOW` constant.
   */
  const writeLogMessage = (
    messageOption: LogMessageOptions,
    showToast: boolean = true,
  ) => {
    // Log message
    const messagePrefix =
      typeof messageOption.summary === "string"
        ? `${messageOption.summary}: `
        : ""
    const messageContent = `${messagePrefix}${messageOption.detail}`

    switch (messageOption.severity) {
      case "info":
        console.info(messageContent)
        break
      case "warn":
        console.warn(messageContent)
        break
      case "error":
        console.error(messageContent)
        break
      default:
        console.log(messageContent)
    }

    // Show Toast
    if (showToast === false) return

    const currentWindow = getCurrentWebviewWindow()

    const toastOption = { ...messageOption }

    toastOption.summary ??= defaultToastTitles[messageOption.severity ?? "info"]

    if (TOAST_SHOW_WINDOWS.includes(currentWindow.label)) toast.add(toastOption)
  }

  return { writeLogMessage }
}
