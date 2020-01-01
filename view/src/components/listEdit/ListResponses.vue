<template>
  <!-- vFor Responses -->
  <q-card>
    <DialogUpdateResponse
      :dialog="dialogUpdateResponse"
      @eventClose="dialogUpdateResponse = false"
    />
    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteResponses"
      @eventClose="dialogConfirmDeleteResponses = false"
      @confirm="deleteResponse()"
    />
    <q-card-section>
      <q-expansion-item
        icon="a"
        :label="responses.typeCode"
        header-class="a"
      >
        <q-card>
          <q-card-section>
            <div class="text-center">
              <q-icon
                style="font-size: 24px"
                class="text-right"
                side
                name="edit"
                color="primary"
                @click.stop="showEdit"
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
                Code: {{ responses.typeCode }} <br>
                Reason: {{ responses.reason }} <br>
                <div
                  class="q-pa-md bg-grey-8 text-white"
                >
                  Status: {{ responses.typeCode }} <br>
                  Body Response:
                  <vue-json-pretty
                    :data="responses.responseModel"
                  />
                </div>
                headers: {{ responses.headers }} <br>
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
import DialogUpdateResponse from '../dialog/updateDialog/DialogUpdateResponses'
import DialogConfirmDelete from '../dialog/DialogConfirmDelete'
import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
    DialogUpdateResponse,
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
      dialogConfirmDeleteResponses: false
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setResponse', this.responses)
      this.$store.dispatch('setTagIndex', this.indexTags)
      this.$store.dispatch('setPathIndex', this.indexPath)
      this.$store.dispatch('setResponseIndex', this.indexResponse)
    },
    showEdit () {
      this.dispatchs()
      this.dialogUpdateResponse = true
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
