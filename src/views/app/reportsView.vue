<template>
<div class="row flex justify-center items-center full-height">
	<div class="col-10 col-sm-8 col-md-6 col-lg-4">
		<div class="q-pa-md text-center q-mb-md">
			<h1>
				REPORTES
			</h1>
			<h4 class="q-my-md txt-soft">Próximamente</h4>
			<q-btn
				flat
				icon="sym_o_arrow_back_ios"
				class="q-my-xl"
				label="dashboard"
				:to="{name: 'dashboard'}"
			/>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: '',
	components:{
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
