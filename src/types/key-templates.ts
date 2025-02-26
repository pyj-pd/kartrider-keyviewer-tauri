import { z } from "zod"
import { ColorHex } from "./unit"

export const KeybindData = z.object({
  description: z.string(),
  keyCode: z.string(),
  customLabel: z.optional(z.string()),
})

export type KeybindData = z.infer<typeof KeybindData>

// Template
export const keyColorOption = z.object({
  backgroundColor: ColorHex,
  textColor: ColorHex,
  borderColor: ColorHex,
})

export type KeyColorOption = z.infer<typeof keyColorOption>

export const KeyTemplate = z.object({
  keybinds: z.record(/* Grid area key */ z.string(), KeybindData),

  // Styles
  gridAreas: z.array(z.string()),

  /** Relative sizes */
  styling: z.object({
    keySize: z.number(),
    keyGap: z.number(),
    keyBorderRadius: z.number(),
    keyBorderWidth: z.number(),

    keyColor: z.object({
      idle: keyColorOption,
      pressed: keyColorOption,
    }),

    fontSize: z.number(),
    /** Absolute number */
    fontWeight: z.number(),
  }),
})

export type KeyTemplate = z.infer<typeof KeyTemplate>
