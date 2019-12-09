'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _class, _desc, _value, _class2;

var _animal = require('./animal');

var _animal2 = _interopRequireDefault(_animal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

require('reflect-metadata');

let Dog = (_dec = Reflect.metadata('dogattr', { canRun: true }), _dec2 = Reflect.metadata('dogparameters', [{ "name": "string", "isArray": false, "isPrimitive": true }]), _dec(_class = (_class2 = class Dog extends _animal2.default {
  constructor() {
    super();
  }

  static isFourFeet() {
    console.log('I am a dog');
  }
}, (_applyDecoratedDescriptor(_class2, 'isFourFeet', [_dec2], Object.getOwnPropertyDescriptor(_class2, 'isFourFeet'), _class2)), _class2)) || _class);
exports.default = Dog;