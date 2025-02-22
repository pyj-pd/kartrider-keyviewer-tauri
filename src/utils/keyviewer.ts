import type { KeybindData } from "@/types/key-templates"
import { keybindTypeRegex, type KeybindType } from "@/types/keyviewer"

export const getKeybindLabel = (keybindData: KeybindData) =>
  typeof keybindData === "string"
    ? keybindData
    : (keybindData.customLabel ?? keybindData.keyCode)

export const getKeybindKeyCode = (keybindData: KeybindData) =>
  typeof keybindData === "string" ? keybindData : keybindData.keyCode

export const getKeybindType = (keybindData: KeybindData): KeybindType => {
  const keycode = getKeybindKeyCode(keybindData)

  for (const [keyType, regExp] of Object.entries(keybindTypeRegex)) {
    if (regExp.test(keycode)) return keyType as KeybindType
  }

  return "other-keys"
}
