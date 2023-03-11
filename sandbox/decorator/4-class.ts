/*
클래스 데코레이터
- 클래스의 생성자에 적용되어 클래스 정의를 읽거나 수정
- 생성자를 리턴하는 함수. 생성자 타입을 상속받는 제네리 타입 T를 가지는 생성자를 함수의 인자로 전달받는 형태
*/

(() => {
  function age<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      age = 30
    };
  }

  @age
  class Human {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  const human = new Human('Mark');
  console.log(human.name);
  console.log(human);
  // console.log(human.age);
})();
