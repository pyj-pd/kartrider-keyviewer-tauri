import type { KeyViewerConfigV1 } from "@/types/config"

export const configFilePath = "./config.json"

export const defaultKeyTemplateFilePath = "./resources/key-templates/speed.json"

export const defaultKeyViewerConfig = {
  configVersion: "v1",

  keyTemplatePath: defaultKeyTemplateFilePath as null | string,

  windowSettings: {
    alwaysOnTop: true as boolean,

    width: 500 as number,
  },
} as const satisfies KeyViewerConfigV1
