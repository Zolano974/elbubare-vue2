'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Example = require('@/components/Example');

var _Example2 = _interopRequireDefault(_Example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
// import Hello from '@/components/Hello'
exports.default = new _vueRouter2.default({
  routes: [
  // {
  //   path: '/',
  //   name: 'Hello',
  //   component: Hello
  // },
  {
    path: '/',
    name: 'Example',
    component: _Example2.default
  }]
});
//# sourceMappingURL=index.js.map