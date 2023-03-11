/*
데코레이터 팩토리
- 데코레이터에 인수를 넘겨서 데코레이터를 변경하고 싶을 경우 활용. 데코레이터를 리턴
*/

(() => {
  function logDate(type: 'iso' | 'locale') {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const method = descriptor.value;
      switch (type) {
        case 'iso': {
          descriptor.value = function () {
            console.log(`start: ${new Date().toISOString()}`);
            method();
          };
          break;
        }
        case 'locale': {
          descriptor.value = function () {
            console.log(`start: ${new Date().toLocaleString()}`);
            method();
          };
          break;
        }
        default:
      }
    };
  }

  class Human {
    @logDate('locale')
    walk() {
      console.log('걷다');
    }
  }

  const human = new Human();
  human.walk();
})()
