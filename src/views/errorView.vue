<template>
<div class=" row justify-center items-center window-height bg-negative">
	<div class="text-center text-white">
		<div class="text-h6">error</div>
		<div class="text-h1">404</div>
		<div class="text-h5">No encontrado</div>

		<div class="q-py-md">
			<q-btn
				outline
				size="lg"
				icon="sym_o_arrow_back"
				:to="{name: 'dashboard'}"
				label="Volver al inicio"
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
