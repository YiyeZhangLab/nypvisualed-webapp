import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import D3Chart from './components/D3Chart.vue';

Vue.config.productionTip = false;
Vue.use(D3Chart);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
