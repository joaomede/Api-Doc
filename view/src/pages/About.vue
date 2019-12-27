<template>
  <div class="centralDiv q-pa-xs text-center">
    <q-card
      class="text-center my-card"
      align-center
    >
      <q-img
        src="../statics/symbol2logo.png"
        style="height: 140px; max-width: 150px"
      />
      <div class="centralDiv">
        <q-card-section>
          <div class="text-h5 text-bold">
            Sistema desenvolvido pela Symbol 2 Studio - João Medeiros (2019 - {{ versaoAtual }})
          </div>
          <div class="text-h6">
            Contatos: (11) 96849-8492
          </div>
          <div class="text-h6">
            E-mail: symbol2studio@gmail.com
          </div>
        </q-card-section>
      </div>
      <q-card-section class="q-gutter-md">
        <q-btn
          color="green"
          to="/dash"
        >
          Volta para Página Inicial
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
