<template>
<q-dialog persistent :modelValue="showLoader">
	<q-circular-progress
		indeterminate
		rounded
		size="120px"
		color="yellow"
		class="q-ma-md no-scroll"
	/>
</q-dialog>
</template>
<script>
import serverStore from '@/stores/server';

export default {
	data(){
		return {
			server: serverStore(),
		}
	},
	computed:{
		showLoader(){
			return Boolean(this.server.sending.size);
		}
	},
}
</script>
