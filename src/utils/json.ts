import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/plugin-fs"
import type { ZodSchema } from "zod"

export const parseJSONFile = async <Output>(
  /**
   * Path to resource. Should be the path in `tauri.conf.json`.
   */
  path: string,
  schema: ZodSchema<Output>,
): Promise<Output> => {
  const resourcePath = await resolveResource(path)
  const content = JSON.parse(await readTextFile(resourcePath))

  return schema.parse(content)
}
