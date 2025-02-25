import type { AbsoluteSizeData } from "@/types/keyviewer/size"
import { defineStore } from "pinia"

export const useSizeStore = defineStore("size-store", {
  state: (): AbsoluteSizeData => ({
    windowWidth: 0,
    windowHeight: 0,

    gap: "0px",
    borderRadius: "0px",
    fontSize: "0px",
  }),
})
