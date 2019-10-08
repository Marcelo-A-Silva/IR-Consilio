<template>
	<div>
		<Drawer :items="items"  v-model="drawer"></Drawer>
		<v-app-bar dense dark fixed clipped-left color="indigo darken-2"  app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-btn text to='/dashboard'>{{user}}</v-btn>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-menu :close-on-content-click="false" :nudge-width="200" offset-x bottom left>
					<template v-slot:activator="{ on }">
						<v-btn   text color="white" v-on="on">
							<v-badge>
     						<template  v-slot:badge>{{notifications.totalItems}}</template>
								<v-icon>notification_important</v-icon>
   						</v-badge>
						</v-btn>
					</template>
					<v-card ripple>
						<v-list>
							<v-list-item>
								<v-list-item-content>
									<v-subheader><h2>Notificações</h2></v-subheader>
								</v-list-item-content>
							</v-list-item>
						</v-list>
						<v-divider></v-divider>
						<v-list   style="min-height: 210px; max-height: 800px;  min-width:100px;"   class="scroll-y">
							<v-list-item-group v-model="item" color="primary">
								<v-list-item v-for="(notification, index) in notifications.items"  :key="`${index}-${notification.ID}`">
									<v-list-item-icon>
  					  			<v-icon  v-if="notification.TIPO === 'Aviso' && notification.LIDO === 'N'" color="red">warning</v-icon>
  					  			<v-icon  v-else-if="notification.TIPO === 'Alerta' && notification.LIDO === 'N'" color="red">warning</v-icon>
  					  			<v-icon  v-else-if="notification.TIPO === 'Alerta' && notification.LIDO === 'N'" color="red">warning</v-icon>
  					  		</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title :class="(notification.LIDO === 'N' ? 'font-bold' : '')" class="text--primary" @click="readNotification(notification.ID)">{{ notification.DESCRICAO }}</v-list-item-title>
									</v-list-item-content>
									<v-divider v-if="index + 1 < notification.length" :key="index" />
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-menu>
				<v-btn v-if="permissao == '4' && tecnico  == 'S'"  text color="white" @click="RegiterTechnical()">Técnicos</v-btn>
				<v-btn  text color="white" @click="logoff()">Sair</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		<Register
			v-if="dialogVisible"
			:dialogVisible="dialogVisible"
			v-on:setDialogVisible="actionDialogVisible"/>
	</div>
</template>
<script>
import Register from '@/components/miscelanea/alerts/technicalRegister';
import Drawer from './Drawer';
export default {
	name: 'Navigation',
	data: () => ({
		drawer: true,
		user: JSON.parse(localStorage.nomeData),
		permissao: JSON.parse(localStorage.userPermissao),
		tecnico: JSON.parse(localStorage.tecnicoData),
		dialogVisible: false,
		item: null,
		notifications: {
			items: [],
			totalItems: []
		},

		source: '',
		items: [
			{	icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
			{	icon: 'comment', text: 'Carteira', route: '/carteira' + (JSON.parse(localStorage.tecnicoData) === 'S' ? '-tecnico' : '') },
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
	mounted () {
		this.getData();
	},
	methods: {
		actionChangeDrawer (payload) {
			this.drawer = payload;
		},
		logoff () {
			this.$router.push({path: '/logoff'})
		},
		actionDialogVisible (value) {
			this.dialogVisible = value
		},
		RegiterTechnical () {
			this.dialogVisible = true;
		},
		getData () {
			const userData = JSON.parse(localStorage.userData);
			this.$http
				.get(this.CONFIG.API_URL + 'Notifications', {headers: {'token': userData}})
				.then((response) => {
					if (response.body.error) {
						this.snackbar.color = 'red darken-4';
						this.snackbar.message = response.body.message;
						this.$root.$SnackBar.show(this.snackbar);
						return;
					}
					this.notifications.items = response.body.data;
					this.notifications.totalItems = response.body.total_records;
				})
				.catch(() => {
					this.snackbar.color = 'red darken-4';
					this.snackbar.message = this.CONSTANTS.texts.errors.connection;
					this.$root.$SnackBar.show(this.snackbar);
				});
		}
	},
	components: {
		'Drawer': Drawer,
		'Register': Register
	}
}
</script>
<style  scoped>
.font-bold {
	font-weight: bold
}
</style>
