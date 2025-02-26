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
      description: "드리프트",
      keyCode: "ShiftLeft",
      customLabel: "Shift",
    },
    b: {
      description: "부스터",
      keyCode: "ControlLeft",
      customLabel: "Ctrl",
    },
    c: {
      description: "앞 방향키",
      keyCode: "UpArrow",
    },
    d: { description: "왼쪽 방향키", keyCode: "LeftArrow" },
    e: { description: "뒤 방향키", keyCode: "DownArrow" },
    f: { description: "오른쪽 방향키", keyCode: "RightArrow" },
  },
  gridAreas: ["a a . c .", "b b d e f"],
  styling: defaultKeyStyling,
} as const satisfies KeyTemplate
