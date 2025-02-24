import { defaultKeyViewerConfig } from "@/constants/keyviewer/config"
import type { KeyViewerConfigKey } from "@/types/config"
import { defineStore } from "pinia"

export const useConfigStore = defineStore("config-store", {
  state: () => defaultKeyViewerConfig,
})

export const useConfigModifiedStore = defineStore("config-modified-store", {
  state: () => ({
    modifiedKeys: new Set<KeyViewerConfigKey>([]),
  }),
  actions: {
    addModifiedKeys(keys: KeyViewerConfigKey[]) {
      for (const key of keys) this.modifiedKeys.add(key)
    },
    clearModifiedKeys() {
      this.modifiedKeys.clear()
    },
  },
})
