export const ARROW_KEYCODE_ROTATIONS = {
  UpArrow: "0deg",
  LeftArrow: "-90deg",
  DownArrow: "180deg",
  RightArrow: "90deg",
} as const satisfies { [key: string]: string }

export type ArrowKeyType = keyof typeof ARROW_KEYCODE_ROTATIONS
