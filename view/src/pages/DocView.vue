
<template>
  <div>
    <ListApi class="centralDiv q-pa-xs text-center" />
  </div>
</template>

<script>
import ListApi from '../components/listEdit/ListApi'
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
