<template>
<div class="row flex justify-center items-center full-height">
	<div class="col-10 col-sm-8 col-md-6 col-lg-4">
		<q-card class="my-card bgd-soft w-lg">
			<login-form title="Ingreso"/>
		</q-card>
	</div>
</div>
</template>
<script>
import loginForm from '@/components/forms/loginForm.vue';

export default {
	name: '',
	components:{
		loginForm,
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
