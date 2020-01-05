<template>
  <q-btn
    v-if="$q.platform.is.mobile"
    round
    color="orange darken-2"
    class="fixed fabRight"
    @click.stop="eventClick()"
  >
    <q-icon name="add" />
  </q-btn>
</template>

<script>
export default {
  methods: {
    eventClick () {
      this.$emit('eventClick')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
