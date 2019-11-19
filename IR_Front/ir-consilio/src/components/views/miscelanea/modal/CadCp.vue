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
					<v-toolbar-title class="white--text">Informe os dados da compra.</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
				<v-list three-line subheader>
					<v-form v-model="valid" ref="formulario" enctype="multipart/form-data">
						<v-flex xs12 order-lg2>
							<v-container fluid>
									<v-autocomplete
									color="indigo"
									v-model="refr.atSelec"
									:items="usuarios"
									label="Ativo"
									:rules="AtVal"
								></v-autocomplete>
								<v-text-field
									v-model="refr.requisicao"
									:rules="ValComp"
									label="Informe o valor unitario do Ativo na compra em R$"
									required
								></v-text-field>
								<v-text-field
									v-model="refr.descricao"
									:rules="DescricaoRegra"
									label="Quantidade"
                  required
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
	props: {
		visible: {type: Boolean, default: false}
	},
	data: () => ({
		sound: true,
		valid: false,
		dialog: false,
		loading: false,
		proper: JSON.parse(localStorage.userC),
		itemsPrioridade: ['Baixa', 'Media', 'Alta'],
		avatar: null,
		ativos: [],
		chamados: {
			items: []
		},
		refr: {
			pessoaSelect: '',
			select: '',
			requisicao: '',
			descricao: '',
			descricaoEquip: '',
			prioridade: ''
		},

		AtVal:
			[
				(v) => !!v || 'Favor informar o solicitante da requisição'
			],
		ValComp:
			[
				(v) => !!v || 'Favor informar a requisição',
			],
		DescricaoRegra: [
			(v) => !!v || 'Favor informar a descrição da requisição',
			(v) => (v && v.length >= 5) || 'Favor informar mais detalhes sobre  a requisição'
		],
		SegmentosRegras: [v => !!v 				||	'Favor informar o segmento da requisição'],
		EquipamentoRegra:	[v => !!v 			|| 'Favor informar o equipamento'],
		PrioridadeRegra: [v => !!v 				|| 'Favor informar a prioridade da requisição'],

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
		this.getAtivos();
	},
	methods: {
		getAtivos () {
			const userData = JSON.parse(localStorage.userData);
			this.$http
				.get(this.CONFIG.API_URL + 'Chamados/getAtivos', {headers: {'token': userData}})
				.then((response) => {
					if (response.body.error) {
						this.loading = false;
						this.snackbar = true;
						this.snack.color = 'red darken-4';
						this.snack.text = response.body.message;
						return;
					};
					this.ativos = response.body.data;
				})
				.catch(() => {
					this.snackbar = true;
					this.snack.color = 'red darken-4';
					this.snack.text = this.CONSTANTS.texts.errors.connection;
				});
		},
		enviar () {
			if (this.$refs.formulario.validate()) {
				this.verificaEquipamento();
				const files = this.avatar;
				const userData = JSON.parse(localStorage.userData);
				this.loading = true;
				this.$http
					.post(this.CONFIG.API_URL + 'Chamados/createCp', this.refr, {headers: { token: userData }})
					.then(response => {
						if (response.body.error) {
							this.loading = false;
							this.snackbar.color = 'red darken-4';
							this.snackbar.message = response.body.message;
							this.$root.$SnackBar.show(this.snackbar);
							return;
						}
					}
					);
			};
		}
	}
}
</script>
