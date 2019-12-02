<template>
	<div>
		<Drawer :items="items"  v-model="drawer"></Drawer>
		<v-app-bar dense dark fixed clipped-left color="indigo darken-2"  app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-btn text to='/dashboard'>{{user}}</v-btn>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn  text color="white" @click="logoff()">Sair</v-btn>
			</v-toolbar-items>
		</v-app-bar>
	</div>
</template>
<script>
import Drawer from './Drawer';
export default {
	name: 'Navigation',
	data: () => ({
		drawer: true,
		user: JSON.parse(localStorage.nomeData),
		dialogVisible: false,
		item: null,
		notifications: {
			items: [],
			totalItems: []
		},

		source: '',
		items: [
			{	icon: 'comment', text: 'Carteira', route: '/carteira' },
			{	icon: 'assessment', text: 'Relatórios' },
			{ icon: 'drafts', text: 'Estoque'}
		],
		snackbar: {
			message: '',
			color: 'success',
			visible: false,
			timeout: 10000,
			x: null,
			y: 'top',
			multiLinhas: false
		}
	}),
	methods: {
		actionChangeDrawer (payload) {
			this.drawer = payload;
		},
		logoff () {
			this.$router.push({path: '/logoff'})
		},
		actionDialogVisible (value) {
			this.dialogVisible = value
		}
	},
	components: {
		'Drawer': Drawer
	}
}
</script>
<style  scoped>
.font-bold {
	font-weight: bold
}
</style>
