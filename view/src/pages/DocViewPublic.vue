
<template>
  <div class="centralDiv">
    <FabButton
      v-if="this.$router.currentRoute.name !== 'SharedViewDoc'"
      color="orange darken-2"
      position="left"
      icon="fas fa-arrow-left"
      @eventClick="$router.go(-1)"
    />
    <ListApi class="text-center" />
  </div>
</template>

<script>
import ListApi from '../components/listPublicDoc/ListApi'

export default {
  components: {
    ListApi
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  created () {
    this.$store.dispatch('setApiData', [this.id, this.$router.currentRoute.name])
  }
}
</script>

<style lang="scss" scoped>
</style>
