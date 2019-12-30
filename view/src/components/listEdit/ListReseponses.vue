<template>
  <!-- vFor Responses -->
  <q-card>
    <q-card-section>
      <q-expansion-item
        icon="
        a"
        :label="responses.typeCode"
        header-class="a"
      >
        <q-card>
          <q-card-section>
            <q-item>
              <q-item-section>
                typeCode: {{ responses.typeCode }} <br>
                reason: {{ responses.reason }} <br>
                responseModel: {{ responses.responseModel }} <br>
                headers: {{ responses.headers }} <br>
              </q-item-section>
              <q-item-section side>
                <q-icon
                  class="text-right"
                  side
                  name="edit"
                  color="primary"
                  @click.stop="edit()"
                />
              </q-item-section>
              <q-item-section side>
                <q-icon
                  class="text-right"
                  side
                  name="delete"
                  color="primary"
                  @click.stop="deleteResponse"
                />
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
export default {
  props: {
    responses: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    edit () {
      this.$emit('edit')
    },
    deleteResponse () {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
