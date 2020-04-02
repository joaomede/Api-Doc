<template>
  <q-card
    class="row justify-center"
    style="min-height: 250px"
  >
    <div class="text-h5 text-center col-12">
      {{ title }}
    </div>
    <q-btn
      v-ripple
      class="btnMenu"
      to="/publicdocs"
      dense
    >
      <q-icon
        name="list"
        class="text-black"
        style="font-size: 4.4em;"
      />
      <div class="text-p">
        Public API's
      </div>
    </q-btn>

    <q-btn
      v-ripple
      class="btnMenu"
      to="/privatedocs"
      dense
    >
      <q-icon
        name="security"
        class="text-black"
        style="font-size: 4.4em;"
      />
      <div class="text-p">
        My API's
      </div>
    </q-btn>

    <q-btn
      v-ripple
      class="btnMenu"
      to="/teamdocs"
      dense
    >
      <q-icon
        name="list"
        class="text-black"
        style="font-size: 4.4em;"
      />
      <div class="text-p">
        My Team Api
      </div>
    </q-btn>

    <q-btn
      v-ripple
      class="btnMenu"
      to="/manageteams"
      dense
    >
      <q-icon
        name="people"
        class="text-black"
        style="font-size: 4.4em;"
      />
      <div class="text-p">
        Manage Teams
      </div>
    </q-btn>
  </q-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
