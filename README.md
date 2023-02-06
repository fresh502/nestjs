# NestJS Project

## 참고 자료

### 도커로 Postgres 구동 및 볼률 설정

- https://medium.com/@basit26374/how-to-run-postgresql-in-docker-container-with-volume-bound-c141f94e4c5a

```bash
$ docker pull postgres:14.6
$ docker volume create nestjs-project-postgres
$ docker volume ls
$ docker run --name nestjs_project_postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -p 5433:5432 -v nestjs-project-postgres:/var/lib/postgresql/data -d postgres:14.6

$ createuser -d -P -U postgres -h localhost -p 5433 nestjs
$ createdb -U nestjs -h localhost -p 5433 -E UTF8 nestjs
$ psql -U nestjs -h localhost -p 5433
```
