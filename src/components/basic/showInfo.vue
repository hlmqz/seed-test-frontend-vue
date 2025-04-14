<template>
<div class="full-width bgd-mute q-py-xs q-px-md">
	<div class="p-qa-xs text-primary">
		{{ label }}
	</div>
	<div class="p-qa-xs" :class="[colorValue]">
		{{ showValue }}
	</div>
</div>
</template>
<script>
export default {
	props:{
		label: {
			type: String,
			default: '',
		},
		value: '',
	},
	computed:{
		colorValue(){
			if( typeof this.value == 'boolean')
				return this.value ? 'text-green-6' : 'text-orange-6';

			return this.value ? 'txt': 'txt-soft';
		},
		showValue(){
			if( typeof this.value == 'boolean')
				return this.value ? 'ACTIVO' : 'DESACTIVADO';

			return this.value ? this.value : '(NA)'
		}
	},
}
</script>
