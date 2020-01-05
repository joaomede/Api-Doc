<template>
  <q-dialog
    v-model="dialogPopup"
    @hide="eventClose()"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Informe os dados da sua API
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.apiName"
            label="Informe um nome para a nova documentação"
            required
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.descriptionApi"
            label="Informe uma descrição"
            required
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.version"
            label="Informe a versão atual da api"
            required
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.email"
            label="Informe um e-mail para contato"
            required
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.license"
            label="Informe o tipo de licença ou link"
            required
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="form.isPublic"
            keep-color
            label="Ela é publica?"
            color="blue"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.baseURL"
            label="Informe o endereço a URL da API"
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
          @click="updateApi"
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
        apiName: '',
        descriptionApi: '',
        version: '',
        email: '',
        license: '',
        isPublic: false,
        baseURL: ''
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
      this.form = this.cApi
    },
    eventClose () {
      this.dialogPopup = false
      this.$emit('eventClose')
    },
    async updateApi () {
      try {
        const result = await this.$axios.put(`api/api/update/${this.form.id}`, this.form, { headers: this.user.headers })
        this.$notify(result.data.ok, 'green')
        this.eventClose()
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    reset () {
      this.form = {
        apiName: '',
        descriptionApi: '',
        version: '',
        email: '',
        license: '',
        isPublic: false,
        baseURL: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
