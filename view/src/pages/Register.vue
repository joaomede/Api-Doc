<template>
  <div class="centralDiv">
    <q-form>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">
            Register
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-model="newUser.name"
              filled
              type="Text"
              label="Your name"
              required
            />
            <q-input
              v-model="newUser.email"
              filled
              lazy-rules
              type="email"
              label="Your email"
              :rules="emailRules"
              required
            />
            <q-input
              v-model="newUser.password"
              filled
              type="Password"
              label="Password"
              lazy-rules
              :rules="passwordRules"
              required
            />
          </q-form>
        </q-card-section>

        <div class="justify-center row">
          <q-btn
            class="q-ma-xs"
            color="black"
            to="/login"
          >
            Back
          </q-btn>

          <q-btn
            class="q-ma-xs"
            color="green"
            @click="register()"
          >
            Register
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
    newUser: {
      name: '',
      email: '',
      password: ''
    },
    emailRules: [v => !!v || 'E-mail é requerido', v => /.+@.+/.test(v) || 'E-mail precisa ser válido'],
    passwordRules: [v => !!v || 'Senha é requerida', v => v.length >= 6 || 'Precisa ter mais de 6 dígitos']
  }),
  methods: {
    async register () {
      try {
        const result = await this.$axios.post('api/auth/register', this.newUser)
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
        this.$notify(`Bem vindo ${result.data.name}!`, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    }
  }
}
</script>

<style scoped>
</style>
