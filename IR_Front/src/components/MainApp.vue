<template>
	<v-app id="inspire">
		<v-content>
			<Nav ref="Nav"></Nav>
				<SnackBar ref="SnackBar"></SnackBar>
			<router-view/>
		</v-content>
			<v-container>
				<v-footer class="pa-3 justify-center">
					<div>{{"2019 - "}}{{ new Date().getFullYear() }}{{"  "}} &copy;{{"IR Consilio"}}</div>
				</v-footer>
			</v-container>
    </v-app>
</template>
<script>
import Nav from '@/components/views/navigation/Navigation';
import SnackBar from '@/components/miscelanea/SnackBar';
export default {
	name: 'Main',
	components: {
		'Nav': Nav,
		'SnackBar':	SnackBar
	},
	mounted () {
		this.$root.$SnackBar = this.$refs.SnackBar;
	}
};
</script>
