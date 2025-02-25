import { defaultKeyViewerConfig } from "@/constants/keyviewer/config"
import { defineStore } from "pinia"

export const useConfigStore = defineStore("config-store", {
  state: () => defaultKeyViewerConfig,
})
