import type { KeyViewerConfigV1 } from "@/types/config"

export const defaultKeyViewerConfig = {
  configVersion: "v1",

  keyTemplatePath: "resources/key-templates/speed.json" as null | string,

  windowSettings: {
    alwaysOnTop: true as boolean,

    width: 600 as number,
  },
  styling: {
    keySize: 10 as number,
    keyGap: 1 as number,
    keyBorderRadius: 0.8 as number,

    fontSize: 1.5 as number,
  },
} as const satisfies KeyViewerConfigV1
