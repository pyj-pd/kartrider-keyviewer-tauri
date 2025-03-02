import {
  keyTemplateDirectoryRelativePath,
  keyTemplateFileExtension,
} from "@/constants/key-template"
import { baseDir } from "@/constants/path"
import { path } from "@tauri-apps/api"
import { readDir, type DirEntry } from "@tauri-apps/plugin-fs"

export type KeyTemplateFile = {
  type: "file"
  fileRelativePath: string
  fileName: string
}

export type KeyTemplateResourcesDirectory = {
  type: "directory"
  directoryRelativePath: string
  directoryName: string

  items: KeyTemplateResourcesDirectoryItem[]
}

export type KeyTemplateResourcesDirectoryItem =
  | KeyTemplateFile
  | KeyTemplateResourcesDirectory

export const getTemplateFileList = async (): Promise<{
  data: KeyTemplateResourcesDirectoryItem[]
  allItemRelativePath: string[]
}> => {
  const keyTemplateDirectoryPath = await path.join(
    baseDir,
    keyTemplateDirectoryRelativePath,
  )

  const allItemRelativePath: string[] = []

  /**
   * Adds entry into directory items.
   * @param entry Entry.
   * @param relativePath Relative path of the entry.
   * @param absolutePath Absolute path of the entry. Should be only used for reading directories or files. DO NOT USE THIS VALUE IN CONFIG!
   * @param directoryItems Directory items array to push the entry into. The array will get mutated directly.
   * @returns
   */
  const addEntry = async (
    entry: DirEntry,
    relativePath: string,
    absolutePath: string,
    directories: KeyTemplateResourcesDirectory[],
    files: KeyTemplateFile[],
  ) => {
    if (entry.isDirectory) {
      // Add directory entry
      const thisDirectories: KeyTemplateResourcesDirectory[] = []
      const thisFiles: KeyTemplateFile[] = []

      for (const entry of await readDir(absolutePath)) {
        const entryRelativePath = await path.join(relativePath, entry.name)
        const entryAbsolutePath = await path.join(absolutePath, entry.name)

        await addEntry(
          entry,
          entryRelativePath,
          entryAbsolutePath,
          thisDirectories,
          thisFiles,
        )
      }

      const directoryData: KeyTemplateResourcesDirectory = {
        type: "directory",
        directoryRelativePath: relativePath,
        directoryName: entry.name,
        items: [...thisDirectories, ...thisFiles], // Put directories at first and files at last for readability
      }

      directories.push(directoryData)
    } else if (entry.isFile) {
      // Add file entry
      if (!entry.name.endsWith(keyTemplateFileExtension)) return

      const fileData: KeyTemplateFile = {
        type: "file",
        fileRelativePath: relativePath,
        fileName: entry.name,
      }

      allItemRelativePath.push(relativePath)
      files.push(fileData)
    } else return
  }

  const directories: KeyTemplateResourcesDirectory[] = []
  const files: KeyTemplateFile[] = []
  for (const entry of await readDir(keyTemplateDirectoryPath)) {
    const relativePath = await path.join(
      keyTemplateDirectoryRelativePath,
      entry.name,
    )
    const absolutePath = await path.join(keyTemplateDirectoryPath, entry.name)

    await addEntry(entry, relativePath, absolutePath, directories, files)
  }

  const data: KeyTemplateResourcesDirectoryItem[] = [...directories, ...files] // Put directories at first and files at last for readability

  return {
    data,
    allItemRelativePath,
  }
}
