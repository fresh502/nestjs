function dateDeco(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`start: ${new Date().toISOString()}`);
}

class Human {
  @dateDeco
  walk() {
    console.log('Walk!');
  }
}

const t = new Human();
t.walk();
