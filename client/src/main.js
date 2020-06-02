import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-108233351-6" },
});
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
