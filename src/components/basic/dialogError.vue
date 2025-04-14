<template>
<q-dialog v-model="show">
	<q-card class="bg-negative text-white" style="width: auto; max-width: 90vw;">
		<q-card-section>
			<div class="text-h6">{{ info?.message }}</div>
		</q-card-section>

		<q-card-section class="q-pt-none">
			<div>
			<template v-for="(err, erri) in info.errors" :key="erri">
				<div class="q-py-sm">
					<b v-if="!Array.isArray(info.errors)"> {{erri}}: </b>
					<span> {{err}} </span>
				</div>
			</template>
			</div>
		</q-card-section>

		<q-card-actions class="bg-dark" align="center">
			<q-btn
				flat 
				color="negative"
				label="Aceptar"
				@click="closeDialog"
				class="full-width"
			/>
		</q-card-actions>
	</q-card>
</q-dialog>
</template>
<script>
import serverStore from '@/stores/server';

export default {
	name: '',
	components:{
	},
	props:{
	},
	emits:[],
	data(){
		return {
			server: serverStore(),
		}
	},
	watch:{
	},
	methods:{
		closeDialog(){
			this.server.error = null;
		}
	},
	computed:{
		errors(){
			return this.server.error?.response?.data;
		},
		show(){
			return Boolean(this.server.error);
		},
		info(){
					let status = 0, icon = '', color = '', message = 'Error', errors = [];

					status = this.server.error?.status || 100;

					switch(status){

						case 401:
							icon = 'sym_o_gpp_bad';
							color = 'grey-8';
							message = 'Sin autenticación válida';
							this.server.session = null;
							break;

						case 403:
							icon = 'sym_o_gpp_maybe'
							color = 'orange-9';
							message = 'Sin acceso válido';
							break;

						case 404:
							icon = 'sym_o_electrical_services'
							color = 'negative';
							message = 'upps! No hay lo que buscas';
							break;

						case 405:
							icon = 'sym_o_electrical_services'
							color = 'negative';
							message = 'Ups!';
							errors = this.server.error.data;
							break;

						case 422:
							icon = 'sym_o_electrical_services'
							color = 'negative';
							message = 'Algo faltó';
							errors = Object.values(this.server.error.data?.errors).map(ar => ar.join(', '));
							break;

						case 500:
							icon = 'sym_o_gpp_maybe'
							color = 'dark';
							message = 'Error del Sistema';
							errors = this.server.error.data;
							break;
					}

					return { status, icon, color, message, errors };
				}


	},
}
</script>
