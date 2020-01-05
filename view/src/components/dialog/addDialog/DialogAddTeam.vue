<template>
  <q-dialog
    v-model="dialogPopup"
    @hide="eventClose()"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Informe os dados de sua equipe
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.teamName"
            label="Informe um nome para a equipe"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.apiIdFk"
            label="Informe a id da Documentação"
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
          @click="save"
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
        apiIdFk: '',
        teamName: ''
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
    save () {
      this.$emit('save', this.form)
    },
    reset () {
      this.form = {
        apiIdFk: '',
        teamName: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
