<template>
<div class="q-my-md">
	<template v-for="item in items" :key="item.id">
		<div class="row">
			<div class="col row q-my-sm bgd-soft q-pa-sm">

				<div class="q-pa-xs col-12 col-lg-6">
					<show-info
						label="Nombre"
						:value="item.name"
					/>
				</div>

				<div class="q-pa-xs col-12 col-md-8 col-lg-4">
					<show-info
						label="Precio"
						:value="item.price"
					/>
				</div>

				<div class="q-pa-xs col-12 col-md-4 col-lg-2">
					<show-info
						label="Estado"
						:value="item.active"
					/>
				</div>

				<div class="q-pa-xs col-12">
					<show-info
						label="Descripción"
						:value="item.description"
					/>
				</div>

			</div>
			<div class="column justify-center col-auto bgd-soft q-my-sm">
				<div class="q-pa-sm">
					<q-btn
						flat
						size="sm"
						icon="sym_o_edit"
						color="accent"
						label="Editar"
						class="full-width"
						@click="$emit('edit', item)"
					/>
				</div>
				<div class="q-pa-sm">
					<q-btn
						flat
						size="sm"
						icon="sym_o_delete"
						color="negative"
						label="Eliminar"
						class="full-width"
						@click="$emit('delete', item)"
					/>
				</div>
			</div>
		</div>
	</template>
</div>
</template>
<script>
import showInfo from '@/components/basic/showInfo.vue';
export default {
	name: '',
	components:{
		showInfo,
	},
	props:{
		items: {
			type: Array,
			default: () => ([]),
		}
	},
	emits:['edit','delete'],
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
