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
							<v-text-field
								v-model="refr.requisicao"
								label="Informe o assunto da requisição"
								:rules="RequisicaoRegra"
								required
							></v-text-field>
							<v-textarea
								v-model="refr.descricao"
								auto-grow
								:rules="DescricaoRegra"
								label="Informe uma descrição do chamado"
								rows="3"
								row-height="30"
							></v-textarea>
							<v-select
								v-model="refr.select"
								:items="segmentos"
								:rules="SegmentosRegras"
								item-value="ID"
								item-text="NOME"
								label="Informe um segmento para o chamado"
							></v-select>
							<v-text-field
								v-if="refr.select.NOME  === 'Hardware'"
								v-model="refr.descricaoEquip"
								:rules="EquipamentoRegra"
								label="Informe o equipamento"
								required
							></v-text-field>
							<v-select
								v-model="refr.prioridade"
								:items="itemsPrioridade"
								:rules="PrioridadeRegra"
								label="Informe a sua prioridade"
								required
							></v-select>
      <v-chip
        v-if="index < 2"
        color="indigo accent-2"
        dark
        label
        small
      >
        {{text}}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ refr.files.length - 2 }} arquivos
      </span>
    </template>
  </v-file-input>
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
			segmentos: [],
			itemsPrioridade: ['Baixa', 'Media', 'Alta'],
			refr: {
				select: '',
				requisicao: '',
				descricao: '',
				descricaoEquip: '',
				prioridade: '',
				files: []
			},
			RequisicaoRegra:
			[
				(v) => !!v || 'Favor informar a requisição',
				(v) => v.length >= 3 || 'A requisição necessita de mais detalhes'
			],
			DescricaoRegra: [
				(v) => !!v || 'Favor informar a descrição da requisição',
				(v) => v.length >= 5 || 'A requisição necessita de mais detalhes'
			],
			SegmentosRegras: [v => !!v ||	'Favor informar o segmento da requisição'],
			EquipamentoRegra:	[v => !!v || 'Favor informar o equipamento'],
			PrioridadeRegra: [v => !!v || 'Favor informar a prioridade da requisição'],
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
		this.getSegmentos();
	},
	methods: {
		verificaEquipamento () {
			if (this.refr.select.NOME !== 'Hardware') {
				this.refr.descricaoEquip = '';
			}
		},
		limparCampos () {
			this.refr.requisicao = '';
			this.refr.descricao = '';
			this.refr.prioridade = '';
		},
		getSegmentos () {
			const userData = JSON.parse(localStorage.userData);
			this.$http
				.get(this.CONFIG.API_URL + 'Chamados/getAllSegmentos', {
					headers: { token: userData }
				})
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
				this.verificaEquipamento();
				const userData = JSON.parse(localStorage.userData);
				this.loading = true;
				this.$http
					.post(this.CONFIG.API_URL + 'Chamados/createReq', this.refr, {
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
						this.limparCampos();
					})
			}
		}
	}
};
</script>
