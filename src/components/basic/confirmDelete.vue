<template>
<q-dialog
	v-model="show" 
	persistent
	transition-show="scale"
	transition-hide="scale"
>
	<q-card class="bgd-soft txt" style=" min-width: 360px; max-width: 1080px;">
		<q-card-section class="bg-negative text-white">
			<div class="text-h6 text-center"> ¿Desea Eliminar? </div>
		</q-card-section>

		<q-card-section class="q-py-md">
			<div class="q-pa-md text-center text-h6">
				{{ question }}
			</div>
		</q-card-section>

		<q-card-section class="q-py-none">
			<slot></slot>
		</q-card-section>

		<q-card-actions class="">

			<q-btn
				flat
				icon="sym_o_do_not_disturb_on"
				label="Cancelar"
				class="txt col"
				@click="doClose"
			/>

			<q-btn
				flat
				icon="sym_o_delete_forever"
				color="negative"
				label="Si, Eliminar"
				class="col"
				@click="doDelete"
			/>
		</q-card-actions>
	</q-card>
</q-dialog>
</template>

<script>
import serverStore from '@/stores/server';

export default {
	name: 'delete-item',
	props: {
		modelValue: {
			type: [Object, null]
		},
		question: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		}
	},
	emits:['update:modelValue','deleted'],
	watch:{
		modelValue(nv, ov){
			this.show = !!nv;
		}
	},
	methods: {
		async doDelete(){
			let server = serverStore();
			let deleted = await server.delete(this.url);
			if(deleted) this.doClose(true);
		},

		doClose(withUpdated = false){
			if(withUpdated) this.$emit('deleted');
			this.$emit('update:modelValue', null);
		}
	},
	created(){
		this.show = !!this.modelValue;
	}
}
</script>