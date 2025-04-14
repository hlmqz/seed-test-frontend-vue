<template>
<div>
	<div class="text-center q-my-xl">
		<h1>PRODUCTOS</h1>
	</div>

	<div>
		<div>
			<button-create
				:total="list.total"
				label="Nuevo Producto"
				@click="itemCreating = true"
				@search="doSearch"
			/>
		</div>
		<div v-if="list.data.length">
			<pagination-list
				v-model="list.current_page"
				:per-page="list.per_page"
				:total="list.total"
				@changed="doSearch"
				class="q-mt-md q-mb-xl"
			>
				<list-products
					:items="list.data"
					@delete="(itm) => itemDeleting = itm"
					@edit="(itm) => itemEditing = itm"
				/>
			</pagination-list>
		</div>
	</div>

	<create-product-form
		:show="itemCreating"
		@close="itemCreating = false"
		@created="doSearch"
	/>

	<edit-product-form
		:record="itemEditing"
		@close="itemEditing = null"
		@edited="doSearch"
	/>

	<confirm-delete
		v-model="itemDeleting"
		:question="questionDeleting"
		:url="urlDeleting"
		@deleted="doSearch"
	/>
</div>
</template>
<script>
import serverStore from '@/stores/server';
import listBuilder from '@/util/builders/list';
import paginationList from '@/components/basic/paginationList.vue';
import listProducts from '@/components/listings/listProducts.vue';
import buttonCreate from '@/components/basic/buttonCreate.vue';
import confirmDelete from '@/components/basic/confirmDelete.vue';
import createProductForm from '@/components/forms/createProductForm.vue';
import editProductForm from '@/components/forms/editProductForm.vue';

export default {
	name: '',
	components:{
		paginationList,
		listProducts,
		buttonCreate,
		confirmDelete,
		createProductForm,
		editProductForm,
	},
	props:{
	},
	emits:[],
	data(){
		return {
			search: '',
			server: serverStore(),
			list: listBuilder(5),
			itemDeleting: null,
			itemCreating: false,
			itemEditing: null,
		}
	},
	watch:{
	},
	methods:{
		async doSearch(search = ''){
			this.search = search;
			this.list = await this.server.get('/api/products',
										{
											search: this.search,
											page: this.list.current_page,
											per_page: this.list.per_page,
										}
									) ?? listBuilder(5);
		},
	},
	computed:{
		questionDeleting(){
			if(!this.itemDeleting)
				return '';

			return `Producto: ${this.itemDeleting.name}`;
		},
		urlDeleting(){
			if(!this.itemDeleting)
				return '';

			return `/api/product/${this.itemDeleting.id}`;
		}
	},
	created(){
		this.doSearch();
	}
}
</script>
