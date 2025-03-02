import { KeyTemplate, KeyTemplateStyling } from "@/types/key-templates"
import defaultKeyTemplateJson from "@/bundle-resources/resources/key-templates/speed.json"

export const keyTemplateDirectoryRelativePath = "./resources/key-templates"

export const keyTemplateFileExtension = ".json"

export const defaultKeyStyling: KeyTemplateStyling = KeyTemplateStyling.parse(
  defaultKeyTemplateJson.styling,
)

export const defaultKeyTemplate: KeyTemplate = {
  ...KeyTemplate.parse(defaultKeyTemplateJson),
  templateName: "기본 템플릿",
}
