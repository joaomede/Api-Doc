<template>
  <q-dialog
    v-model="dialogPopup"
    @hide="eventClose()"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Informe os dados desse tipo de requisição
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.verbType"
            label="Informe o tipo de verbo, ex.: POST"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.descriptionVerb"
            label="Informe a descrição"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.path"
            label="Informe o endereço do path, ex.: api/login"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-btn @click="addParameter">
          Adicionar Parametro
        </q-btn>
        <q-btn @click="removeParameter">
          Remover
        </q-btn>
      </q-card-section>

      <q-card-section v-if="form.parameter.params.length > 0">
        <q-form
          v-for="(params, index) in form.parameter.params"
          :key="index"
        >
          <q-item>
            <q-item-section>
              <q-input
                v-model="params.parameterName"
                label="Nome, ex.: userId"
                required
              />
            </q-item-section>
            <q-item-section>
              <q-input
                v-model="params.parameterValue"
                label="Valor, ex.: 1"
                required
              />
            </q-item-section>
          </q-item>
        </q-form>
      </q-card-section>

      <q-card-section>
        <div class="text-p">
          Informe valores para o headers da requisição
        </div>
        <JsonEditor
          v-model="form.headersValue"
          :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
          }"
          :obj-data="form.headersValue"
        />
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="form.body"
            label="Essa requisitação um corpo?"
          />
        </div>
      </q-card-section>

      <q-card-section v-if="form.body === true">
        <div class="text-p">
          Informe os valores para o corpo da requisição
        </div>
        <JsonEditor
          v-model="form.bodyValue"
          :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
          }"
          :obj-data="form.bodyValue"
        />
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="form.data"
            label="Essa requisitação envia data?"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn @click="addData">
          Adicionar Data
        </q-btn>
        <q-btn @click="removeData">
          Remover Data
        </q-btn>
      </q-card-section>

      <q-card-section v-if="form.data.data.length > 0">
        <q-form
          v-for="(data, index) in form.data.data"
          :key="index"
        >
          <q-item>
            <q-item-section>
              <q-input
                v-model="data.dataType"
                label="Tipo de data, ex.: audio/mp3"
                required
              />
            </q-item-section>
          </q-item>
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
          @click="updatePath"
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
        verbType: '',
        path: '',
        descriptionVerb: '',
        parameter: {
          params: []
        },
        headersValue: {},
        body: false,
        bodyValue: {},
        data: {
          data: []
        }
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
      this.form = this.cPath
    },
    eventClose () {
      this.dialogPopup = false
      this.$emit('eventClose')
      this.reset()
    },
    addParameter () {
      this.form.parameter.params.push({
        parameterName: '',
        parameterValue: ''
      })
    },
    removeParameter () {
      this.form.parameter.params.pop()
    },
    addData () {
      this.form.data.data.push({
        dataType: '',
        dataValue: ''
      })
    },
    removeData () {
      this.form.data.data.pop()
    },
    save () {
      this.$emit('save', this.form)
    },
    async updatePath () {
      try {
        const result = await this.$axios.put(`api/paths/update/${this.form.id}`, this.form, { headers: this.user.headers })
        this.$store.dispatch('setUpdatePath', this.form)
        this.$notify(result.data.ok, 'green')
        this.eventClose()
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    reset () {
      this.form = {
        verbType: '',
        path: '',
        descriptionVerb: '',
        parameter: {
          params: []
        },
        headersValue: {},
        body: false,
        bodyValue: {},
        data: {
          data: []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
