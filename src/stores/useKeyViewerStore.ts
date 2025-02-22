import type { KeyTemplate } from "@/types/key-templates"
import type { KeyPressData } from "@/types/keyviewer"
import { defineStore } from "pinia"

export const useKeyViewerStore = defineStore("keyviewer-store", {
  state: () => ({
    keyTemplate: null as null | KeyTemplate,
    keyPressData: {} as KeyPressData,
  }),
})
