<template>
  <!-- vFor Responses -->
  <q-card>
    <q-card-section>
      <q-expansion-item
        icon="a"
        :label="responses.typeCode"
        header-class="a"
      >
        <q-card>
          <q-card-section>
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
import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
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
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setResponse', this.responses)
      this.$store.dispatch('setTagIndex', this.indexTags)
      this.$store.dispatch('setPathIndex', this.indexPath)
      this.$store.dispatch('setResponseIndex', this.indexResponse)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
