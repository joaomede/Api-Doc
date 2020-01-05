<template>
  <q-btn
    v-if="$q.platform.is.desktop"
    round
    color="orange darken-2"
    class="fixed fabCenter"
    @click.stop="eventClick()"
  >
    <q-icon
      class="iconFabCenter"
      name="add"
    />
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
