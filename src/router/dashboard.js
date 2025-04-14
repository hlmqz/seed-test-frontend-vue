export default {
	path: '',
	name: 'root-dashboard',
	meta: {
		requireUser: true,
		fitView: true,
	},
	children: [
		{
			path: '',
			name: 'dashboard',
			component: () => import('@/views/app/dashboardView.vue'),
			
		},
		{
			path: 'productos',
			name: 'productos',
			component: () => import('@/views/app/productsView.vue'),
			
		},
		{
			path: 'reportes',
			name: 'reportes',
			component: () => import('@/views/app/reportsView.vue'),
			
		},
	],
}
