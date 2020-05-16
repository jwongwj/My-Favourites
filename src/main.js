/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
