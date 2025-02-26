import { z } from "zod"

export const KeyViewerConfigV1 = z.object({
  configVersion: z.literal("v1"),

  keyTemplatePath: z.union([z.null(), z.string()]),

  windowSettings: z.object({
    alwaysOnTop: z.boolean(),

    /** Absolute size */
    width: z.number(),
  }),
})

export type KeyViewerConfigV1 = z.infer<typeof KeyViewerConfigV1>

export type KeyViewerConfigV1Key = keyof KeyViewerConfigV1
