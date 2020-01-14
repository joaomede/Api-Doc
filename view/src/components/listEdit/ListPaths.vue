<template>
  <div>
    <DialogAddNewResponses
      :dialog="dialogAddNewResponses"
      @eventClose="dialogAddNewResponses = false"
    />
    <DialogConfirmDelete
      :dialog="dialogConfirmDeletePaths"
      @eventClose="dialogConfirmDeletePaths = false"
      @confirm="deletePath()"
    />

    <q-expansion-item
      expand-separator
      :icon="paths.methodType | verificaLetra"
      :label="paths.methodType"
      :caption="`Path: ${paths.path}`"
      :header-class="paths.methodType | verificaCor"
    >
      <q-card>
        <q-card-section
          class="text-left q-pa-xs"
          :style="paths.methodType | filtrarCorBackground"
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
                  Method
                </q-item-section>

                <q-item-section>
                  <q-checkbox
                    v-model="pathEditOption"
                    color="secondary"
                    label="Edição desabilitada"
                  />
                </q-item-section>

                <q-input
                  v-model="paths.methodType"
                  class="text-white"
                  square
                  dense

                  outlined
                  :disable="pathEditOption"
                />
                <div
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Path:</strong> {{ paths.path }}{{ paths.parameter.params | filterParamsName }}
                </div>
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
                    <q-separator spaced />
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

                <div
                  class="text-h6"
                  style="font-size: 18px"
                >
                  <strong>Descrição:</strong> {{ paths.descriptionVerb }}
                </div>
                <q-separator spaced />
                Headers:
                <JsonEditor
                  v-model="paths.headersValue"
                  :options="{
                    confirmText: 'confirm',
                    cancelText: 'cancel',
                  }"
                  :obj-data="paths.headersValue"
                />
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

                <div v-if="paths.methodType === 'POST'">
                  <q-btn
                    color="green"
                    @click="pathTest(paths, indexTags, indexPath)"
                  >
                    Enviar Requisitação
                  </q-btn>
                  <br><br>
                  <div
                    v-if="paths.response !== undefined"
                    class="q-pa-md bg-grey-8 text-white"
                  >
                    Status: {{ paths.response.status }} <br>
                    Resultado da requisição:
                    <vue-json-pretty
                      :data="paths.response.data"
                    />
                  </div>
                </div>

                <div
                  v-if="paths.methodType === 'DELETE'"
                >
                  <q-btn
                    color="red"
                    @click="pathTest(paths, indexTags, indexPath)"
                  >
                    Enviar Requisitação
                  </q-btn>
                  <br><br>
                  <div
                    v-if="paths.response !== undefined"
                    class="q-pa-md bg-grey-8 text-white"
                  >
                    Status: {{ paths.response.status }} <br>
                    Resultado da requisição:
                    <vue-json-pretty
                      :data="paths.response.data"
                    />
                  </div>
                </div>

                <div v-if="paths.methodType === 'GET'">
                  <q-btn
                    color="purple"
                    @click="pathTest(paths, indexTags, indexPath)"
                  >
                    Enviar Requisitação
                  </q-btn>
                  <br><br>
                  <div
                    v-if="paths.response !== undefined"
                    class="q-pa-md bg-grey-8 text-white"
                  >
                    Status: {{ paths.response.status }} <br>
                    Resultado da requisição:
                    <vue-json-pretty
                      :data="paths.response.data"
                    />
                  </div>
                </div>

                <div v-if="paths.methodType === 'PUT'">
                  <q-btn
                    color="orange"
                    @click="pathTest(paths, indexTags, indexPath)"
                  >
                    Enviar Requisitação
                  </q-btn>
                  <br><br>
                  <div
                    v-if="paths.response !== undefined"
                    class="q-pa-md bg-grey-8 text-white"
                  >
                    Status: {{ paths.response.status }} <br>
                    Resultado da requisição:
                    <vue-json-pretty
                      :data="paths.response.data"
                    />
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
                @click.stop="addNewResponse()"
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
import DialogAddNewResponses from '../dialog/addDialog/DialogAddNewResponses'
import DialogConfirmDelete from '../dialog/DialogConfirmDelete'
import pathTest from '../../mixins/pathTest'

export default {
  components: {
    VueJsonPretty,
    ListResponseEdit,
    DialogAddNewResponses,
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
    addNewResponse () {
      this.dispatchs()
      this.dialogAddNewResponses = true
    },
    showDeletePath () {
      this.dispatchs()
      this.dialogConfirmDeletePaths = true
    },
    async updatePath (path) {
      try {
        const result = await this.$axios.put(`api/paths/update/${path.id}`, path, { headers: this.user.headers })
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async deletePath () {
      try {
        const result = await this.$axios.delete(`api/paths/delete/${this.cPath.id}`, { headers: this.user.headers })
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
