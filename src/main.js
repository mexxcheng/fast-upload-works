import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';
import VueCanvasPoster from 'vue-canvas-poster'
Vue.use(VueCanvasPoster);
import './api';
import './lazy_antd';

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
