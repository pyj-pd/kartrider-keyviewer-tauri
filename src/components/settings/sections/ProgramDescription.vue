<script setup lang="ts">
import {
  githubRepoLink,
  programName,
  programVersion,
} from "@/constants/project-info"
import { getLatestGitTagName } from "@/utils/github"
import { computed, ref } from "vue"

const latestVersion = ref<string | null>(null)
const header = computed(() => {
  let newHeader = `${programName} ${programVersion}`

  // Fetch not complete yet, just return default header
  if (latestVersion.value === null) return newHeader

  if (latestVersion.value === programVersion)
    newHeader = `${newHeader} (최신 버전)`
  else newHeader = `${newHeader} (최신 버전: ${latestVersion.value})`

  return newHeader
})

const checkLatestVersion = async () => {
  const fetchedVersion = await getLatestGitTagName()

  if (typeof fetchedVersion === "string") latestVersion.value = fetchedVersion
}

checkLatestVersion()
</script>

<template>
  <section>
    <Panel :header>
      <p>
        이용해주셔서 감사합니다. 이 프로그램은 오픈소스 소프트웨어로,
        <a :href="githubRepoLink" target="_blank">GitHub 레포지토리</a>에서
        소스코드를 공개하고 있습니다.<br /><br />이 설정 창은 키뷰어 프로그램
        창을 더블클릭해서 다시 열 수 있습니다.
      </p>
    </Panel>
  </section>
</template>
