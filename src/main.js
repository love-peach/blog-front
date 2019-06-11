import App from './App.vue';

import router from './router';
import store from './store';

import './styles/index.less';

import * as filters from './filters';

import Toast from './components/base/toast/';

// 注册全局 filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(Toast);

// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
