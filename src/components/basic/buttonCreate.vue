<template>
	<div class="row full-width" :class="[(minimized ? 'q-py-md': 'q-py-xl q-my-xl')]">
		<div v-if="minimized" class="col-auto q-pr-md">
			<span><b>{{ total }}</b> registros</span>
			<br>
			<span>en total</span>
		</div>
		<div v-if="minimized" class="col q-px-md">
			<search-box
				@search="doSearch"
			/>
		</div>
		<div :class="[(minimized ? 'col-auto text-right q-pl-md q-pt-xs': 'col-12 text-center')]">
			<q-btn
				:size=" minimized ? 'md' : 'lg' "
				color="primary"
				icon="sym_o_add"
				:label="label"
				@click="$emit('click')"
			/>
		</div>

		<div v-if="!total && search" class="col-12 text-center q-py-xl q-my-xl">
			<h1 class="txt-soft">
				No se encontraron Registros
			</h1>
		</div>
	</div>
</template>
<script>
import searchBox from '@/components/basic/searchBox.vue';
export default {
	components: {
		searchBox,
	},
	props:{
		total: {
			type: Number,
			default: 0,
		},
		label: {
			type: String,
			default: '',
		},
	},
	emits:['click', 'search'],
	data(){
		return {
			search: '',
		}
	},
	methods: {
		doSearch(search){
			this.search = search;
			this.$emit('search', search);
		}
	},
	computed:{
		minimized(){
			return Boolean(this.total || this.search);
		}
	},
}
</script>
