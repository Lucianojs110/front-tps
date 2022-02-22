import Vue from "vue";
import swal from "sweetalert";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";
import router from "./routes/router";
import VueAxios from "vue-axios";
import Axios from "axios";
import Vuelidate from 'vuelidate';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueAxios, Axios);
Vue.use(Vuelidate);
/* Vue.use(sweetalert); */

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
