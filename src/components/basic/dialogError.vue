<template>
<q-dialog persistent :modelValue="show">
	<q-card class="text-white" :class="['bg-'+info.color]" style="width: auto; max-width: 90vw;">
		<q-card-section class="bg-negative">
			<div class="text-h6">{{ info?.message }}</div>
		</q-card-section>
		<q-card-section>
			<b>
				{{ info.content }}
			</b>
			<div v-if="info.errors.length" class="q-py-md text-right">
			<q-separator class="q-my-sm"/>
				<div class="text-italic">{{ info.errors.length }} Detalles</div>
				<q-toggle v-model="showDetail" :label="(showDetail ? 'Ocultar': 'Mostrar' ) + ' detalles'" />
			</div>
		</q-card-section>
		<q-card-section v-if="showDetail" class="q-pt-none">
			<div>
			<template v-for="(err, erri) in info.errors" :key="erri">
				<div class="q-py-xm">
					<b v-if="err.key"> {{ err.key }} : </b>
					<b v-else> · </b>
					<span> {{ err.val }} </span>
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
import { organizeErrors } from '@/util/helpers';

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
			showDetail: false,
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
			if(this.server.error) this.showDetail = false;
			return Boolean(this.server.error);
		},
		info(){
					let icon = '', color = 'negative', message = 'Error';
					let content = 'Ups, algo falló!';

					if(this.server.error?.data?.message)
						content = this.server.error.data.message;

					let status = this.server.error?.status || 100;
					let errors = organizeErrors(this.server.error?.data);

					console.log({ errors });


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
							break;

						case 419:
							icon = 'sym_o_electrical_services'
							color = 'negative';
							message = 'Algo falló';
							break;

						case 422:
							icon = 'sym_o_electrical_services'
							color = 'negative';
							message = 'Hay que validar';
							break;

						case 500:
							icon = 'sym_o_gpp_maybe'
							color = 'dark';
							message = 'Error del Sistema';
							break;
					}

					return { status, icon, color, content, message, errors };
				}


	},
}
</script>
