export default {
	path: ':pathMatch(.*)*',
	name: 'error404',
	component: () => import('@/views/errorView.vue'),
}
