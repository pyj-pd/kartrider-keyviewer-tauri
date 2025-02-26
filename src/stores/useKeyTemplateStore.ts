import { defaultKeyTemplate } from "@/constants/key-template"
import type { KeyTemplate } from "@/types/key-templates"
import { defineStore } from "pinia"

export const useKeyTemplateStore = defineStore("key-template-store", {
  state: () => ({
    keyTemplate: structuredClone(defaultKeyTemplate) as KeyTemplate,
  }),
})
