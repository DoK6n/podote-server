module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'ci',
        'feat', // 새로운 기능 추가
        'fix', // 새로운 기능 추가
        'docs', // 문서 관련
        'style', // 스타일 변경 (포매팅 수정, 들여쓰기 추가, …)
        'refactor', // 코드 리팩토링
        'test', // 테스트 관련 코드
        'build', // 빌드 관련 파일 수정
        'revert', // 다시 롤백
        'perf', // 성능 개선
        'chore', // 그 외 자잘한 수정
      ],
    ],
  },
};
