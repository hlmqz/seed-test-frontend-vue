<template>
<div>
	<div v-if="showPagination" class="row justify-center q-py-md">
		<q-pagination
			v-model="current_page"
			:color="color"
			:min="1"
			:max="totalPages"
			:max-pages="maxPages"
			@update:model-value="doEmits"
			boundary-numbers
		/>
	</div>
	<slot></slot>
	<div v-if="showPagination" class="row justify-center q-py-md">
		<q-pagination
			v-model="current_page"
			:color="color"
			:min="1"
			:max="totalPages"
			:max-pages="maxPages"
			@update:model-value="doEmits"
			boundary-numbers
		/>
	</div>
</div>
</template>

<script>
export default {
	emits:['update:modelValue', 'changed'],
	props:{
		modelValue:{
			type: Number,
			required: true,
		},
		total:{
			type: Number,
			required: true,
		},
		perPage:{
			type: Number,
			required: false,
			default: 15,
		},
		color:{
			type: String,
			required: false,
			default: 'primary',
		}
	},
	watch:{
		modelValue(nv, ov){
			this.current_page = nv;
		},

		total(nv, ov){
			this.validateCurrent();
		},

	},
	data(){
		return {
			current_page: 1,
		}
	},
	methods:{
		validateCurrent(){
			if(this.current_page > this.totalPages){
				this.doEmits(1);
			}
		},
		doEmits(nv){
			this.$emit('update:modelValue',nv);
			this.$emit('changed');
		}
	},
	computed:{
		totalPages(){
			if(!this.total) return 1;
			return Math.ceil(this.total/this.perPage);
		},
		showPagination(){
			return this.totalPages > 1;
		},
		maxPages(){
			return (this.totalPages > 9 ? 8 : this.totalPages);
		},
	},
	created(){
		this.current_page = this.modelValue;
	}
}
</script>