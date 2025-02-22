import type { Component } from "vue"
import KeyViewer from "../components/keyviewer/KeyViewerWebview.vue"
import Settings from "../components/settings/SettingsWebview.vue"

export type WebviewItem = {
  label: string
  component: Component
}

export const webviewItems = [
  {
    label: "keyviewer",
    component: KeyViewer,
  },
  {
    label: "settings",
    component: Settings,
  },
] as const satisfies WebviewItem[]

export type WebviewLabel = (typeof webviewItems)[number]["label"]

export const defaultWebviewLabel: WebviewLabel = "keyviewer",
  defaultWebview = webviewItems.find(
    (item) => item.label === defaultWebviewLabel,
  ) as WebviewItem
