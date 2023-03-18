/*
여러 개의 데코레이터를 사용하고 싶은 경우 합성이 가능
합성을 사용할 경우
1. 각 데코레이터의 표현은 위에서 아래로 평가(evaluate)
2. 결과는 아래에서 위로 함수로 호출(call)
*/

(() => {
  function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("first(): called");
    };
  }
   
  function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("second(): called");
    };
  }
   
  class Human {
    @first()
    @second()
    walk() {
      console.log('Walk');
    }
  }

  const human = new Human();
  human.walk();
})();