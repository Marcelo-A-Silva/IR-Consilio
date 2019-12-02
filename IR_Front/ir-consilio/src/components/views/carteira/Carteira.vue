<template>
	<v-container>
		<v-card>
			<v-container>
				<v-layout row >
					<v-flex md4>
						<div class="caption">Usuário</div>
						<!-- <div class="font-weight-black">{{data.COD}}</div> -->
					</v-flex>
					<v-flex md4>
						<div class="caption">Saldo</div>
						<!-- <div class="font-weight-black">{{data.ASSUNTO}}</div> -->
					</v-flex>
					<v-flex md4>
						<div class="caption">Devedor</div>
						<!-- <div class="font-weight-black">{{data.SEG_NOME}}</div> -->
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
		<v-container>
			<v-layout row>
				<v-btn @click="CadCompras()" color="indigo lighten-4">Movimentação de Compra
					<v-icon>add
					</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn @click="getMovimenta()" color="indigo lighten-4">Recarregar
					<v-icon>add
					</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn @click="abreVends()" color="indigo lighten-4">Movimentação de Venda
					<v-icon>add
					</v-icon>
				</v-btn>
			</v-layout>
		</v-container>
		<v-card>
			<v-data-table
				:headers="headers"
				:items="movim.items"
				:items-per-page="5"
				:loading="table.loading"
				:no-results-text="table.noResultText"
				:no-data-text="table.noDataText"
				:loading-text='table.LoadingText'
				class="elevation-1"
			></v-data-table>
		</v-card>
		<CadCompra
			v-if="CadCompra"
			:DialogSVisivel="CadCompra"
			v-on:setCadCompra="actionCadCompra"/>
		<CadVend
			v-if="CadVend"
			:DialogSVisivel="CadVend"
			v-on:setCadVend="actionCadVend"/>
	</v-container>
</template>

<script>
import CadVend from '@/components/miscelanea/modal/CadVend';
import CadCompra from '@/components/miscelanea/modal/CadCompra';
	export default {
		data () {
			return {
				carteira: [],
				CadCompra: false,
				CadVend: false, 
				movim: {
					items: []
				},
				snackbar: {
					message: '',
					color: 'success',
					visible: false,
					timeout: 10000,
					x: null,
					y: 'top',
					multiLinhas: false
				},

				table: {
					loading: false,
					noResultText: this.CONSTANTS.texts.table.noResultText,
					noDataText: this.CONSTANTS.texts.table.noDataText,
					LoadingText: this.CONSTANTS.texts.table.loadingText,
				},

				headers: [
					{	text: 'Ativo', align: 'left', value: 'ATIVO',},
					{ text: 'Data compra', value: 'DTCP' },
					{ text: 'Valor compra', value: 'VALOR_COM' },
					{ text: 'Quantidade', value: 'QUANTIDADE' },
					{ text: 'Valor total', value: 'TOT' },
					{ text: 'Data venda', value: 'DTVE' },
					{ text: 'Valor venda', value: 'VALOR_VEN' },
					{ text: 'Valor venda total', value: 'VENTOT' },
					{ text: 'Saldo', value: 'SALDO' },
					{ text: 'Imposto', value: 'IMP' }
				],
			}
		},
		mounted () {
			// this.getData();
			this.getMovimenta();
		},
		methods: {
			CadCompras () {
				this.CadCompra = true;
			},
			abreVends () {
				this.CadVend = true;
			},
			actionCadCompra (value) {
				this.CadCompra = value
				if (value === false) {
					this.getMovimenta();
				}
			},
			actionCadVend (value) {
				this.CadVend = value
				if (value === false) {
					this.getMovimenta();
				}
			},
			getMovimenta () {
				const userData = JSON.parse(localStorage.userData);
				this.$http
					.get(this.CONFIG.API_URL + 'Carteira/getMovimenta', {headers: { token: userData }})
					.then((response) => {
						console.log(response);
						if (response.body.error) {
							this.loading = false;
							this.snackbar = true;
							this.snackbar.color = 'red darken-4';
							this.snackbar.text = response.body.message;
							return;
						};
						this.movim.items = response.body.data;
					});
			}
		},
		components: {
			'CadVend': CadVend,
			'CadCompra': CadCompra
		}	
	}
</script>

<style scoped>

</style>
