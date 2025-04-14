<template>
<div class="full-width">
	<q-btn
		flat
		size="xl"
		class="full-width"
		:to="to"
	>
	<div class="row full-width">
		<div class="col-auto">
			<q-icon :name="icon" />
		</div>
		<div class="col q-pt-xs text-center">
			{{ label }}
		</div>
	</div>
</q-btn>
</div>
</template>
<script>
export default {
	props:{
		icon: {
			type: String,
			default: 'sym_o_arrow_forward',
		},
		label: {
			type: String,
			default: '',
		},
		to: '/',
	},
}
</script>
