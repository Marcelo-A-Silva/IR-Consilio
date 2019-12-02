<template>
  <div class>
    <v-dialog persistent  v-model="dialog" width="700">
			<SnackBar ref="SnackBar"></SnackBar>
			<v-toolbar color="indigo" class="white--text">
					<v-btn icon class="white--text" @click="dialog = false"  v-shortkey="['esc']" @shortkey="dialog = false">
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title>Cadastro</v-toolbar-title>
				</v-toolbar>

      <template v-slot:activator="{ on }">
        <v-btn color="indigo" id="BtnCadastro" class="white--text" v-on="on">Cadastro</v-btn>
      </template>
      <v-card>
        <v-card-text class="pt-4">
          <v-form v-model="valid" ref="formulario">
            <v-text-field
							v-model="user.nome"
							:rules="NomeRegra"
							label="Digite seu nome"
							required>
            </v-text-field>
            <v-text-field
              v-model="user.sobrenome"
              :rules="CPFRegra"
              label="Digite seu CPF"
              required
            ></v-text-field>
						<v-text-field
							v-model="user.email"
              label="Digite seu e-mail"
							:rules="EmailRegra"
							@keydown.enter="submit"
              required>
            ></v-text-field>
						<v-select
							v-model='user.sexo'
							:items="items"
							label="Sexo"
						></v-select>
            <v-text-field
              label="Digite seu usuário"
              v-model="user.usuario"
              :rules="RegraUsuario"
															@keydown.enter="submit"
              required
            ></v-text-field>
   					<v-text-field
							label="Informe a senha"
							v-model="user.senha"
							:append-icon="!e1 ? 'visibility' : 'visibility_off'" @click:append="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'"
							:rules="RegraSenha"
							@keydown.enter="submit"
							required
						></v-text-field>
						<v-text-field
        			label="Confirme a sua senha"
							:error-messages='verificaSenha()'
       v-model="user.senhaConfirma"
							ref="senhaConfirma"
      :append-icon="!q1 ? 'visibility' : 'visibility_off'" @click:append="() => (q1 = !q1)" :type="q1 ? 'password' : 'text'"
							@keydown.enter="submit"
      required
    ></v-text-field>
							<v-text-field
						v-model="user.telefone"
						return-masked-value
						mask="(##) # ####-####"
							@keydown.enter="submit"
              label="Digite seu telefone"
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
          </v-form>
					<SnackBar ref="SnackBar"></SnackBar>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SnackBar from '@/components/miscelanea/SnackBar';
export default {
	name: 'cadastro',
	components: {
		'SnackBar': SnackBar
	},
	data () {
		return {
			items: ['M', 'F'],
			valid: false,
			dialog: false,
			loading:	false,
			e1: true,
			q1: true,
			cadError: false,
			user: {
				nome: '',
				sobrenome: '',
				usuario: '',
				senha: '',
				senhaConfirma: '',
				email: '',
				telefone: '',
				sexo: ''
			},
			NomeRegra: [v => !!v || 'Nome é obrigatório'],
			RegraUsuario: [v => !!v || 'Usuário é obrigatório'],
			CPFRegra:
			[
				(v) => !!v || 'Favor informar o cpf',
				(v) => (v && v.length == 11) || 'CPF incorreto'
			],
			RegraSenha: [v => !!v || 'Senha é obrigatória'],
			EmailRegra: [
				(v) => !!v || 'E-mail é obrigatório',
				(v) => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					return pattern.test(v) || 'E-mail inválido.'
				}
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
		}
	},
	methods: {
		verificaSenha () {
			if (this.user.senhaConfirma !== '' && this.user.senha !== this.user.senhaConfirma) {
				this.cadError = true;
				this.$refs.senhaConfirma.focus();
				return (this.user.senha === this.user.senhaConfirma) ? '' : 'Senhas devem ser iguais';
			}
			this.cadError = false;
		},
		enviar () {
			if (this.$refs.formulario.validate() && !this.cadError) {
				this.loading = true;
				this.$http
					.post(this.CONFIG.API_URL + 'cadastro', this.user)
					.then((response) => {
						if (response.body.error) {
							this.loading = false;
							this.snackbar.color = 'red darken-4';
							this.snackbar.message = response.body.message;
							this.$root.$SnackBar.show(this.snackbar);
							return;
						}
						this.loading = false;
						this.dialog = false;
						this.snackbar.color = 'light-green darken-2';
						this.snackbar.message = response.body.message;
						this.$root.$SnackBar.show(this.snackbar);
						this.$refs.formulario.reset()
						this.$router.push({path: '/login'});
					})
					.catch(() => {
						this.loading = false;
						this.snackbar.color = 'error';
						this.snackbar.message = this.CONSTANTS.texts.errors.connection;
						this.$root.$SnackBar.show(this.snackbar);
					})
			}
		},
		mounted () {
			this.$root.$SnackBar = this.$refs.SnackBar;
		}
	}
}
</script>
<style>
#text {
  color: #eceff1;
		font-size: 25px;
}
#BtnCadastro {
  height: 25px;
  top: 12px;
		left: 5px;
}
</style>
