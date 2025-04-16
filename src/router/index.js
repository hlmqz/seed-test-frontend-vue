import { createRouter, createWebHistory } from 'vue-router'
import serverStore from '@/stores/server';

import error from './error';
import dashboard from './dashboard';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'root',
			meta: {
				showButtonTheme: true,
			},
			children: [
				{
					path: 'login',
					name: 'login',
					component: () => import('@/views/auth/loginView.vue'),
				},
				dashboard,
				error,
			]
		},
	],
})

router.beforeEach( async (to, from) => {

	const server = serverStore();

	let timeOk = await server.validateTimeSession();

	if(to.meta?.requireUser && !timeOk)
			return {name: 'login'};

	if(to.name == 'login' && timeOk)
		return {name: 'dashboard'};

});

export default router
