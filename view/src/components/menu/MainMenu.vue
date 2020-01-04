<template>
  <div class="text-h5">
    {{ title }}
    <q-card class="my-card">
      <div
        class="q-gutter-xs row"
        style="justify-content: center;"
      >
        <div
          class="col-xs-auto"
        >
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
        </div>

        <div
          class="col-xs-auto"
        >
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
              Private API's
            </div>
          </q-btn>
        </div>

        <div
          class="col-xs-auto"
        >
          <q-btn
            v-ripple
            class="btnMenu"
            to="/teammanager"
            dense
          >
            <q-icon
              name="people"
              class="text-black"
              style="font-size: 4.4em;"
            />
            <div class="text-p">
              Gerenciar Time
            </div>
          </q-btn>

          <div
            class="col-xs-auto"
          >
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
                Api Team
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card>
  </div>
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

<style lang="scss" scoped>
</style>
