<template>
	<v-layout row justify-center>
		<v-dialog v-model="dialog" max-width="600" persistent>
			<template v-slot:activator="{ on }">
			<v-btn
				v-on="on"
				fab
				right
				dark
				fixed
				bottom
				color="indigo"
				slot="activator"
				><v-icon>add
			</v-icon></v-btn>
			</template>
			<v-card>
				<v-toolbar color="indigo">
					<v-btn icon dark @click.native="dialog = false" v-shortkey="['esc']" @shortkey="dialog = false">
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title class="white--text">Informações da compra</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
				<v-list three-line subheader>
					<v-form v-model="valid" ref="formulario">
						<v-flex xs12 order-lg2>
						<v-container fluid>
							<v-select
								v-model="refr.select"
								:items="ativos"
								:rules="ativosRegras"
								item-value="ID"
								item-text="ATIVO"
								label="Ativo"
								required
							></v-select>
							<v-text-field
								v-model="refr.valor"
								label="Valor"
								:rules="ValorRegra"
								required
							></v-text-field>
							<v-text-field
								v-model="refr.quant"
								auto-grow
								:rules="QuantidadeRegra"
								label="Quantidade"
							></v-text-field>
							<v-layout justify-center id="btnLogin">
								<v-btn
									large
									:loading="loading"
									:disabled="loading"
									@click="enviar"
									color="indigo"
									:class="{ 'darken-4 white--text' : valid, disabled: !valid }"
								>Cadastrar</v-btn>
								</v-layout>
							</v-container>
						</v-flex>
					</v-form>
				</v-list>
			</v-card>
		</v-dialog>
	</v-layout>
</template>
<script>
export default {
	name: 'CadastroChamado',
	data () {
		return {
			loading: false,
			dialog: false,
			sound: true,
			valid: false,
			ativos: [],
			refr: {
				select: '',
				quant: '',
				valor: ''
			},
			ValorRegra:
			[
				(v) => !!v || 'Favor informar o valor'
			],
			QuantidadeRegra: [
				(v) => !!v || 'Favor informar a quantidade'
			],
			ativosRegras: [v => !!v ||	'Favor informar o ativo'],
			snackbar: {
				message: '',
				color: 'success',
				visible: false,
				timeout: 10000,
				x: null,
				y: 'top',
				multiLinhas: false
			}
		};
	},
	mounted () {
		this.getAtivos();
	},
	methods: {
		getAtivos () {
			const userData = JSON.parse(localStorage.userData);
			this.$http
				.get(this.CONFIG.API_URL + 'Carteira/getAtivos', {headers: { token: userData }})
				.then(response => {
					if (response.body.error) {
						this.loading = false;
						this.snackbar.color = 'red darken-4';
						this.snackbar.message = response.body.message;
						this.$root.$SnackBar.show(this.snackbar);
						return;
					}
					this.ativos = response.body.data;
					console.log(this.ativos);
				})
				.catch(() => {
				});
		},
		getCompras () {
			const userData = JSON.parse(localStorage.userData);
			this.$http
				.get(this.CONFIG.API_URL + 'Carteira/getCompras', {headers: { token: userData }})
				.then(response => {
					if (response.body.error) {
						this.loading = false;
						this.snackbar.color = 'red darken-4';
						this.snackbar.message = response.body.message;
						this.$root.$SnackBar.show(this.snackbar);
						return;
					}
					this.segmentos = response.body.data;
				})
				.catch(() => {});
		},
		
		enviar () {
			if (this.$refs.formulario.validate()) {
				const userData = JSON.parse(localStorage.userData);
				this.loading = true;
				this.$http
					.post(this.CONFIG.API_URL + 'Carteira/addCompra', this.refr, {
						headers: {token: userData}
					})
					.then(response => {
						if (response.body.error) {
							this.loading = false;
							this.snackbar.color = 'red darken-4';
							this.snackbar.message = response.body.message;
							this.$root.$SnackBar.show(this.snackbar);
							return;
						}
						this.loading = false;
						this.dialog = false;
					})
			}
		}
	}
};
</script>
