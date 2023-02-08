# NestJS Project

## 프로젝트 아키텍쳐

- 응집도 높은 모듈 설계
- 프로덕트 레벨의 서버 사이드 기능 구현
- Github Actions를 활용한 운영 환경 배포
  ![Alt text](./diagram/img/architecture.svg?raw=true)

## 실습 내용

- 회원가입 및 로그인, 비디오 업로드 및 재생 API 작성
- Decorator 활용
- Provider 활용
- Module 활용
- 슬라이딩 세션과 리프레쉬 토큰을 활용하여 인증 과정 디벨롭
- Authorizaion 구현
- Interceptor를 활용한 요청, 응답 매핑
- TypeORM을 활용하여 Transaction, Index 구현
- 쿼리 분석 및 개선
- 운영 환경을 대비한 DB 마이그레이션
- Task 스케쥴링을 활용한 메일 전송
- 에러 발생시 슬랙 알람 전송
- 테스트 케이스 작성
- Github Actions를 활용한 CD
  ![Alt text](./diagram/img/sequence.svg?raw=true)

## 기술 스택

- Typescript 4.7.4
- Node.js 18.14.0
- NestJS 9.0.0
- Postgres 14.6
- AWS EC2
- Docker
- Git, Github
