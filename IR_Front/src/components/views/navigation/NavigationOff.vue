<template>
	<div>
		<v-app-bar dense fixed color="indigo darken-2" app>
			<v-btn text class='white--text' id='btnHelp'  to="/Login">IR Consilio</v-btn>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<SignUp ref="SignUp"/>
			</v-toolbar-items>
		</v-app-bar>
	</div>
</template>
<script>
import SignUp from '@/components/miscelanea/modal/SignUp';
import SnackBar from '@/components/miscelanea/SnackBar';
export default {
	name: 'Navbar',
	components: {
		SignUp: SignUp,
		SnackBar: SnackBar
	}
};
</script>

<style scoped>
	#btnHelp{
		font-size: 20px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
