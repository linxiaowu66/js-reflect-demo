'use strict';

var _reflect = require('./reflect');

var _reflect2 = _interopRequireDefault(_reflect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test() {
  var attr = Reflect.getMetadata('attr', _reflect2.default);
  console.log('animal attr is:', attr);
  var parameter = Reflect.getMetadata('parameters', _reflect2.default, "isFourFeet");
  console.log('isFourFeet parameter is:', parameter);
}

test();