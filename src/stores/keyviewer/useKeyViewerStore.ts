import type { KeyPressData } from "@/types/keyviewer/keybind"
import { defineStore } from "pinia"

/**
 * Should be only used in `keyviewer` window.
 */
export const useKeyViewerStore = defineStore("keyviewer-store", {
  state: () => ({
    /** @readonly Should be only changed by `initKeyViewer` composable. */
    keyPressData: {} as KeyPressData,
  }),
})
