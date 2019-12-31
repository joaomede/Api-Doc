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

    <DialogUpdatePath
      :dialog="dialogUpdatePath"
      @eventClose="dialogUpdatePath = false"
    />

    <q-expansion-item
      expand-separator
      :icon="paths.verbType | verificaLetra"
      :label="paths.verbType"
      :caption="`Path: ${paths.path}`"
      :header-class="paths.verbType | verificaCor"
    >
      <q-card>
        <q-card-section
          class="text-left"
          :style="paths.verbType | filtrarCorBackground"
        >
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-card-section>
                  <div
                    v-if="paths.parameter1 === false"
                    class="text-h6"
                    style="font-size: 18px"
                  >
                    <strong>Method:</strong> {{ paths.verbType }}
                  </div>

                  <div
                    class="text-h6"
                    style="font-size: 18px"
                  >
                    <strong>Paths:</strong> {{ paths.path }}
                  </div>
                  <q-separator spaced />

                  <div>
                    <strong>Params:</strong>
                    <q-card-section>
                      <div class="text-center">
                        <q-icon
                          class="text-right"
                          side
                          name="add"
                          color="primary"
                          @click.stop="(paths.parameter.params.push({parameterName: '',parameterValue: ''}))"
                        />
                        <q-icon
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

                  <div v-if="paths.parameter1 === true">
                    Parameter Name: {{ paths.parameterName1 }}<br>
                    Value: {{ paths.parameterValue1 }} <br>
                    <q-separator spaced />
                  </div>
                  <div v-if="paths.parameter2 === true">
                    Parameter Name: {{ paths.parameterName2 }}<br>
                    Value: {{ paths.parameterValue2 }} <br>
                    <q-separator spaced />
                  </div>
                  <div v-if="paths.parameter3 === true">
                    Parameter Name: {{ paths.parameterName3 }}<br>
                    Value: {{ paths.parameterValue3 }} <br>
                    <q-separator spaced />
                  </div>

                  <div v-if="paths.body === true">
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

                  <div v-if="paths.verbType === 'POST'">
                    <q-btn
                      color="green"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar Requisitação
                    </q-btn>
                    <br><br>
                    <div v-if="paths.response !== undefined">
                      Status: {{ paths.response.status }} <br>
                      Resultado da requisição:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>

                  <div v-if="paths.verbType === 'DELETE'">
                    <q-btn
                      color="red"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar Requisitação
                    </q-btn>
                    <br><br>
                    <div v-if="paths.response !== undefined">
                      Status: {{ paths.response.status }} <br>
                      Resultado da requisição:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>

                  <div v-if="paths.verbType === 'GET'">
                    <q-btn
                      color="purple"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar Requisitação
                    </q-btn>
                    <br><br>
                    <div v-if="paths.response !== undefined">
                      Status: {{ paths.response.status }} <br>
                      Resultado da requisição:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>

                  <div v-if="paths.verbType === 'PUT'">
                    <q-btn
                      color="orange"
                      @click="pathTest(paths, indexTags, indexPath)"
                    >
                      Enviar Requisitação
                    </q-btn>
                    <br><br>
                    <div v-if="paths.response !== undefined">
                      Status: {{ paths.response.status }} <br>
                      Resultado da requisição:
                      <vue-json-pretty
                        :data="paths.response.data"
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  class="text-right"
                  side
                  name="edit"
                  color="primary"
                  @click.stop="showEditPath()"
                />
              </q-item-section>
              <q-item-section side>
                <q-icon
                  class="text-right"
                  side
                  name="delete_sweep"
                  color="primary"
                  @click.stop="showDeletePath()"
                />
              </q-item-section>
            </q-item>
          </q-card-section>

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
import DialogUpdatePath from '../dialog/updateDialog/DialogUpdatePaths'
import DialogAddNewResponses from '../dialog/addDialog/DialogAddNewResponses'
import DialogConfirmDelete from '../dialog/DialogConfirmDelete'
import pathTest from '../../mixins/pathTest'

export default {
  components: {
    VueJsonPretty,
    ListResponseEdit,
    DialogAddNewResponses,
    DialogUpdatePath,
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
      dialogUpdatePath: false
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
    showEditPath () {
      this.dispatchs()
      this.dialogUpdatePath = true
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

<style lang="scss" scoped>

</style>
