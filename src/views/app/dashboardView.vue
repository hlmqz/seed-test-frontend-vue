<template>
<div class="row flex justify-center items-center full-height">
	<div class="col-10 col-sm-8 col-md-6 col-lg-4">
		<h1 class="q-pa-md text-center q-mb-md">
			DASHBOARD
		</h1>
		<div class="row q-gutter-md">
			<item-dashboard
				icon="sym_o_dashboard"
				label="Productos"
				:to="{name: 'productos'}"
				class="bgd-soft"
			/>

			<item-dashboard
				icon="sym_o_query_stats"
				label="Reportes"
				:to="{name: 'reportes'}"
				class="bgd-soft"
			/>
		</div>
	</div>
</div>
</template>
<script>
import itemDashboard from '@/components/basic/itemDashboard.vue';

export default {
	name: '',
	components:{
		itemDashboard,
	},
	props:{
	},
	emits:[],
	data(){
		return {
		}
	},
	watch:{
	},
	methods:{
	},
	computed:{
	},
}
</script>
