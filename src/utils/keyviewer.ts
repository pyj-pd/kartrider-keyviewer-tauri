import type { KeybindData } from "@/types/key-templates"
import { keybindTypeRegex, type KeybindType } from "@/types/keyviewer"

// Keybinds
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

// Window
export const minKeyViewerWindowWidth = 100
export const maxKeyViewerWindowWidth = 2000

export const calculateKeyViewerWindowSize = ({
  width,
  keySize,
  gap,
  columnCount,
  rowCount,
}: {
  width: number
  keySize: number
  gap: number
  columnCount: number
  rowCount: number
}): {
  width: number
  height: number
  /** Gap style which can be used for CSS styling. */
  gapStyle: string
} => {
  // Set window size
  const relativeWidth = keySize * columnCount + gap * (columnCount - 1)
  const relativeHeight = keySize * rowCount + gap * (rowCount - 1)

  const height = relativeHeight * (width / relativeWidth)

  const gapStyle = `${(gap / relativeWidth) * 100}vw`

  return { width, height, gapStyle }
}
