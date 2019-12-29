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
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="form.parameter1"
            label="Recebe Parametros?"
          />
        </div>
      </q-card-section>

      <q-card-section v-if="form.parameter1 === true">
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.parameterName1"
            label="Informe o nome do parametro, ex.: userId"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="form.parameter1 === true">
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.parameterValue1"
            label="Informe o valor do primeiro parametro, ex.: 1"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="form.parameter1 === true">
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="form.parameter2"
            label="Outro parametro?"
          />
        </div>
      </q-card-section>

      <q-card-section v-if="form.parameter2 === true">
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.parameterName2"
            label="Informe o nome do segundo parametro, ex.: grupoId"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="form.parameter2 === true">
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.parameterValue2"
            label="Informe o valor do segundo parametro, ex.: 23"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="form.parameter2 === true">
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="form.parameter3"
            label="Há um terceiro parametro?"
          />
        </div>
      </q-card-section>

      <q-card-section v-if="form.parameter3 === true">
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.parameterName3"
            label="Informe o nome do terceiro parametro, ex.: cidadeId"
            required
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="form.parameter3 === true">
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.parameterValue3"
            label="Informe o valor do terceiro parametro, ex.: 12"
            required
          />
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
          Informe valores para o headers da requisição
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

      <q-card-section v-if="form.data === true">
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.bodyValue"
            label="Qual o tipo de data? ex.: audio/mp3"
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
        verbType: '',
        path: '',
        descriptionVerb: '',
        parameter1: false,
        parameterName1: '',
        parameterValue1: '',
        parameter2: false,
        parameterName2: '',
        parameterValue2: '',
        parameter3: false,
        parameterName3: '',
        parameterValue3: '',
        headersValue: {},
        body: false,
        bodyValue: {},
        data: false,
        dataType: '',
        dataValue: ''
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
        verbType: '',
        path: '',
        descriptionVerb: '',
        parameter1: false,
        parameterName1: '',
        parameterValue1: '',
        parameter2: false,
        parameterName2: '',
        parameterValue2: '',
        parameter3: false,
        parameterName3: '',
        parameterValue3: '',
        headersValue: {},
        body: false,
        bodyValue: {},
        data: false,
        dataType: '',
        dataValue: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
