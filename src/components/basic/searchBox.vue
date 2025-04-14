<template>
<q-form @submit="doEmits">
<div class="row">
	<div class="col">
		<q-input
			dense
			outlined
			clearable
			v-model="search"
			label="Búsqueda"
			class="txt q-pt-xs"
			@clear="doEmits"
		/>
	</div>
	<div class="col-auto q-pt-xs">
		<q-btn
			flat
			icon="sym_o_search"
			type="submit"
			style="padding: 8px 16px;"
		/>
	</div>
</div>
</q-form>
</template>
<script>
export default {
	emits:['search'],
	data(){
		return {
			search: '',
		}
	},
	methods:{
		doEmits(){
			this.$emit('search', this.search?.trim());
		}
	},
}
</script>
