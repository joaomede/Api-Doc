
<template>
  <div>
    <BackMobile v-if="this.$router.currentRoute.name !== 'SharedViewDoc'" />
    <BackDesktop v-if="this.$router.currentRoute.name !== 'SharedViewDoc'" />
    <ListApi class="centralDiv q-pa-xs text-center" />
  </div>
</template>

<script>
import ListApi from '../components/listPublicDoc/ListApi'
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
