import type { PxUnit } from "../unit"

/**
 * Absolute sizes that are calculated in px. Can be used directly for CSS styling.
 */
export type AbsoluteSizeData = {
  windowWidth: number
  windowHeight: number

  gap: PxUnit
  borderRadius: PxUnit
  borderWidth: PxUnit
  fontSize: PxUnit
}
