import { githubRepoReleasesApiLink } from "@/constants/project-info"

/**
 * Fetches tag name of latest release on GitHub.
 * @returns Latest tag name, or `null` if unsuccessful.
 */
export const getLatestGitTagName = async (): Promise<string | null> => {
  const fetchRequest = await fetch(githubRepoReleasesApiLink)
  const response = await fetchRequest.json()

  const tagName = response.tag_name

  if (typeof tagName !== "string") return null

  return tagName
}
