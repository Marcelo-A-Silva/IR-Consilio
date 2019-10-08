import Vue from 'vue'
import Router from 'vue-router'

import LoginView from '@/components/LoginView';
import MainApp from '@/components/MainApp';

import Dashboard from '@/components/views/Dashboard';
import Carteira from '@/components/views/carteira/Carteira'
import Logoff from '@/components/views/Logoff';
Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/login',
			component: LoginView
		},
		{
			path: '/logoff',
			component: Logoff
		},
		{
			path: '/',
			component: MainApp,
			children: [
				{	path: '/dashboard', name: 'Dashboard', component: Dashboard },
				{path: '/carteira', name: 'Carteira',	component: Carteira},
				{path: '*', redirect: '/dashboard'}

			]
		}
	]
})
router.beforeEach((to, from, next) => {
	const publicPages = ['/login', '/logoff'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('userData');
	const instance = router.app;
	const teste = JSON.parse(loggedIn);
	if (authRequired && !loggedIn) {
		return next('/login');
	}

	if (authRequired) {
		instance.$http
			.get(instance.CONFIG.API_URL + 'login/checktoken', {headers: {'token': teste}})
			.catch(() => {
				return next('/login');
			});
	}
	next();
});

export default router;
