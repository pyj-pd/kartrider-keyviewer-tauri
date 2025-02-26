import { z } from "zod"

// Dimensions
export type PxUnit = `${number}px`

// Colors
export const colorHexRegex = /^#[a-f|A-F|0-9]{6}$/

export const ColorHex = z.custom<`#${string}`>(
  (value) => typeof value === "string" && colorHexRegex.test(value),
)

export type ColorHex = z.infer<typeof ColorHex>
