module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'ci', // ci구성파일 및 스크립트 변경
        'feat', // 새로운 기능 추가
        'fix', // 버그 수정
        'docs', // 문서 관련
        'style', // 코드 의미에 영향을 주지 않는 변경사항 ( white space, formatting, colons )
        'refactor', // 코드 리팩토링
        'test', // 테스트 관련 코드
        'build', // 시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm, gulp, yarn 레벨)
        'revert', // 다시 롤백
        'perf', // 성능 개선
        'chore', // 그 외 자잘한 수정, 패키지 매니저 설정할 경우, 코드 수정 없이 설정을 변경
      ],
    ],
  },
};
