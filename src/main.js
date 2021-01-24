import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "@/store";
import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use((config) => {
  config.withCredentials = true
  return config
}, (error) => {
  return Promise.reject(error)
})
Vue.use(Cookies);
Vue.prototype.$myCookie = Cookies;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el:"#app",
  router,
  store,
  render: h => h(App),
}).$mount('#app')
