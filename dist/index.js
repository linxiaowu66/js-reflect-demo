'use strict';

var _dec, _class;

var _dog = require('./dog');

var _dog2 = _interopRequireDefault(_dog);

var _animal = require('./animal');

var _animal2 = _interopRequireDefault(_animal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inject(value) {
  return target => {
    Reflect.defineMetadata('childClass', value, target);
    // Reflect.defineMetadata('childClass', value, target.prototype)
  };
}

let A = class A {
  constructor() {
    const childClassMeta = Reflect.getOwnMetadata('childClass', this.constructor);
    // const childClassMeta = Reflect.getOwnMetadata('childClass', this)

    console.log(`we can get the child metakey by getMetadata insteadof getOwnMetadata:[${JSON.stringify(childClassMeta)}]`);
  }
};
let B = (_dec = inject({
  test: true
}), _dec(_class = class B extends A {}) || _class);


function test() {
  // Dog继承了Animal,所以使用getMetadata会在原型链上查找是否有attr的metaKey
  const attr = Reflect.getMetadata('attr', _dog2.default);
  console.log('we find attr metakey in the Animal:', attr);
  const parameter = Reflect.getMetadata('parameters', _dog2.default, "isFourFeet");
  console.log('we find the isFourFeet parameter in the Animal:', parameter);

  // 如果这时我使用getOwnMetadata的话将会找不到该metakey
  const attr1 = Reflect.getOwnMetadata('attr', _dog2.default);
  console.log('we can not find attr metakey in the Dog as we using getOwnMetadata, value:', attr1);

  // 如果我们想在Animal上获取Dog的metakey
  const attr2 = Reflect.getMetadata('dogattr', _animal2.default);
  console.log(attr2);

  // 接下来演示如何在父类中拿到子类的metaKey
  new B();

  // 搞懂这个父类拿到子类的metaKey的话需要你知道class继承的实现原理，继承的本质是会在B的构造函数中执行A函数，并将B的this传给A，所以此时A的
  // 构造函数的this此时是函数B，因此this.contructor其实就是B这个构造函数，而B这个构造函数因为使用修饰器，所以是在B构造函数注入了childClass
  // 这个元数据，如果使用target.prototype的话，那么是在构造函数的原型对象上添加，这样的话getOwnMetadata就取不到对应的值了
}

test();