function dateDeco(type: 'iso' | 'locale') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    switch (type) {
      case 'iso': {
        descriptor.value = function () {
          console.log(`start: ${new Date().toISOString()}`);
          method();
          console.log(`end: ${new Date().toISOString()}`);
        };
        break;
      }
      case 'locale': {
        descriptor.value = function () {
          console.log(`start: ${new Date().toLocaleString()}`);
          method();
          console.log(`end: ${new Date().toLocaleString()}`);
        };
        break;
      }
      default:
    }
  };
}

class Human {
  @dateDeco('iso')
  walk() {
    console.log('걷다');
  }
}

const human = new Human();
human.walk();
