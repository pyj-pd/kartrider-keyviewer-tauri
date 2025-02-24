import type { KeyViewerConfig } from "@/types/config"

export const defaultKeyViewerConfig = {
  keyTemplatePath: "resources/key-templates/speed.json" as null | string,

  alwaysOnTop: true as boolean,

  width: 600 as number,
  keySize: 10 as number,
  keyGap: 1 as number,
} as const satisfies KeyViewerConfig
