<template>
  <div class="q-pa-md">
    <q-form>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">
            Alterar senha
          </div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-model="senha1"
              type="password"
              :rules="senhaRules"
              label="Senha"
              required
              filled
              lazy-rules
            />
            <q-input
              v-model="senha2"
              type="password"
              :rules="senhaRules"
              label="Repita a senha"
              required
              filled
              lazy-rules
            />
          </q-form>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click.stop="dialogoTrocaSenha = true"
          >
            Alterar Senha
          </q-btn>
        </q-card-section>
      </q-card>
    </q-form>

    <q-dialog v-model="dialogoTrocaSenha">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Desenha realmente alterar a senha?
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click="TrocarSenha"
          >
            Trocar Senha
          </q-btn>
        </q-card-section>

        <q-card-section>
          <q-btn
            color="primary"
            @click.stop="dialogoTrocaSenha = false"
          >
            Cancelar
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    dialogoTrocaSenha: false,
    senha1: '',
    senha2: '',
    senhaRules: [v => !!v || 'Senha é requerida', v => v.length >= 6 || 'Precisa ter mais de 6 dígitos']
  }),
  computed: {},
  methods: {
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
