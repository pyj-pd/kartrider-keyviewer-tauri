import type { ToastMessageOptions } from "primevue"

export const defaultToastTitles: {
  [key in NonNullable<ToastMessageOptions["severity"]>]: string
} = {
  info: "알림",
  warn: "경고",
  error: "오류",
  contrast: "알림",
  secondary: "알림",
  success: "성공",
}
