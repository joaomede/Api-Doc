<template>
  <q-dialog
    v-model="dialogPopup"
    @hide="eventClose()"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Embed Code
        </div>
        <highlight-code
          lang="html"
        >
          {{ code }}
        </highlight-code>
      </q-card-section>

      <q-card-section align="center">
        <q-btn
          class="q-ma-xs"
          color="black"
          @click.stop="eventClose()"
        >
          Fechar
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean
    }
  },
  data () {
    return {
      dialogPopup: this.dialog,
      code: ''
    }
  },
  watch: {
    dialog: 'update'
  },
  methods: {
    update () {
      const origin = window.location.origin
      this.dialogPopup = this.dialog
      this.code = `<embed 
        src="${origin}/sharedviewdoc/${this.cApi.id}"
        style="width:500px; height: 300px;"
      >`
    },
    eventClose () {
      this.dialogPopup = false
      this.$emit('eventClose')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
