
<template>
  <div>
    <BackMobile />
    <BackDesktop />
    <ListApi class="centralDiv q-pa-xs text-center" />
  </div>
</template>

<script>
import BackMobile from '../components/fab/FabBtnBackMobile'
import BackDesktop from '../components/fab/FabBtnBackDesktop'
import ListApi from '../components/listEdit/ListApi'

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
