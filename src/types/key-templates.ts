import { z } from "zod"

export const KeyTemplate = z.object({
  keybinds: z.record(
    /* Grid area key */ z.string(),
    z.union([
      /* Keycode */ z.string(),
      /* More config */
      z.object({
        keyCode: z.string(),
        customLabel: z.optional(z.string()),
      }),
    ]),
  ),
  gridAreas: z.array(z.string()),
})

export type KeyTemplate = z.infer<typeof KeyTemplate>
