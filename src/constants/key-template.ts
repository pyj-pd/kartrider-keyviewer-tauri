import { KeyTemplate, KeyTemplateStyling } from "@/types/key-templates"
import defaultKeyTemplateJson from "@/bundle-resources/resources/key-templates/speed.json"

export const defaultKeyStyling = KeyTemplateStyling.parse(
  defaultKeyTemplateJson.styling,
)

export const defaultKeyTemplate = KeyTemplate.parse(defaultKeyTemplateJson)
