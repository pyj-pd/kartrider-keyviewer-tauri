export const logMessages = {
  config: {
    loaded: "설정 파일을 불러왔습니다.",
    noFile: "설정 파일이 없습니다.",
    noFileFallbackDefault: "설정 파일이 없습니다. 기본 설정을 사용합니다.",
    failedToLoadFallbackDefault:
      "설정 파일을 불러오는 데 실패하였습니다. 파일 구조가 잘못된 것 같습니다. 기본 설정을 대신 사용합니다. 기존 파일 데이터는 같은 경로에 백업으로 저장되었습니다.",
  },
  keyTemplate: {
    loaded: "키보드 템플릿을 불러왔습니다.",
    noFile: "키보드 템플릿 파일이 없습니다.",
    noData: "키보드 템플릿 데이터가 없습니다.",
    failedToLoadFallbackDefault:
      "키보드 템플릿을 불러오는 데 실패하였습니다. 템플릿 데이터 구조가 잘못된 것 같습니다. 기본 템플릿을 대신 사용합니다. 기존 파일 데이터는 같은 경로에 백업으로 저장되었습니다.",
    failedToSave: "키보드 템블릿을 저장하는 데 실패하였습니다.",
    failedToLoadDirectory: "키보드 템플릿 목록을 불러오는 데 실패하였습니다.",
    failedToLocateFile:
      "설정한 파일 경로가 잘못되었습니다. 기본 파일 경로를 대신 사용합니다.",
  },
} as const
