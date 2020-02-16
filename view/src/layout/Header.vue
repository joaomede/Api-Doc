<template>
  <div>
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="hideShowMenu()"
        />

        <q-toolbar-title>{{ headertitle }}</q-toolbar-title>
        <q-btn
          class="q-mr-xs"
          dense
          round
          flat
          icon="new_releases"
        >
          <q-badge
            color="red"
            floating
            transparent
          >
            {{ cVersion }}
          </q-badge>
        </q-btn>
        <q-btn
          v-if="cUser.id === null"
          flat
          round
          dense
          icon="vpn_key"
          class="q-mr-xs"
          to="/login"
        />
        <q-btn
          v-if="cUser.id !== null"
          alt="Sair"
          flat
          round
          dense
          icon="exit_to_app"
          @click="logout"
        />
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
export default {
  props: {
    headertitle: {
      type: String,
      default: 'null'
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
    hideShowMenu () {
      this.menu = !this.menu
    },
    atualiza () {
      this.$emit('estadoMenu', this.menu)
    },
    atualizaMenu () {
      this.menu = this.left
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style lang="scss" scoped></style>
