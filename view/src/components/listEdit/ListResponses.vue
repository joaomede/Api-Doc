<template>
  <!-- vFor Responses -->
  <q-card>
    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteResponses"
      @eventClose="dialogConfirmDeleteResponses = false"
      @confirm="deleteResponse()"
    />
    <q-card-section>
      <q-expansion-item
        icon="a"
        :label="responses.typeCode | filterCodeStatus"
        header-class="a"
      >
        <q-card>
          <q-card-section>
            <div class="text-center">
              <q-icon
                style="font-size: 24px"
                class="text-right"
                side
                name="save"
                color="primary"
                @click.stop="saveEdit(responses)"
              />
              <q-icon
                style="font-size: 24px"
                class="text-right"
                side
                name="delete"
                color="primary"
                @click.stop="showDelete"
              />
            </div>
            <q-item>
              <q-item-section>
                <q-checkbox
                  v-model="responseEditOption"
                  color="secondary"
                  class="text-left"
                  label="Edição desabilitada"
                />
                <q-select
                  v-if="responseEditOption === false"
                  v-model="responses.typeCode"
                  filled
                  dense
                  :options="cTypeCodes"
                  map-options
                  emit-value
                  :disable="responseEditOption"
                  label="Codes"
                />
                <div v-if="responseEditOption === true">
                  <strong>Status:</strong> {{ responses.typeCode | filterCodeStatus }}
                </div>
                <div>
                  <strong>Reason:</strong> {{ responses.typeCode | filterReasonCode }}
                </div>

                <div
                  v-if="responseEditOption === true"
                  class="q-pa-md bg-grey-8 text-white"
                >
                  <vue-json-pretty
                    :data="responses.responseModel.response"
                  />
                </div>

                <div>
                  <JsonEditor
                    v-if="responseEditOption === false"
                    v-model="responses.responseModel"
                    :options="{
                      confirmText: 'confirm',
                      cancelText: 'cancel',
                    }"
                    :obj-data="responses.responseModel.response"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
    </q-card-section>
  </q-card>
</template>

<script>
import DialogConfirmDelete from '../dialog/DialogConfirmDelete'
import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
    DialogConfirmDelete,
    VueJsonPretty
  },
  props: {
    responses: {
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
    },
    indexResponse: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dialogUpdateResponse: false,
      dialogConfirmDeleteResponses: false,
      responseEditOption: true
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setResponse', this.responses)
      this.$store.dispatch('setTagIndex', this.indexTags)
      this.$store.dispatch('setPathIndex', this.indexPath)
      this.$store.dispatch('setResponseIndex', this.indexResponse)
    },
    async saveEdit (response) {
      try {
        const result = await this.$axios.put(`api/responses/update/${response.id}`, response, { headers: this.user.headers })
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    showDelete () {
      this.dispatchs()
      this.dialogConfirmDeleteResponses = true
    },
    async deleteResponse () {
      try {
        const result = await this.$axios.delete(`api/responses/delete/${this.cResponse.id}`, { headers: this.user.headers })
        this.dialogConfirmDeleteResponses = false
        this.$store.dispatch('removeResponse')
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
