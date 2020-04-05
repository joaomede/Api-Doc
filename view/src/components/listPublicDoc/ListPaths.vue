<template>
  <div>
    <q-expansion-item
      expand-separator
      :icon="paths.methodType | checksLetters"
      :label="paths.methodType"
      :caption="`Path: ${paths.path}`"
      :header-class="paths.methodType | checkMethodColor"
    >
      <q-card>
        <q-card-section
          class="text-left q-pa-xs"
          :style="paths.methodType | filterColorBackground"
        >
          <q-item class="q-pa-xs">
            <q-item-section>
              <q-card-section>
                <div
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Method:</strong> {{ paths.methodType }}
                  <q-separator spaced />
                </div>

                <!-- Descrição -->
                <div
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Nome:</strong> {{ paths.pathName }}
                  <q-separator spaced />
                </div>

                <!-- Descrição -->
                <div
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Descrição:</strong> {{ paths.descriptionVerb }}
                  <q-separator spaced />
                </div>

                <!-- Path View -->
                <div
                  class="text-h6"
                  style="font-size: 18px; word-break: break-word"
                >
                  <strong>Path:</strong> {{ paths.path }}{{ paths.parameter.params | filterParamsName }}{{ paths.query.querys | filterQueryName }}
                  <q-separator spaced />
                </div>

                <!-- Headers -->
                <div>
                  <div class="text-left">
                    <strong>Headers:  </strong>
                    <JsonEditor
                      v-model="paths.headersValue"
                      :options="{
                        confirmText: 'confirm',
                        cancelText: 'cancel',
                      }"
                      :obj-data="paths.headersValue"
                    />
                    <q-separator spaced />
                  </div>

                  <div
                    v-if="paths.body === true"
                  >
                    Body:
                    <JsonEditor
                      v-model="paths.bodyValue"
                      :options="{
                        confirmText: 'confirm',
                        cancelText: 'cancel',
                      }"
                      :obj-data="paths.bodyValue"
                    />
                    <q-separator spaced />
                  </div>

                  <div v-if="paths.data === true">
                    Data Type: {{ paths.dataType }}<br>
                    <q-separator spaced />
                  </div>
                </div>

                <!-- Param -->
                <div>
                  <div class="text-left">
                    <strong>Params:  </strong>
                    <q-icon
                      style="font-size: 20px"
                      class="text-right"
                      side
                      name="add"
                      color="primary"
                      @click.stop="(paths.parameter.params.push({parameterName: '',parameterValue: ''}))"
                    />
                    <q-icon
                      style="font-size: 20px"
                      class="text-right"
                      side
                      name="remove"
                      color="primary"
                      @click.stop="(paths.parameter.params.pop())"
                    />
                  </div>
                  <q-form
                    v-for="(params, index) in paths.parameter.params"
                    :key="index"
                  >
                    <q-input
                      v-model="params.parameterName"
                      class="bg-blue-8 col-12 col-sm-6"
                      square
                      dense
                      dark
                      outlined
                      label="Nome, ex.: userId"
                    />
                    <q-input
                      v-model="params.parameterValue"
                      class="bg-blue-8 col-12 col-sm-6"
                      square
                      dense
                      dark
                      outlined
                      label="Valor, ex.: 1"
                    />
                    <div class="q-ma-xs" />
                  </q-form>
                  <q-separator spaced />
                </div>

                <!-- Query -->
                <div>
                  <div class="text-left">
                    <strong>Querys:  </strong>
                    <q-icon
                      style="font-size: 20px"
                      class="text-right"
                      side
                      name="add"
                      color="primary"
                      @click.stop="(paths.query.querys.push({ queryName: '', queryValue: '' }))"
                    />
                    <q-icon
                      style="font-size: 20px"
                      class="text-right"
                      side
                      name="remove"
                      color="primary"
                      @click.stop="(paths.query.querys.pop())"
                    />
                  </div>
                  <q-form
                    v-for="(querys, index) in paths.query.querys"
                    :key="index"
                  >
                    <q-input
                      v-model="querys.queryName"
                      class="bg-blue-8 col-12 col-sm-6"
                      square
                      dense
                      dark
                      outlined
                      label="Nome, ex.: userId"
                    />
                    <q-input
                      v-model="querys.queryValue"
                      class="bg-blue-8 col-12 col-sm-6"
                      square
                      dense
                      dark
                      outlined
                      label="Valor, ex.: 1"
                    />
                    <div class="q-ma-xs" />
                  </q-form>
                  <q-separator spaced />
                </div>

                <!-- Body -->
                <div>
                  <q-card-section>
                    <div class="text-left">
                      <strong>Body:  </strong>
                      <JsonEditor
                        v-model="paths.bodyValue"
                        :options="{
                          confirmText: 'confirm',
                          cancelText: 'cancel',
                        }"
                        :obj-data="paths.bodyValue"
                      />
                    </div>
                  </q-card-section>
                  <q-separator spaced />
                </div>

                <!-- Response Test -->
                <div class="responsefield">
                  <div v-if="paths.methodType === 'POST'">
                    <q-btn
                      color="green"
                      class="q-ma-xs"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar requisição
                    </q-btn>
                    <br><br>
                    <div
                      v-if="paths.response !== undefined"
                      class="q-pa-md bg-grey-8 text-white"
                    >
                      <strong>Status:</strong> {{ paths.response.status | filterCodeStatus }} <br>
                      <strong>Reason:</strong> {{ paths.response.status | filterReasonCode }} <br>
                      Response:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>

                  <div v-if="paths.methodType === 'DELETE'">
                    <q-btn
                      color="red"
                      class="q-ma-xs"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar requisição
                    </q-btn>
                    <br><br>
                    <div
                      v-if="paths.response !== undefined"
                      class="q-pa-md bg-grey-8 text-white"
                    >
                      <strong>Status:</strong> {{ paths.response.status | filterCodeStatus }} <br>
                      <strong>Reason:</strong> {{ paths.response.status | filterReasonCode }} <br>
                      Response:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>

                  <div v-if="paths.methodType === 'GET'">
                    <q-btn
                      color="purple"
                      class="q-ma-xs"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar requisição
                    </q-btn>
                    <br><br>
                    <div
                      v-if="paths.response !== undefined"
                      class="q-pa-md bg-grey-8 text-white"
                    >
                      <strong>Status:</strong> {{ paths.response.status | filterCodeStatus }} <br>
                      <strong>Reason:</strong> {{ paths.response.status | filterReasonCode }} <br>
                      Response:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>

                  <div v-if="paths.methodType === 'PUT'">
                    <q-btn
                      color="orange"
                      class="q-ma-xs"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar requisição
                    </q-btn>
                    <br><br>
                    <div
                      v-if="paths.response !== undefined"
                      class="q-pa-md bg-grey-8 text-white"
                    >
                      <strong>Status:</strong> {{ paths.response.status | filterCodeStatus }} <br>
                      <strong>Reason:</strong> {{ paths.response.status | filterReasonCode }} <br>
                      Response:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-item-section>
          </q-item>

          <!-- header Responss -->
          <q-item>
            <q-item-section>
              <div class="text-h6">
                Responses
              </div>
            </q-item-section>
          </q-item>

          <!-- vFor Responses -->
          <q-card>
            <ListResponseEdit
              v-for="(responses, indexResponse) in paths.responses"
              :key="indexResponse"
              :responses="responses"
              :index-tags="indexTags"
              :index-path="indexPath"
              :index-response="indexResponse"
            />
          </q-card>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-separator />
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import ListResponseEdit from '../listPublicDoc/ListResponses'
import pathTest from '../../mixins/pathTest'

export default {
  components: {
    VueJsonPretty,
    ListResponseEdit
  },
  mixins: [pathTest],
  props: {
    paths: {
      type: Object,
      default: function () {
        return {}
      }
    },
    indexTags: {
      type: Number,
      default: 0
    },
    indexPath: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pathEditOption: true
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setPath', this.paths)
      this.$store.dispatch('setTagIndex', this.indexTags)
      this.$store.dispatch('setPathIndex', this.indexPath)
    }
  }
}
</script>

<style scoped>
.add-form[data-v-01647a09]{
  font-size: 0.9em;
}

.q-field__control{
  color: black
}
</style>
