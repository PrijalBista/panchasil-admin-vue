import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import ErrorsClass from './ErrorsClass';
import axios from 'axios';

Vue.use(VueRouter);

Vue.prototype.$hostname = "https://api.panchasilmedia.com";
// Vue.prototype.$hostname = "http://127.0.0.0:8000";
// Vue.prototype.$hostname = "";
Vue.prototype.$assetBaseurl = "";

Vue.prototype.$ErrorsClass = ErrorsClass;
Vue.prototype.$axios = axios;

// set axios interceptor to check if auth token is failed
axios.interceptors.response.use(res => {

  if(res.data.status == "unauthorized") {
  	localStorage.removeItem('authUser');
    window.location.href = '/#/login';
  }
  // Important: response interceptors **must** return the response.
  return res;
});

// Set Bearer token if logged in
const authUser = JSON.parse(localStorage.getItem('authUser'));

if(authUser && authUser.accessToken) {
	Vue.prototype.$axios.defaults.headers.common = {'Accept': 'application/json', 'Authorization': `Bearer ${authUser.accessToken}`};
	// test if jwt is expired 
	axios.get(`${Vue.prototype.$hostname}/api/user`).then(()=>{}).catch(err => console.log(err));
}

const router = new VueRouter({ routes, mode: "hash" });

router.beforeEach( (to, from, next) => {

	const authUser = JSON.parse(localStorage.getItem('authUser'));

	// All routes in cms requires auth check Except login.
	if (to.path !== '/login' && !authUser) next({ name: 'Login' });
	else next();
});
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
