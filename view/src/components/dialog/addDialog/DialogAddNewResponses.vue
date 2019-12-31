<template>
  <q-dialog
    v-model="dialogPopup"
    @hide="eventClose()"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Informe os dados do código de resposta
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.typeCode"
            label="Informe o tipo de código"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.reason"
            label="Informe o motivo do retorno"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <JsonEditor
          v-model="form.responseModel"
          :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
          }"
          :obj-data="form.responseModel"
        />
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.headers"
            label="Informe o cabeçalho"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section align="center">
        <q-btn
          class="q-ma-xs"
          color="black"
          @click.stop="eventClose()"
        >
          Voltar
        </q-btn>
        <q-btn
          class="q-ma-xs"
          color="green"
          @click="storeNewResponse"
        >
          Sim
        </q-btn>
      </q-card-section>

      <q-card-section />
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  data () {
    return {
      form: {
        typeCode: '',
        reason: '',
        responseModel: {},
        headers: ''
      },
      dialogPopup: this.dialog
    }
  },
  watch: {
    dialog: 'update'
  },
  methods: {
    update () {
      this.dialogPopup = this.dialog
    },
    eventClose () {
      this.dialogPopup = false
      this.$emit('eventClose')
      this.reset()
    },
    async storeNewResponse () {
      try {
        const result = await this.$axios.post(`api/responses/create/${this.cPath.id}`, this.form, { headers: this.user.headers })
        this.$store.dispatch('setNewResponse', result.data)
        this.$notify('Novo verbo criado com sucesso', 'green')
        this.eventClose()
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    reset () {
      this.form = {
        typeCode: '',
        reason: '',
        responseModel: {},
        headers: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
