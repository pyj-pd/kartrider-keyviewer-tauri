import type { KeyTemplate } from "@/types/key-templates"

export const defaultKeyStyling = {
  keySize: 10,
  keyGap: 1,
  keyBorderRadius: 0.3,
  keyBorderWidth: 0,
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
  fontSize: 1.6,
} as const satisfies KeyTemplate["styling"]

export const defaultKeyTemplate = {
  keybinds: {
    a: {
      keyCode: "ShiftLeft",
      customLabel: "Shift",
    },
    b: {
      keyCode: "ControlLeft",
      customLabel: "Ctrl",
    },
    c: "UpArrow",
    d: "LeftArrow",
    e: "DownArrow",
    f: "RightArrow",
  },
  gridAreas: ["a a . c .", "b b d e f"],
  styling: defaultKeyStyling,
} as const satisfies KeyTemplate
