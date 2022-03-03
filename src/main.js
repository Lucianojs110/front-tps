import Vue from "vue";
import swal from "sweetalert";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";
import router from "./routes/router";
import VueAxios from "vue-axios";
import Axios from "axios";
import Vuelidate from 'vuelidate';
import store from './store';
import VueToastr from "vue-toastr";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
//Vue.use(IconsPlugin);
Vue.use(DashboardPlugin);
Vue.use(VueAxios, Axios);
Vue.use(Vuelidate);
Vue.use(VueToastr);



new Vue({
  el: "#app",
  render: h => h(App),
  router, 
  store
  
});



