import type { KeyViewerConfigV1 } from "@/types/config"
import * as path from "@tauri-apps/api/path"

const baseDir = await path.resourceDir()
export const configFilePath = await path.join(baseDir, "config.json")

export const defaultKeyTemplateFilePath = await path.join(
  baseDir,
  "resources/key-templates/speed.json",
)

export const defaultKeyViewerConfig = {
  configVersion: "v1",

  keyTemplatePath: defaultKeyTemplateFilePath as null | string,

  windowSettings: {
    alwaysOnTop: true as boolean,

    width: 600 as number,
  },
} as const satisfies KeyViewerConfigV1
