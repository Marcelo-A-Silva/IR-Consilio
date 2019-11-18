<template>
	<div>
		<v-layout row align-center justify-center class="margin-t50 margin-b50">
			<v-flex xs12 sm4 class="text-center"></v-flex>
		</v-layout>
		<v-container fluid fill-height>
			<v-layout flex align-center justify-center>
				<v-flex xs12 sm4 elevation-3>
					<v-toolbar color="indigo" class="pt-1">
						<v-toolbar-title class="white--text">
							<h3>IR Consilio</h3>
						</v-toolbar-title>
					</v-toolbar>
					<v-card hover>
						<v-card-text class="pt-4">
							<v-form v-model="valid" ref="formulario">
								<v-text-field
									v-model="user.nome"
									:rules="NomeRegra"
									label="Digite seu nome"
									prepend-icon="person"
									type="text"
									@keydown.enter="submit"
									required
								></v-text-field>
								<v-text-field
									v-model="user.senha"
									:rules="SenhaRegra"
									autocomplete="off"
									:append-icon="!e1 ? 'visibility' : 'visibility_off'" @click:append="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"
									label="Digite sua senha"
									prepend-icon="lock"
									@keydown.enter="submit"
									required
								></v-text-field>
								<v-layout justify-center id="btnLogin">
									<v-btn
										large
										:loading="loading"
										:disabled="loading"
										@click="submit"
										color="indigo"
										:class="{ 'darken-4 white--text' : valid, disabled: !valid }"
										id="texto"
									>Entrar</v-btn>
								</v-layout>
							</v-form>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
export default {
	name: 'login',
	data: () => ({
		valid: false,
		e1: true,
		user: {
			nome: '',
			senha: ''
		},
		loading: false,
		NomeRegra: [d => !!d || 'Nome é obrigatório'],
		SenhaRegra: [v => !!v || 'Senha é obrigatória'],
		snackbar: {
			message: '',
			visible: false,
			color: 'success',
			timeout: 10000,
			x: null,
			y: 'top',
			multiLinhas: false
		}
	}),

	methods: {
		submit () {
			if (this.$refs.formulario.validate()) {
				this.loading = true;
				this.$http
					.post(this.CONFIG.API_URL + 'login', this.user)
					.then((response) => {
						if (response.body.error) {
							this.loading = false;
							this.snackbar.color = 'red darken-4';
							this.snackbar.message = response.body.message;
							this.$root.$SnackBar.show(this.snackbar);
							return;
						}
						localStorage.userData = JSON.stringify(response.body.data);
						localStorage.nomeData = JSON.stringify(response.body.nome);
						this.loading = false;
						this.$router.push({path: '/dashboard'});
					})
					.catch(() => {
						this.loading = false;
						this.snackbar.color = 'error';
						this.snackbar.message = this.CONSTANTS.texts.errors.connection;
						this.$root.$SnackBar.show(this.snackbar);
					})
			}
		}
	}
};
</script>
<style>
.margin-t50 {
	margin-top: 130px;
}
.margin-b50 {
	margin-bottom: 50px;
}
#btnLogin {
	margin-top: 20px;
}
#texto {
	color: white;
}
</style>
