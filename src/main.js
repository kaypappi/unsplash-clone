import Vue from "vue";
import App from "./App.vue";
import { VueMasonryPlugin } from "vue-masonry";
import axios from "axios";
import { VueSpinners } from "@saeris/vue-spinners";

Vue.use(VueMasonryPlugin, VueSpinners);
Vue.config.productionTip = false;

new Vue({
  axios,
  render: h => h(App)
}).$mount("#app");
