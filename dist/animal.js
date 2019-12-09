'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _dec2, _class, _desc, _value, _class2;

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

let Animal = (_dec = Reflect.metadata('attr', { canRun: false }), _dec2 = Reflect.metadata('parameters', [{ "name": "string", "isArray": true, "isPrimitive": true }]), _dec(_class = (_class2 = class Animal {
  static isFourFeet(animalName) {
    if (animalName === 'cat') {
      return true;
    }
    if (animalName === 'fish') {
      return false;
    }
  }
}, (_applyDecoratedDescriptor(_class2, 'isFourFeet', [_dec2], Object.getOwnPropertyDescriptor(_class2, 'isFourFeet'), _class2)), _class2)) || _class);
exports.default = Animal;