
<template>
  <div class="centralDiv">
    <BackMobile />
    <BackDesktop />
    <ListApi class="centralDiv q-pa-xs text-center" />
  </div>
</template>

<script>
import ListApi from '../components/listTeamDoc/ListApi'
import BackMobile from '../components/fab/FabBtnBackMobile'
import BackDesktop from '../components/fab/FabBtnBackDesktop'

export default {
  components: {
    ListApi,
    BackMobile,
    BackDesktop
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
