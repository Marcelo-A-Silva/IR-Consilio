// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import VueShortKey from 'vue-shortkey';
import theme from './theme';
import constants from '../config/constants';

Vue.prototype.CONFIG = process.env;
Vue.prototype.CONSTANTS = constants;
Vue.config.productionTip = false;

Vue.use(Vuetify, {
	theme
})
Vue.use(VueResource);
Vue.use(VueShortKey);
Vue.config.productionTip = false
Vue.use(Vuetify)
export default new Vuetify({ })

new Vue({
	el: '#app',
	router,
	vuetify: new Vuetify(),
	components: { App },
	template: '<App/>'
})
