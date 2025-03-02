import type { KeyViewerConfigV1 } from "@/types/config"

export const configFileRelativePath = "./config.json"

export const defaultKeyTemplateFileRelativePath =
  "resources/key-templates/speed.json"

export const defaultKeyViewerConfig = {
  configVersion: "v1",

  /**
   * Use `null` to use default hard-coded template.
   */
  keyTemplatePath: defaultKeyTemplateFileRelativePath as null | string,

  windowSettings: {
    alwaysOnTop: true as boolean,

    width: 500 as number,
  },
} as const satisfies KeyViewerConfigV1
