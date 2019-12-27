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

        <q-toolbar-title>{{ headerTitle }}</q-toolbar-title>
        <q-btn
          v-if="user"
          class="q-mr-xs"
          dense
          round
          flat
          icon="new_releases"
          to="/feedversion"
        >
          <q-badge
            color="red"
            floating
            transparent
          >
            {{ cloudVersion }}
          </q-badge>
        </q-btn>
        <q-btn
          v-if="!user"
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
            {{ cloudVersion }}
          </q-badge>
        </q-btn>
        <q-btn
          v-if="!user.uid"
          flat
          round
          dense
          icon="vpn_key"
          class="q-mr-xs"
          to="/login"
        />
        <q-btn
          v-if="user.uid"
          alt="Sair"
          flat
          round
          dense
          icon="exit_to_app"
          @click="logout"
        />
      </q-toolbar>
      <q-breadcrumbs
        v-if="$q.platform.is.mobile"
        align="center"
        active-color="white"
        style="font-size: 14px"
      >
        <q-breadcrumbs-el
          icon="home"
          to="/dash"
        />
        <q-breadcrumbs-el
          v-if="pastaAtual.id != null"
          :to="'/quadro/' + pastaAtual.id"
          :label="pastaAtual.titlePasta"
          icon="folder"
        />
        <q-breadcrumbs-el
          v-if="quadroAtual.id != null"
          :label="quadroAtual.titleQuadro"
          icon="folder"
        />
      </q-breadcrumbs>

      <q-breadcrumbs
        v-if="$q.platform.is.desktop"
        align="center"
        active-color="white"
        style="font-size: 20px"
      >
        <q-breadcrumbs-el
          label="Home"
          icon="home"
          to="/dash"
        />
        <q-breadcrumbs-el
          v-if="pastaAtual.id != null"
          :to="'/quadro/' + pastaAtual.id"
          :label="pastaAtual.titlePasta"
          icon="folder"
        />
        <q-breadcrumbs-el
          v-if="quadroAtual.id != null"
          :label="quadroAtual.titleQuadro"
          icon="folder"
        />
      </q-breadcrumbs>
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
