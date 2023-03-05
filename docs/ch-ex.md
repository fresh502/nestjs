# chapter-2

## 파일 업로드

- https://docs.nestjs.com/techniques/file-upload
- 환경변수에 따라 localStorage, S3Storage 활용 가능

```bash
# 업로드 요청
$ curl -X 'POST' \
  'http://localhost:3000/videos' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'video=@1.mp4;type=video/mp4' \
  -F 'title=test'
```

## Transaction

- 비디오 업로드시 DB와 파일쓰기를 트랜잭션으로 묶기

## viewCnt 처리

- 웹브라우저에서 바로 재생하는 방식으로 할 경우 두번 호출됨
- Header의 Sec-Fetch-Dest의 값을 기준으로 viewCnt 업데이트 처리
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Dest

```bash
$ curl -X 'GET' 'http://localhost:3000/videos/0cce6d2a-0e0e-4727-95eb-165879b20860/play' --output /dev/null \
& curl -X 'GET' 'http://localhost:3000/videos/0cce6d2a-0e0e-4727-95eb-165879b20860/play' --output /dev/null \
& curl -X 'GET' 'http://localhost:3000/videos/0cce6d2a-0e0e-4727-95eb-165879b20860/play' --output /dev/null \
& curl -X 'GET' 'http://localhost:3000/videos/0cce6d2a-0e0e-4727-95eb-165879b20860/play' --output /dev/null \
& curl -X 'GET' 'http://localhost:3000/videos/0cce6d2a-0e0e-4727-95eb-165879b20860/play' --output /dev/null
```
