'use strict';

var _dec, _class;

var _dog = require('./dog');

var _dog2 = _interopRequireDefault(_dog);

var _animal = require('./animal');

var _animal2 = _interopRequireDefault(_animal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function inject(value) {
  return function (target) {
    Reflect.defineMetadata('childClass', value, target);
  };
}

var A = function A() {
  _classCallCheck(this, A);

  var childClassMeta = Reflect.getOwnMetadata('childClass', this.constructor);

  console.log('we can get the child metakey by getMetadata insteadof getOwnMetadata:[' + JSON.stringify(childClassMeta) + ']');
};

var B = (_dec = inject({
  test: true
}), _dec(_class = function (_A) {
  _inherits(B, _A);

  function B() {
    _classCallCheck(this, B);

    return _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).apply(this, arguments));
  }

  return B;
}(A)) || _class);


function test() {
  // Dog继承了Animal,所以使用getMetadata会在原型链上查找是否有attr的metaKey
  var attr = Reflect.getMetadata('attr', _dog2.default);
  console.log('we find attr metakey in the Animal:', attr);
  var parameter = Reflect.getMetadata('parameters', _dog2.default, "isFourFeet");
  console.log('we find the isFourFeet parameter in the Animal:', parameter);

  // 如果这时我使用getOwnMetadata的话将会找不到该metakey
  var attr1 = Reflect.getOwnMetadata('attr', _dog2.default);
  console.log('we can not find attr metakey in the Dog as we using getOwnMetadata, value:', attr1);

  // 如果我们想在Animal上获取Dog的metakey
  var attr2 = Reflect.getMetadata('attr', _animal2.default);
  console.log(attr2);

  // 接下来演示如何在父类中拿到子类的metaKey
  new B();

  // 从上面的示例，知道为什么了吗？
  // 问题1：为什么defineMetadata的时候需要使用的是target.prototype
  // 问题2：为什么取metadata的时候使用的是getMetadata而不是getOwnMetadata？这两个问题有关联关系的
}

test();