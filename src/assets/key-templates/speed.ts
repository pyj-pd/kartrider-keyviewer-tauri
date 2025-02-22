import type { KeyTemplate } from "@/types/key-templates"

const template: KeyTemplate = {
  keybinds: {
    a: "ShiftLeft",
    b: "ControlLeft",
    c: "UpArrow",
    d: "LeftArrow",
    e: "DownArrow",
    f: "RightArrow",
  },
  gridAreas: [
    "a a a . . c .", //
    "b b b . d e f",
  ],
}

export default template
