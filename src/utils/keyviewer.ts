import type { KeyViewerConfigV1 } from "@/types/config"
import type { KeybindData } from "@/types/key-templates"
import { keybindTypeRegex, type KeybindType } from "@/types/keyviewer/keybind"
import type { AbsoluteSizeData } from "@/types/keyviewer/size"
import type { PxUnit } from "@/types/unit"

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
/**
 * Calculates absolute sizes from relative sizes in config file.
 * @param relativeSizes Relative sizes that are defined in config file.
 * @returns Absolute sizes that match window size.
 */
export const calculateKeyViewerAbsoluteSizes = ({
  width,

  keySize,
  keyGap,
  keyBorderRadius,
  keyBorderWidth,
  fontSize,

  columnCount,
  rowCount,
}: {
  width: number

  columnCount: number
  rowCount: number
} & KeyViewerConfigV1["styling"]): AbsoluteSizeData => {
  // Set window size
  const relativeWidth = keySize * columnCount + keyGap * (columnCount - 1)
  const relativeHeight = keySize * rowCount + keyGap * (rowCount - 1)

  /**
   * Multiply relative sizes with this to get absolute sizes
   * that match window size.
   */
  const sizeRatio = width / relativeWidth

  const height = relativeHeight * sizeRatio

  const gapStyle: PxUnit = `${keyGap * sizeRatio}px`
  const fontSizeStyle: PxUnit = `${fontSize * sizeRatio}px`
  const borderRadiusStyle: PxUnit = `${keyBorderRadius * sizeRatio}px`
  const borderWidthStyle: PxUnit = `${keyBorderWidth * sizeRatio}px`

  return {
    windowWidth: width,
    windowHeight: height,

    gap: gapStyle,
    fontSize: fontSizeStyle,
    borderRadius: borderRadiusStyle,
    borderWidth: borderWidthStyle,
  }
}
