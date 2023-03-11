/*
매개변수 데코레이터
- 생성자 또는 메서드의 매개변수에 선언되어 적용
- 함수명 (클래스의 프로토타입, 멤버의 이름, 매개변수가 함수에서 몇 번째 위치에 선언되었는지를 나타내는 인덱스)
- 메소드 데코레이터와 함께 유효성 검사 등에 많이 활용되는 형태
*/

(() => {
  function maxLength(max: number) {
    return function(target: any,  prpoertyKey: string, paramterIndex: number) {
      target.validators = {
        max: function(args: string[]) {
          return args[paramterIndex].length <= max;
        }
      }
    }
  }

  function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) { const method = descriptor.value;
    descriptor.value = function(...args) {
      Object.keys(target.validators).forEach(key => {
        if(!target.validators[key](args)) {
          throw new Error('Validation Error')
        }
      })
      method.apply(this, args);
    }
  }

  class Human {
    private name: string;

    @validate
    setName(@maxLength(5) name: string) {
      this.name = name
      console.log(`Set name: ${name}`)
    }
  }

  const human = new Human();
  human.setName('Mark');
})();
