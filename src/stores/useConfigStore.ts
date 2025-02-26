import { defaultKeyViewerConfig } from "@/constants/config"
import type { KeyViewerConfigV1 } from "@/types/config"
import { defineStore } from "pinia"

export const useConfigStore = defineStore("config-store", {
  state: () => structuredClone(defaultKeyViewerConfig) as KeyViewerConfigV1,
})
