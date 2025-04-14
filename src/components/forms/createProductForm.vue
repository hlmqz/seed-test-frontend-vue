<template>
<dialog-basic :modelValue="show">
	<q-form @submit="doCreate">
	<q-card class="bgd-soft txt">
		<q-card-section class="q-pt-xl text-center">
			<h4>Crear Producto</h4>
		</q-card-section>
		<q-card-section>
			<div class="row bgd-soft">

				<div class="q-px-md q-py-xs col-12 col-xl-6">
					<q-input
						outlined
						v-model="item.name"
						label="Nombre"
						class="txt"
						:rules="[ validators.isValue, (v) => validators.lengthMax(v, 120) ]"
					/>
				</div>

				<div class="q-px-md q-py-xs col-12 col-md-8 col-xl-3">
					<q-input
							outlined
							v-model="item.price"
							type="number"
							label="Precio"
							class="txt"
							:rules="[ validators.isValue, (v) => validators.valueMin(v, 1) ]"
						/>
					</div>

				<div class="q-px-md q-py-xs col-12 col-md-4 col-xl-3 text-center">
					<q-toggle
						v-model="item.active"
						
						size="lg"
						checked-icon="sym_o_check"
						color="positive"
						:label="item.active ? 'Activado' : 'Desactivado'"
						unchecked-icon="sym_o_remove"
					/>
				</div>

				<div class="q-px-md q-py-xs col-12">
					<q-input
							style="max-height: 640px;"
							outlined
							autogrow
							v-model="item.description"
							type="textarea"
							label="Descripción"
							class="txt full-width"
							:rules="[ validators.isValue, (v) => validators.lengthMax(v, 500) ]"
						/>
				</div>

			</div>
		</q-card-section>
		<q-card-actions class="row q-pa-md">
			<q-btn
				flat
				color="negative"
				class="col"
				icon="sym_o_block"
				label="cacelar"
				@click="$emit('close')"
			/>
			<q-btn
				flat
				:disable="saving"
				:loading="saving"
				type="submit"
				color="positive"
				class="col"
				icon="sym_o_check"
				label="Crear"
			/>
		</q-card-actions>
	</q-card>
	</q-form>
</dialog-basic>
</template>
<script>
import validators from '@/util/validators';
import serverStore from '@/stores/server';
import dialogBasic from '@/components/basic/dialogBasic.vue';
import productBuilder from '@/util/builders/product';

export default {
	name: '',
	components:{
		dialogBasic,
	},
	props:{
		show: {
			type: Boolean,
			default: false,
		}
	},
	emits:['close','created'],
	data(){
		return {
			validators,
			saving: false,
			server: serverStore(),
			item: productBuilder(),
		}
	},
	watch:{
		show(nv, ov){
			this.item = productBuilder();
			this.saving = false;
		}
	},
	methods:{
		async doCreate(){
			this.saving = true;
			let created = await this.server.post('/api/product', this.item);

			if(created){
				this.$emit('created');
				this.$emit('close');
			}
			else
				this.saving = false;
		}
	},
	computed:{
	},
}
</script>
