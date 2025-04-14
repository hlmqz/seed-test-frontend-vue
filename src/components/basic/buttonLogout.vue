<template>
<q-btn
	flat
	color="negative"
	@click="closeSession"
	icon="sym_o_logout"
	label="Cerrar sesión"
/>
</template>
<script>
import serverStore from '@/stores/server';

export default {
	methods:{
		async closeSession(){
			let server = serverStore();
			server.session = null;
			await server.closeSession();
			this.$router.push({name: 'login'});
		}
	},
}
</script>
