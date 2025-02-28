# 카트라이더 키뷰어 타우리

> 누른 키를 화면에 띄워주는 Tauri 기반 데스크톱 프로그램.

[](https://github.com/user-attachments/assets/0b9bfc86-9a03-41df-8c6c-6207d2b2ad53)

[Vue.js](https://vuejs.org/)와 [Tauri](https://tauri.app/) 프레임워크를 이용하여 제작한 간단한 키뷰어 프로그램입니다.

## 설치 및 사용 방법

### Windows

1. [이곳에서 압축 파일을 다운로드해 주세요.](https://github.com/pyj-pd/kartrider-keyviewer-tauri/releases)
1. 내려받은 파일을 원하시는 곳에 압축 해제해 주세요.
1. 압축 해제한 폴더에 있는 실행 파일(`kartrider-keyviewer-tauri.exe`)을 **관리자 권한으로 실행**하면 끝입니다.
1. 설정 창을 열려면 **키뷰어 화면을 더블클릭**해 주세요.

관리자 권한으로 실행하지 않으면 원활한 사용이 불가할 수도 있습니다.

<img src="https://github.com/user-attachments/assets/cf98d1aa-8d10-4b9f-8fde-25be0b0ab07d" alt="'KartRiderKeyViewerTauri-Windows.zip' 버튼을 화살표로 강조" width="500" />

<img src="https://github.com/user-attachments/assets/0d9e8f50-9edc-4c9c-a8fc-86719ab000a7" alt="'kartrider-keyviewer-tauri.exe' 파일을 화살표로 강조" width="400" />

## 업데이트 방법

기존 `resources` 폴더와 `config.json` 파일은 그대로 두고, `.exe` 실행 파일만 교체하시면 기존 설정값을 그대로 사용하시면서 프로그램을 업데이트할 수 있습니다.

## To-do

- [ ] 콘피그 파일 변경 기능 추가
- [x] 잘못된 파일 로드 시 알림 기능 추가
- [x] 폰트 변경 기능 추가

# Tauri + Vue + TypeScript

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
