import type { AbsoluteSizeData } from "@/types/keyviewer/size"
import { defineStore } from "pinia"

export const useSizeStore = defineStore("size-store", {
  state: (): AbsoluteSizeData => ({
    windowWidth: 1,
    windowHeight: 1,

    gap: "0px",
    borderRadius: "0px",
    borderWidth: "0px",
    fontSize: "0px",
  }),
})
