# Chapter-2

## Decorator 1

- 횡단 관심사
  - 서비스가 본질적으로 제공하고자 비즈니스 기능 이외에 유효성 검사, 로깅, 요청과 응답 객체의 일관적인 변경과 같이 앱 전반에서 필요한 공통 요소
  - 횡단 관심사를 분리하여 구현하지 않을 경우 주요 비즈니스 로직 관련 코드와 섞여 모듈 응집도가 떨어짐
- 관점 지향 프로그래밍
  - 횡단 관심사의 분리를 통해 모듈의 응집도를 높이는 프로그래밍 패러다임
  - Nest 에서는 데코레이터를 활용하여 관점 지향 프로그래밍을 적용
- Decorator
  - 대상이 되는 클래스, 메소드 등을 래핑해서 대상이 되는 것들의 코드 수정 없이 기능을 확장할 수 있는 타입스크립트 기능
  - 아직 실험적인 기능이어서 tsconfig.json에 정의해줘야 별도로 정의해줘야지만 이미 안정적이기 때문에 실무에서 많이 활용
- Typescript에서 지원하는 데코레이터들

## Decorator 2

- Typescript에서 지원하는 데코레이터들

## Validation, Transformation에서의 활용

- @NotIncludeNickname

## Swagger에서의 활용

- swagger.decorator.ts

## Custom Decorator

- user.decorator.ts
  - Passing data
  - Decorator composition
- Enable authentication globally
  - public.decorator.ts
