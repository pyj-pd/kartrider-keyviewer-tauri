import { defaultKeyTemplate } from "@/constants/key-template"
import type { KeyTemplate } from "@/types/key-templates"
import type { KeyPressData } from "@/types/keyviewer/keybind"
import { defineStore } from "pinia"

/**
 * Should be only used in `keyviewer` window.
 */
export const useKeyViewerStore = defineStore("keyviewer-store", {
  state: () => ({
    keyTemplate: structuredClone(defaultKeyTemplate) as KeyTemplate,

    /** @readonly Should be only changed by `initKeyViewer` composable. */
    keyPressData: {} as KeyPressData,
  }),
})
