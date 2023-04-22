# chapter-1

## 기술 스택

- Typescript 4.7.4
- Node.js 18.14.0
- NestJS 9.0.0
- Postgres 14.6
- Docker
- Git, Github

## Github

- https://github.com/fresh502/nestjs

## 소스 코드 다운로드

```bash
$ git clone https://github.com/fresh502/nestjs.git
$ npm i
```

## 챕터별 브랜치

- ch-{number}

```bash
$ git switch ch-1
```

## 도커

### 설치 및 컨테이너 올리기

- https://www.docker.com/

```bash
# 컨테이너 올리기
$ docker-compose up

# 컨테이너 확인
$ docker ps --all

# 로컬호스트에서 DB에 psql로 바로 접속. 다를 클라이언트 툴을 이용해서 접속하는 것도 가능
$ psql -U postgres -h localhost -p 5434

# 실행중인 도커 컨테이너에서 프로세스 실행. 셸을 실행해서 인터렉티브한 환경에서 컨테이너 환경을 탐색하는 것도 가능
# docker exec -it <CONTAINER_ID> <COMMAND>
$ docker exec -it <CONTAINER_ID> psql -U postgres

# 컨테이너 내리기
$ docker-compose down
```
