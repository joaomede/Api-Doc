<template>
  <div class="centralDiv">
    <div class="text-h6 text-center">
      Adicione o link do Servidor Remoto
    </div>
    <q-input
      v-model="urlField"
      class="text-white center-text q-ma-xs"
      square
      dense
      style="width: 100%; max-width: 500px"
      label="Endereço do servidor remoto .: https://url.com.br:8080/"
      outlined
    />
    <q-btn
      color="green"
      class="q-ma-xs"
      @click.stop="addApiURL()"
    >
      Adicionar
    </q-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      urlField: ''
    }
  },
  methods: {
    addApiURL () {
      this.$q.cookies.set('urlAPI', this.urlField)
      this.$router.push('login')
      this.$store.dispatch('setUrlApi')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
