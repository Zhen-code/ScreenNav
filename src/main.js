import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "../utils/request";
import changeTime from "../utils/changeTime"


Vue.use(ElementUI);

// Vue.prototype.$vueMask = vueMask;

Vue.prototype.$request = request;
Vue.prototype.$changeTime=changeTime;
Vue.config.productionTip = false;

const app =   new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default app;