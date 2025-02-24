import { defaultKeyViewerConfig } from "@/constants/keyviewer/config"
import { defineStore } from "pinia"

export const useConfigStore = defineStore("config-store", {
  state: () => defaultKeyViewerConfig,
})

export const useConfigModifiedStore = defineStore("config-modified-store", {
  state: () => ({
    isConfigModified: false,
  }),
})
