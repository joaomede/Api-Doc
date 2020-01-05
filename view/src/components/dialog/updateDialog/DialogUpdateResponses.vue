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
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.reason"
            label="Informe o motivo do retorno"
            required
            dense
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
            dense
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
          @click="updateResponse"
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
      this.form = this.cResponse
    },
    eventClose () {
      this.dialogPopup = false
      this.$emit('eventClose')
      this.reset()
    },
    async updateResponse () {
      try {
        const result = await this.$axios.put(`api/responses/update/${this.form.id}`, this.form, { headers: this.user.headers })
        this.$store.dispatch('setUpdateResponse', this.form)
        this.$notify(result.data.ok, 'green')
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
