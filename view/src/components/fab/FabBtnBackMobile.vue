<template>
  <q-btn
    v-if="$q.platform.is.mobile"
    round
    color="orange darken-2"
    class="fixed fabLeft"
    @click.stop="$router.go(-1)"
  >
    <q-icon name="fas fa-arrow-left" />
  </q-btn>
</template>
