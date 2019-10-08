<template>
	<div>
		<v-app id="inspire" >
			<Nav ref="Nav"></Nav>
			<Login></Login>
			<SnackBar ref="SnackBar"></SnackBar>
		</v-app>
	</div>
</template>

<script>
import Login from '@/components/views/Login'
import Nav from '@/components/views/navigation/NavigationOff'
import SnackBar from './miscelanea/SnackBar'
export default {
	name: 'LoginView',
	components: {
		'Login': Login,
		'Nav': Nav,
		'SnackBar': SnackBar
	},
	mounted () {
		this.$root.$SnackBar = this.$refs.SnackBar;
	}
}
</script>
