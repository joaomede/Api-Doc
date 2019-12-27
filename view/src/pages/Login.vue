<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-form>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">
            Login
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-model="email"
              filled
              lazy-rules
              :rules="emailRules"
              type="Email"
              label="E-mail"
              required
            />
            <q-input
              v-model="senha"
              filled
              type="Password"
              label="Senha"
              lazy-rules
              required
              :rules="senhaRules"
            />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click="login"
          >
            Entrar
          </q-btn>
        </q-card-section>
      </q-card>
    </q-form>

    <!-- caixa de diálogo adiciona pasta -->
    <q-dialog
      v-model="dialogoEsqueciSenha"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Recupere seu acesso
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-model="emailRecuperacao"
              label="Informe seu email de recuperação"
              required
            />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click="RecuperaAcesso"
          >
            Recuperar Acesso
          </q-btn>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click.stop="dialogoEsqueciSenha = false"
          >
            Voltar
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data: () => ({
    valid: false,
    dialogoEsqueciSenha: false,
    email: '',
    senha: '',
    emailRecuperacao: '',
    emailRules: [v => !!v || 'E-mail é requerido', v => /.+@.+/.test(v) || 'E-mail precisa ser válido'],
    senhaRules: [v => !!v || 'Senha é requerida', v => v.length >= 6 || 'Precisa ter mais de 6 dígitos']
  }),
  created () {
    this.verificaEstaLogado()
  },
  methods: {
    Notificacao (Mensagem, Cor) {
      this.$q.notify({
        message: Mensagem,
        color: Cor
      })
    },
    login () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.senha)
        .then(data => {
          // this.gravaUltimoAcesso();
        })
        .catch(e => {
          this.Notificacao('Problemas na autenticação, verifique o e-mail e senha', 'red')
        })
    },
    RecuperaAcesso () {
      firebase
        .auth()
        .sendPasswordResetEmail(this.emailRecuperacao)
        .then(() => {
          this.Notificacao('Email de recuperação enviado com sucesso', 'green')
        })
      this.dialogoEsqueciSenha = false
    },
    verificaEstaLogado () {
      if (this.$store.getters.getUser != null) {
        this.$router.replace('inicial')
      }
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
form > * {
  display: block;
}
</style>
