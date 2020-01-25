<template>
  <q-header elevated>
    <q-bar class="q-electron-drag">
      <q-icon name="laptop_chromebook" />
      <div>Api Doc</div>

      <q-space />

      <q-btn
        dense
        flat
        icon="minimize"
        @click="minimize"
      />
      <q-btn
        dense
        flat
        icon="crop_square"
        @click="maximize"
      />
      <q-btn
        dense
        flat
        icon="close"
        @click="closeApp"
      />
    </q-bar>

    <div class="q-pa-sm q-pl-md row items-center">
      <div
        v-if="user.id !== null"
        class="cursor-pointer non-selectable"
      >
        Menu
        <q-menu>
          <q-list
            dense
            style="min-width: 100px"
          >
            <q-item
              v-close-popup
              clickable
              to="/dash"
            >
              <q-item-section>Home</q-item-section>
            </q-item>

            <q-separator />
          </q-list>
        </q-menu>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        Documentations
        <q-menu>
          <q-list
            dense
            style="min-width: 100px"
          >
            <q-item
              v-close-popup
              clickable
              to="/publicdocs"
            >
              <q-item-section>Public List</q-item-section>
            </q-item>

            <q-item
              v-if="user.id !== null"
              v-close-popup
              clickable
              to="/privatedocs"
            >
              <q-item-section>Private List</q-item-section>
            </q-item>

            <q-separator />
          </q-list>
        </q-menu>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        User
        <q-menu>
          <q-list
            dense
            style="min-width: 100px"
          >
            <q-item
              v-if="user.id === null"
              v-close-popup
              clickable
              to="/login"
            >
              <q-item-section>Login</q-item-section>
            </q-item>

            <q-item
              v-if="user.id !== null"
              v-close-popup
              clickable
              @click="logout"
            >
              <q-item-section>Logout</q-item-section>
            </q-item>

            <q-separator />
          </q-list>
        </q-menu>
      </div>

      <div
        v-if="user.id !== null"
        class="q-ml-md cursor-pointer non-selectable"
      >
        Team
        <q-menu>
          <q-list
            dense
            style="min-width: 100px"
          >
            <q-item
              v-close-popup
              clickable
              to="/manageteams"
            >
              <q-item-section>Manage Team</q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              to="/teamdocs"
            >
              <q-item-section>My Team Api List</q-item-section>
            </q-item>

            <q-separator />
          </q-list>
        </q-menu>
      </div>

      <div class="q-ml-md cursor-pointer non-selectable">
        Settings
        <q-menu>
          <q-list
            dense
            style="min-width: 100px"
          >
            <q-item
              v-close-popup
              clickable
              to="/electron"
            >
              <q-item-section>Remote Server URL</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </div>
  </q-header>
</template>

<script>
export default {
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
