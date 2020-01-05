<template>
  <q-dialog
    v-model="dialogPopup"
    @hide="eventClose()"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Informe um nome e uma descrição para esta tag
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.nameTag"
            label="Informe o nome do Tag"
            required
            dense
          />
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            v-model="form.descriptionTag"
            label="Informe a descrição do Tag"
            required
            dense
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
          @click="updateTag"
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
        nameTag: '',
        descriptionTag: ''
      },
      dialogPopup: this.dialog
    }
  },
  watch: {
    dialog: 'update'
  },
  methods: {
    update () {
      this.form = this.cTag
      this.dialogPopup = this.dialog
    },
    eventClose () {
      this.dialogPopup = false
      this.$emit('eventClose')
      this.reset()
    },
    async updateTag () {
      try {
        const result = await this.$axios.put(`api/tags/update/${this.form.id}`, this.form, { headers: this.user.headers })
        this.$store.dispatch('setUpdateTag', this.form)
        this.$notify(result.data.ok, 'green')
        this.eventClose()
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    reset () {
      this.form = {
        nameTag: '',
        descriptionTag: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
