
<template>
  <div>
    <ListApi class="centralDiv q-pa-xs text-center" />
  </div>
</template>

<script>
import ListApi from '../components/listTeamDoc/ListApi'
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
    this.$store.dispatch('setApiDataTeam', this.id)
  }
}
</script>

<style lang="scss" scoped>
</style>
