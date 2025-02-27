<script setup lang="ts">
import {
  githubRepoLink,
  programName,
  programVersion,
} from "@/constants/project-info"
</script>

<template>
  <section>
    <Panel :header="`${programName} ${programVersion}`">
      <p>
        이용해주셔서 감사합니다. 이 프로그램은 오픈소스 소프트웨어로,
        <a :href="githubRepoLink" target="_blank">GitHub 레포지토리</a>에서
        소스코드를 공개하고 있습니다.<br /><br />이 설정 창은 키뷰어 프로그램
        창을 더블클릭해서 다시 열 수 있습니다.
      </p>
    </Panel>
  </section>
</template>
