'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _AppStore = require('./store/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'); // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


_vue2.default.use(_vuex2.default);
_vue2.default.config.productionTip = false;

/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  router: _router2.default,
  store: _AppStore2.default,
  template: '<App/>',
  components: { App: _App2.default }
});
//# sourceMappingURL=main.js.map