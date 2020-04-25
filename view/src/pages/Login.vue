<template>
  <div class="centralDiv">
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
              @keypress.enter="login()"
            />
            <q-input
              v-model="senha"
              filled
              type="Password"
              label="Senha"
              lazy-rules
              required
              :rules="senhaRules"
              @keypress.enter="login()"
            />
          </q-form>
        </q-card-section>

        <div class="justify-center">
          <q-btn
            class="q-ma-xs"
            color="primary"
            to="/register"
          >
            Register
          </q-btn>
          <q-btn
            class="q-ma-xs"
            color="green"
            @click="login"
          >
            Entrar
          </q-btn>
        </div>
      </q-card>
    </q-form>
  </div>
</template>

<script>
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
  methods: {
    async login () {
      try {
        const result = await this.$axios.post('api/auth/login', { email: this.email, password: this.senha })
        const { id, email, name, token } = await result.data
        const user = {
          id: id,
          name: name,
          email: email,
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
        this.$q.localStorage.set('user', user)
        this.$store.dispatch('boot')
        this.$router.replace('dash')
        this.$notify(`Bem vindo de volta ${result.data.name}!`, 'green')
      } catch (error) {
        this.$notify('Erro ao tentar efetuar o login', 'red')
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
