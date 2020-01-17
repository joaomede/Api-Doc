<template>
  <q-drawer
    v-model="menu"
    :width="width"
    side="left"
    overlay
    bordered
  >
    <q-scroll-area class="scrollArea">
      <q-list padding>
        <q-item
          v-ripple
          clickable
          to="/dash"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section>Tela Inicial</q-item-section>
        </q-item>

        <q-item
          v-if="user.id !== null"
          v-ripple
          clickable
          to="/changepassword"
        >
          <q-item-section avatar>
            <q-icon name="vpn_key" />
          </q-item-section>

          <q-item-section>Trocar Senha</q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
          to="/about"
        >
          <q-item-section avatar>
            <q-icon name="question_answer" />
          </q-item-section>

          <q-item-section>About</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      src="../statics/bg.jpg"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar
          size="56px"
          class="q-mb-sm"
        >
          <!-- <img src="../statics/boy-avatar.png"> -->
        </q-avatar>
        <div class="text-weight-bold">
          {{ user.name }}
        </div>
        <div>{{ user.email }}</div>
      </div>
    </q-img>
    <div
      v-if="menu == true"
      class="closeDrawer absolute"
    >
      <q-btn
        dense
        round
        unelevated
        color="blue"
        icon="chevron_left"
        @click="menu = false"
      />
    </div>
  </q-drawer>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 200
    },
    left: Boolean
  },
  data () {
    return {
      menu: this.left
    }
  },
  watch: {
    menu: 'atualiza',
    left: 'atualizaMenu'
  },
  methods: {
    atualiza () {
      this.$emit('estadoMenu', this.menu)
    },
    atualizaMenu () {
      this.menu = this.left
    }
  }
}
</script>

<style scoped>
.closeDrawer {
  top: 45px;
  right: -17px;
  z-index: 9999999;
}
</style>
