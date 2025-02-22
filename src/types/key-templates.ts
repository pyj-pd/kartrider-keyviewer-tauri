import { z } from "zod"

export const KeybindData = z.union([
  /* Keycode */ z.string(),
  /* More config */
  z.object({
    keyCode: z.string(),
    customLabel: z.optional(z.string()),
  }),
])

export type KeybindData = z.infer<typeof KeybindData>

export const KeyTemplate = z.object({
  keybinds: z.record(/* Grid area key */ z.string(), KeybindData),
  gridAreas: z.array(z.string()),
})

export type KeyTemplate = z.infer<typeof KeyTemplate>
