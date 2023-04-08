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

### 주요 개념

- Docker

  - 컨테이너라고 불리는 하나의 작은 소프트웨어 유닛안에 우리의 어플리케이션과 그에 필요한 각종 시스템 툴, 환경설정, 모든 디펜던시를
    묶어서 다른 서버에 쉽게 배포하고 안정적으로 구동할 수 있게 해주는 툴

- Image
  - 특정 프로세스를 실행하기 위한 모든 파일과 설정값을 지닌 것으로, 더 이상의 의존성을 설치할 필요가 없는 상태의 파일을 의미
  - Postgres 이미지에는 Postgres를 실행하는데 필요한 파일과 실행명령어, port 정보를 가지고 있음
  - 도커 이미지들은 Github와 유사한 서비스인 DockerHub를 통해 버전 관리 및 배포 가능
- Container
  - 이미지를 실행한 상태로, 프로그램의 종속성과 함께 프로그램 자체를 패키징하여 격리된 공간에서 프로세스를 동작시키는 것
- Volume
  - 컨테이너에 쓰여진 데이터는 기본적으로 컨테이너가 삭제될 때 함께 삭제
  - 컨테이너가 내려갈 때 사용해오던 데이터가 사라지지 않도록 데이터 영속성을 주기 위해 도커에서 제공해주는 옵션
- Port forwarding
  - 컨테이너는 완전히 분리된 환경이기 때문에 외부에서 컨테이너 내부의 서버에 접근할 수 없음
  - 외부 주소와 내부 주소를 이어주어서 컨테이너 외부에서 도커 컨테이너 내부에서 동작하는 서버에 접근할 수 있도록 함
  - 컨테이너가 올려져있는 호스트, 즉 로컬에서 5434 포트로 접근 => 호스트의 5434 포트는 컨테이너의 5432 포트로 포워딩 => 서버(Postgres) 접근
- Docker Compose
  - 도커 컴포즈는 단일 서버에서 여러개의 컨테이너를 하나의 서비스로 정의해 컨테이너의 묶음으로 관리할 수 있는 작업 환경을 제공하는 관리 도구
  - 여러 개의 컨테이너가 하나의 어플리케이션으로 동작할 때 이를 테스트하려면 각 컨테이너를 하나씩 생성해야 하는 불편함을 해결

### 설치 및 컨테이너 올리기

- https://www.docker.com/

```bash
# 컨테이너 올리기
$ docker-compose up

# 컨테이너 확인
$ docker ps --all

# 로컬호스트에서 Postgres에 psql로 바로 접속
$ psql -U postgres -h localhost -p 5434

# 실행중인 도커 컨테이너에서 프로세스 실행. 셸을 실행해서 인터렉티브한 환경에서 컨테이너 환경을 탐색하는 것도 가능
# docker exec -it <CONTAINER_ID> <COMMAND>
$ docker exec -it <CONTAINER_ID> psql -U postgres

# 컨테이너 내리기
$ docker-compose down
```
