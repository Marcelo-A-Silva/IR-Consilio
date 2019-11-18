<template>
	<div>
	</div>
</template>

<script>
export default {
	name: 'Logoff',
	mounted () {
		this.logoff();
	},
	methods: {
		logoff () {
			localStorage.removeItem('userData');
			this.$router.push({path: '/login'});
		}
	}
}
</script>
