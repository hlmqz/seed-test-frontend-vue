<template>
	<q-btn
		flat
		round
		:icon="icon"
		@click="toggle"
	/>
</template>
<script>

export default {
	components: {
	},
	data(){
		return {
			systemDarkModeQuery: window.matchMedia("(prefers-color-scheme: dark)"),
			index: 'theme_visibility',
			mode: 'light',
		}
	},

	methods:{
		toggle(){
			let theme = localStorage.getItem(this.index);
			this.setTheme(theme == 'light' ? 'dark' : 'light');
		},
		setTheme(theme){

			if (theme == 'light') {
				document.documentElement.classList.remove("theme-dark");
				document.documentElement.classList.add("theme-light");
			}
			else {
				document.documentElement.classList.remove("theme-light");
				document.documentElement.classList.add("theme-dark");
			}

			localStorage.setItem(this.index, theme);
			this.mode = theme;
		},

		matchMediaEvent(e){
			this.setTheme(e.matches ? 'dark' : 'light');
		}
	},
	computed: {
		icon(){
			return this.mode == 'dark' ? 'sym_o_light_mode' : 'sym_o_dark_mode' ;
		},
		label(){
			return 'tema '+ (this.mode == 'dark' ? 'claro' : 'oscuro') ;
		}
	},
	created(){
		document.documentElement.classList.remove("documentElement--light");

		let sysDark = this.systemDarkModeQuery.matches ? 'dark' : 'light';
		let theme = localStorage.getItem(this.index);

		this.systemDarkModeQuery.addListener(this.matchMediaEvent);
		this.setTheme(theme ?? sysDark);
	},
}
</script>