'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Animal = (_dec = Reflect.metadata('attr', { canRun: true }), _dec2 = Reflect.metadata('parameters', [{ "name": "string", "isArray": false }]), _dec(_class = (_class2 = function () {
  function Animal() {
    _classCallCheck(this, Animal);
  }

  _createClass(Animal, null, [{
    key: 'isFourFeet',
    value: function isFourFeet(animalName) {
      if (animalName === 'cat') {
        return true;
      }
      if (animalName === 'fish') {
        return false;
      }
    }
  }]);

  return Animal;
}(), (_applyDecoratedDescriptor(_class2, 'isFourFeet', [_dec2], Object.getOwnPropertyDescriptor(_class2, 'isFourFeet'), _class2)), _class2)) || _class);
exports.default = Animal;