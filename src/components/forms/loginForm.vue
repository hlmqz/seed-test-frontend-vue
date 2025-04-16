<template>
<q-form
	@submit="onSubmit"
	@reset="onReset"
	class=""
>
<div class="q-pa-md">
	<div class="q-pa-md">
		<h1 class="q-py-md text-center">
				{{ title }}
		</h1>
		<div class="col-12 q-py-sm">
			<q-input
				outlined
				v-model="formdata.email"
				type="email"
				label="E-mail"
				class="txt"
				:rules="[ validators.isValue, validators.isEmail ]"
			/>
		</div>

		<div class="col-12 q-py-sm">
			<q-input
				outlined
				v-model="formdata.password"
				type="password"
				label="password"
				class="txt"
				:rules="[ validators.isValue ]"
			/>
		</div>

	</div>
	<div class="q-pa-md text-center">
		<q-btn
			flat
			:disable="inSend"
			type="submit"
			icon="sym_o_login"
			color="primary"
			label="Ingresar"
			class="q-pt-sm full-width"
		/>
	</div>
</div>
</q-form>
</template>
<script>
import validators from '@/util/validators';
import serverStore from '@/stores/server';


export default {
	name: '',
	components:{
	},
	props:{
		title: {
			type: String,
			default: 'LOGIN',
		}
	},
	emits:[],
	data(){
		return {
			server: serverStore(),
			validators,
			inSend: false,
			formdata: {
				email: '',
				password: '',
			}
		}
	},
	watch:{
	},
	methods:{
		async onSubmit(){
			this.inSend = true;
			await this.server.makeSession( this.formdata );

			if(this.server.session)
				this.$router.push({name: 'dashboard'});

			this.inSend = false;
		},
		onReset(){

		}
	},
	computed:{
	},
}
</script>
