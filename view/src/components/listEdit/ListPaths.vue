<template>
  <div>
    <DialogConfirmDelete
      :dialog="dialogConfirmDeletePaths"
      @eventClose="dialogConfirmDeletePaths = false"
      @confirm="deletePath()"
    />

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
          <div class="text-center">
            <q-icon
              style="font-size: 24px"
              class="text-right"
              side
              name="save"
              color="primary"
              @click.stop="updatePath(paths)"
            />
            <q-icon
              style="font-size: 24px"
              class="text-right"
              side
              name="delete_sweep"
              color="primary"
              @click.stop="showDeletePath()"
            />
          </div>
          <q-item class="q-pa-xs">
            <q-item-section>
              <q-card-section>
                <q-item-section>
                  <q-checkbox
                    v-model="pathEditOption"
                    color="secondary"
                    label="Edição desabilitada"
                  />
                </q-item-section>
                <div
                  v-if="pathEditOption === true"
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Method:</strong> {{ paths.methodType }}
                </div>

                <q-select
                  v-if="pathEditOption === false"
                  v-model="paths.methodType"
                  filled
                  dense
                  :options="cTypeMethods"
                  emit-value
                  :disable="pathEditOption"
                  label="Method"
                />
                <q-separator spaced />

                <!-- Descrição -->
                <div
                  v-if="pathEditOption === true"
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Nome:</strong> {{ paths.pathName }}
                </div>
                <div
                  v-if="pathEditOption === false"
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Nome:</strong>
                  <q-input
                    v-model="paths.pathName"
                    :disable="pathEditOption"
                    class="bg-black text-blue"
                    square
                    dense
                    dark
                    outlined
                    label="Ex.: Login"
                  />
                </div>
                <q-separator spaced />

                <!-- Descrição -->
                <div
                  v-if="pathEditOption === true"
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Descrição:</strong> {{ paths.descriptionVerb }}
                </div>

                <!-- Descrição Edit -->
                <div
                  v-if="pathEditOption === false"
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Descrição:</strong>
                  <q-input
                    v-model="paths.descriptionVerb"
                    :disable="pathEditOption"
                    class="bg-black text-blue"
                    square
                    dense
                    dark
                    outlined
                    label="Ex.: About endpoint"
                  />
                </div>
                <q-separator spaced />

                <!-- Path View -->
                <div
                  v-if="pathEditOption === true"
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Path:</strong> {{ paths.path }}{{ paths.parameter.params | filterParamsName }}{{ paths.query.querys | filterQueryName }}
                </div>

                <!-- Path Edit -->
                <div
                  v-if="pathEditOption === false"
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Path:</strong>
                  <q-input
                    v-model="paths.path"
                    :disable="pathEditOption"
                    class="bg-black text-blue"
                    square
                    dense
                    dark
                    outlined
                    label="Ex.: api/login"
                  />
                </div>
                <q-separator spaced />

                <!-- Headers -->
                <div>
                  <q-card-section>
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
                    </div>
                  </q-card-section>
                  <q-separator spaced />

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
                  <q-card-section>
                    <div class="text-left">
                      <strong>Params:  </strong>
                      <q-icon
                        v-if="pathEditOption === false"
                        style="font-size: 20px"
                        class="text-right"
                        side
                        name="add"
                        color="primary"
                        @click.stop="(paths.parameter.params.push({parameterName: '',parameterValue: ''}))"
                      />
                      <q-icon
                        v-if="pathEditOption === false"
                        style="font-size: 20px"
                        class="text-right"
                        side
                        name="remove"
                        color="primary"
                        @click.stop="(paths.parameter.params.pop())"
                      />
                    </div>
                  </q-card-section>

                  <q-form
                    v-for="(params, index) in paths.parameter.params"
                    :key="index"
                  >
                    <q-item>
                      <q-item-section>
                        <q-input
                          v-model="params.parameterName"
                          :disable="pathEditOption"
                          class="bg-black text-blue"
                          square
                          dense
                          dark
                          outlined
                          label="Nome, ex.: userId"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          v-model="params.parameterValue"
                          :disable="pathEditOption"
                          class="bg-black text-blue"
                          square
                          dense
                          dark
                          outlined
                          label="Valor, ex.: 1"
                        />
                      </q-item-section>
                    </q-item>
                  </q-form>
                </div>
                <q-separator spaced />

                <!-- Query -->
                <div>
                  <q-card-section>
                    <div class="text-left">
                      <strong>Querys:  </strong>
                      <q-icon
                        v-if="pathEditOption === false"
                        style="font-size: 20px"
                        class="text-right"
                        side
                        name="add"
                        color="primary"
                        @click.stop="(paths.query.querys.push({ queryName: '', queryValue: '' }))"
                      />
                      <q-icon
                        v-if="pathEditOption === false"
                        style="font-size: 20px"
                        class="text-right"
                        side
                        name="remove"
                        color="primary"
                        @click.stop="(paths.query.querys.pop())"
                      />
                    </div>
                  </q-card-section>

                  <q-form
                    v-for="(querys, index) in paths.query.querys"
                    :key="index"
                  >
                    <q-item>
                      <q-item-section>
                        <q-input
                          v-model="querys.queryName"
                          :disable="pathEditOption"
                          class="bg-black text-blue"
                          square
                          dense
                          dark
                          outlined
                          label="Nome, ex.: userId"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-input
                          v-model="querys.queryValue"
                          :disable="pathEditOption"
                          class="bg-black text-blue"
                          square
                          dense
                          dark
                          outlined
                          label="Valor, ex.: 1"
                        />
                      </q-item-section>
                    </q-item>
                  </q-form>
                </div>
                <q-separator spaced />

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
                </div>
                <q-separator spaced />

                <!-- Response Test -->
                <div>
                  <div v-if="paths.methodType === 'POST'">
                    <q-btn
                      color="green"
                      class="q-ma-xs"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar requisição
                    </q-btn>
                    <q-btn
                      v-if="paths.response !== undefined"
                      color="green"
                      class="q-ma-xs"
                      @click.stop="addNewResponse(paths.response)"
                    >
                      Salvar Modelo Resposta
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
                    <q-btn
                      v-if="paths.response !== undefined"
                      color="red"
                      class="q-ma-xs"
                      @click.stop="addNewResponse(paths.response)"
                    >
                      Salvar Modelo Resposta
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
                    <q-btn
                      v-if="paths.response !== undefined"
                      color="purple"
                      class="q-ma-xs"
                      @click.stop="addNewResponse(paths.response)"
                    >
                      Salvar Modelo Resposta
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
                    <q-btn
                      v-if="paths.response !== undefined"
                      color="orange"
                      class="q-ma-xs"
                      @click.stop="addNewResponse(paths.response)"
                    >
                      Salvar Modelo Resposta
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

            <q-item-section side>
              <q-icon
                class="text-right"
                side
                name="add"
                color="primary"
                @click.stop="addNewResponseEmpty(paths.response)"
              />
            </q-item-section>
          </q-item>

          <!-- vFor Responses -->
          <q-card>
            <ListResponseEdit
              v-for="(responses, indexResponse) in paths.responses"
              :key="responses.id"
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
import ListResponseEdit from '../listEdit/ListResponses'
import DialogConfirmDelete from '../dialog/DialogConfirmDelete'
import pathTest from '../../mixins/pathTest'

export default {
  components: {
    VueJsonPretty,
    ListResponseEdit,
    DialogConfirmDelete
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
      dialogAddNewResponses: false,
      dialogConfirmDeletePaths: false,
      pathEditOption: true
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setPath', this.paths)
      this.$store.dispatch('setTagIndex', this.indexTags)
      this.$store.dispatch('setPathIndex', this.indexPath)
    },
    async addNewResponse (resp) {
      this.dispatchs()
      const response = {
        typeCode: resp.status,
        responseModel: { response: resp.data }
      }
      try {
        const result = await this.$axios.post(`api/responses/create/${this.cPath.id}`, response, { headers: this.cUser.headers })
        this.$store.dispatch('setNewResponse', result.data)
        this.$notify('Novo verbo criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async addNewResponseEmpty () {
      this.dispatchs()
      const response = {
        typeCode: '100',
        responseModel: { response: {} }
      }
      try {
        const result = await this.$axios.post(`api/responses/create/${this.cPath.id}`, response, { headers: this.cUser.headers })
        this.$store.dispatch('setNewResponse', result.data)
        this.$notify('Novo verbo criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    showDeletePath () {
      this.dispatchs()
      this.dialogConfirmDeletePaths = true
    },
    async updatePath (path) {
      try {
        const result = await this.$axios.put(`api/paths/update/${path.id}`, path, { headers: this.cUser.headers })
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async deletePath () {
      try {
        const result = await this.$axios.delete(`api/paths/delete/${this.cPath.id}`, { headers: this.cUser.headers })
        this.dialogConfirmDeletePaths = false
        this.$store.dispatch('removePath')
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.data.response.error, 'red')
      }
    }
  }
}
</script>

<style>
.add-form[data-v-01647a09]{
  font-size: 0.9em;
}
</style>
