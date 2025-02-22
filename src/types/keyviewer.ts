/**
 * Waterfall from top to bottom. Case sensitive.
 */
export const keybindTypeRegex = {
  arrow: new RegExp(/^[a-z|A-Z]+Arrow$/),
  shift: new RegExp(/^Shift[a-z|A-Z]+$/),
  control: new RegExp(/^Control[a-z|A-Z]+$/),
  space: new RegExp(/^Space$/),
  escape: new RegExp(/^Escape$/),
  "other-keys": new RegExp(/.*/),
} as const satisfies { [keyCode: string]: RegExp }

export type KeybindType = keyof typeof keybindTypeRegex

export type KeyPressData = { [key: string]: "pressed" | "released" }
