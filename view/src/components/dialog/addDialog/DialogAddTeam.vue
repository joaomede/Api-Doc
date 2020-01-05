<template>
  <q-dialog
    v-model="dialogPopup"
    @hide="eventClose()"
    @show="listAllPrivateAPI()"
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
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="form.apiIdFk"
          filled
          :options="listApis"
          label="Lista de Api Privadas"
        />
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
      dialogPopup: this.dialog,

      listApis: []
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
      this.form.apiIdFk = this.form.apiIdFk.value
      this.$emit('save', this.form)
    },
    async listAllPrivateAPI () {
      try {
        const result = await this.$axios.get(`api/api/getallprivate`, { headers: this.user.headers })
        this.listApis = []
        result.data.forEach(element => {
          this.listApis.push({
            label: element.apiName,
            value: element.id
          })
        })
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
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
