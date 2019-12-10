import Dog from './dog'
import Animal from './animal';

function inject(value) {
  return (target) => {
    Reflect.defineMetadata('childClass', value, target)
    // Reflect.defineMetadata('childClass', value, target.prototype)
  }
}

class A {
  constructor() {
    const childClassMeta = Reflect.getOwnMetadata('childClass', this.constructor)
    // const childClassMeta = Reflect.getOwnMetadata('childClass', this)

    console.log(`we can get the child metakey by getMetadata insteadof getOwnMetadata:[${JSON.stringify(childClassMeta)}]`)
  }
}

@inject({
  test: true
})
class B extends A {

}

function test() {
  // Dog继承了Animal,所以使用getMetadata会在原型链上查找是否有attr的metaKey
  const attr = Reflect.getMetadata('attr', Dog)
  console.log('we find attr metakey in the Animal:', attr)
  const parameter = Reflect.getMetadata('parameters', Dog, "isFourFeet")
  console.log('we find the isFourFeet parameter in the Animal:', parameter)

  // 如果这时我使用getOwnMetadata的话将会找不到该metakey
  const attr1 = Reflect.getOwnMetadata('attr', Dog)
  console.log('we can not find attr metakey in the Dog as we using getOwnMetadata, value:', attr1)

  // 如果我们想在Animal上获取Dog的metakey
  const attr2 = Reflect.getMetadata('dogattr', Animal)
  console.log(attr2)

  // 接下来演示如何在父类中拿到子类的metaKey
  new B()

  // 搞懂这个父类拿到子类的metaKey的话需要你知道class继承的实现原理，继承的本质是会在B的构造函数中执行A函数，并将B的this传给A，所以此时A的
  // 构造函数的this此时是函数B，因此this.contructor其实就是B这个构造函数，而B这个构造函数因为使用修饰器，所以是在B构造函数注入了childClass
  // 这个元数据，如果使用target.prototype的话，那么是在构造函数的原型对象上添加，这样的话getOwnMetadata就取不到对应的值了

  /*
  class A {
    constructor() {
      console.log(this.constructor)
    }
    method() {
    }
  }

  class B extends A {

    methodB() {}
  }
  */

  /*
    "use strict";

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var A =
    function () {
      function A() {
        console.log(this.constructor);
      }

      var _proto = A.prototype;

      _proto.method = function method() {};

      return A;
    }();

    var B =
    function (_A) {
      _inheritsLoose(B, _A);

      function B() {
        return _A.apply(this, arguments) || this;
      }

      var _proto2 = B.prototype;

      _proto2.methodB = function methodB() {};

      return B;
    }(A);

  */
}

test()
