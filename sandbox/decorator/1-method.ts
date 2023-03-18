/*
데코레이터는 데코레이팅 된 선언에 대한 정보와 함께 런타임에 호출되는 함수
@expression 형식을 사용
데코레이터의 인자는 종류마다 다름

메소드 데코레이터
- 메소드 바로 앞에 선언
- 함수명 (클래스의 프로토타입, 멤버의 이름, 멤버의 속성 설명자)
- 메소드의 속성 설명자에 적용되어 메소드의 정의를 읽거나 수정
*/

(() => {
  function logDate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`start: ${new Date().toISOString()}`);
  }

  class Human {
    @logDate
    walk() {
      console.log('Walk!');
    }
  }

  const human = new Human();
  human.walk();
})();


