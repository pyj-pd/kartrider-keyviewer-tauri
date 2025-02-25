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
    keyBorderRadius: 0.3 as number,
    keyBorderWidth: 0 as number,

    keyColor: {
      idle: {
        backgroundColor: "#ffffff",
        textColor: "#0c1236",
        borderColor: "#0c1236",
      },
      pressed: {
        backgroundColor: "#00d7f8",
        textColor: "#0c1236",
        borderColor: "#0c1236",
      },
    },

    fontSize: 1.6 as number,
  },
} as const satisfies KeyViewerConfigV1
