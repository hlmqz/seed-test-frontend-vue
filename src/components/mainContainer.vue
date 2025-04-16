<template>
	<q-layout view="hHh lpR fFf">

		<q-header class="txt-heading bgd">
			<q-toolbar class="row q-gutter-x-md q-py-md">
				<div
					class="col-auto"
					v-if="$route.meta.requireUser && $route.name != 'dashboard'"
				>
					<q-btn
						flat
						icon="sym_o_arrow_back_ios"
						label="dashboard"
						:to="{name: 'dashboard'}"
					/>
				</div>
				<div class="col text-right">
					<button-logout v-if="$route.name != 'login' "/>
				</div>
				<div class="col-auto">
					<button-theme />
				</div>
			</q-toolbar>
		</q-header>

		<q-page-container class="window-height q-pa-md" :class="[$route.meta.fitView ? 'row justify-center' : '']">
			<router-view :class="[($route.meta.fitView ? 'col-12 col-md-8 col-lg-6' : '')]"/>
		</q-page-container>
		<dialog-error />
		<dialog-loader />
	</q-layout>
</template>

<script>
import { ref } from 'vue'
import buttonTheme from '@/components/basic/buttonTheme.vue';
import buttonLogout from '@/components/basic/buttonLogout.vue';
import dialogError from '@/components/basic/dialogError.vue';
import dialogLoader from '@/components/basic/dialogLoader.vue';

export default {
	components:{
		buttonTheme,
		buttonLogout,
		dialogError,
		dialogLoader,
	},
	data(){
		return {
			leftDrawerOpen: false,
		}
	},
	methods: {
		toggleLeftDrawer() {
			this.leftDrawerOpen = !this.leftDrawerOpen
		}
	},
}
</script>