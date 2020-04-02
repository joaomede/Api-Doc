<template>
  <div class="centralDiv">
    <q-form>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">
            Change Password
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-model="userLogged.passwordOne"
              filled
              lazy-rules
              :rules="passwordRules"
              type="Password"
              label="New Password"
              required
            />
            <q-input
              v-model="userLogged.passwordTwo"
              filled
              type="Password"
              label="Repeat a new Password"
              lazy-rules
              required
              :rules="passwordRules"
            />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn
            class="q-ma-xs"
            color="black"
            to="/dash"
          >
            Home
          </q-btn>
          <q-btn
            class="q-ma-xs"
            color="green"
            @click="changePassword"
          >
            Change
          </q-btn>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    valid: false,
    userLogged: {
      passwordOne: '',
      passwordTwo: ''
    },
    passwordRules: [v => !!v || 'Senha é requerida', v => v.length >= 6 || 'Precisa ter mais de 6 dígitos']
  }),
  methods: {
    async changePassword () {
      try {
        const result = await this.$axios.put('api/auth/changepassword', { passwordOne: this.userLogged.passwordOne, passwordTwo: this.userLogged.passwordTwo }, { headers: this.cUser.headers })
        this.$notify(result.data.ok, 'green')
        this.resetForm()
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    resetForm () {
      this.userLogged = {
        passwordOne: '',
        passwordTwo: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
