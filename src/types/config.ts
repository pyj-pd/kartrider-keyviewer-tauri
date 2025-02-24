import { z } from "zod"

export const KeyViewerConfig = z.object({
  keyTemplatePath: z.union([z.null(), z.string()]),

  alwaysOnTop: z.boolean(),

  /** Absolute size */
  width: z.number(),
  /** Relative size */
  keySize: z.number(),
  /** Relative size */
  keyGap: z.number(),
})

export type KeyViewerConfig = z.infer<typeof KeyViewerConfig>

export type KeyViewerConfigKey = keyof KeyViewerConfig
