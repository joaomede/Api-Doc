import { defineComponent, getCurrentInstance } from '@vue/composition-api'

export const HeaderElectron = defineComponent({
  setup (p, { emit }) {
    const root = getCurrentInstance().proxy.$root

    function minimize () {
      if (process.env.MODE === 'electron') {
        root.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    }

    function maximize () {
      if (process.env.MODE === 'electron') {
        const win = root.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    }

    function closeApp () {
      if (process.env.MODE === 'electron') {
        root.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
    function logout () {
      emit('logout')
    }

    return () => {
      return (
        <q-header elevated>
          <q-bar
            class="bg-indigo-8 q-electron-drag"
          >
            <q-icon name="assignment" />
            <div>
            Api Doc
            </div>

            <q-space />

            <q-btn
              dense
              flat
              icon={'minimize'}
              onClick={() => {
                minimize()
              }}
            />
            <q-btn
              dense
              flat
              icon={'crop_square'}
              onClick={() => {
                maximize()
              }}
            />
            <q-btn
              dense
              flat
              icon={'close'}
              onClick={() => {
                closeApp()
              }}
            />
          </q-bar>

          <div class={'bg-blue q-pa-sm q-pl-md row items-center'}>
            {
              root.cUser.id !== null
                ? <div
                  class={'cursor-pointer non-selectable'}
                >
                Menu
                  <q-menu>
                    <q-list
                      dense
                      style={{ 'min-width': '100px' }}
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
                : ''
            }

            <div class={'q-ml-md cursor-pointer non-selectable'}>
            Documentations
              <q-menu>
                <q-list
                  dense
                  style={{ 'min-width': '100px' }}
                >
                  <q-item
                    v-close-popup
                    clickable
                    to={'/publicdocs'}
                  >
                    <q-item-section>Public List</q-item-section>
                  </q-item>

                  {
                    root.cUser.id !== null
                      ? <q-item
                        v-close-popup
                        clickable
                        to={'/privatedocs'}
                      >
                        <q-item-section>Private List</q-item-section>
                      </q-item>
                      : ''
                  }

                  <q-separator />
                </q-list>
              </q-menu>
            </div>

            <div class={'q-ml-md cursor-pointer non-selectable'}>
              User
              <q-menu>
                <q-list
                  dense
                  style={{ 'min-width': '100px' }}
                >
                  {
                    root.cUser.id === null
                      ? <q-item
                        v-close-popup
                        clickable
                        to={'/login'}
                      >
                        <q-item-section>Login</q-item-section>
                      </q-item>
                      : <div>
                        <q-item
                          v-close-popup
                          clickable
                          onClick={() => {
                            logout()
                          }}
                        >
                          <q-item-section>Logout</q-item-section>
                        </q-item>
                        <q-item
                          v-close-popup
                          clickable
                          to={'/changepassword'}
                        >
                          <q-item-section>Change Password</q-item-section>
                        </q-item>
                      </div>
                  }
                  <q-separator />
                </q-list>
              </q-menu>
            </div>

            {
              root.cUser.id !== null
                ? <div
                  class={'q-ml-md cursor-pointer non-selectable'}
                >
                  Team
                  <q-menu>
                    <q-list
                      dense
                      style={{ 'min-width': '100px' }}
                    >
                      <q-item
                        v-close-popup
                        clickable
                        to={'/manageteams'}
                      >
                        <q-item-section>Manage Team</q-item-section>
                      </q-item>

                      <q-item
                        v-close-popup
                        clickable
                        to={'/teamdocs'}
                      >
                        <q-item-section>My Team Api List</q-item-section>
                      </q-item>

                      <q-separator />
                    </q-list>
                  </q-menu>
                </div>
                : ''
            }

            <div class={'q-ml-md cursor-pointer non-selectable'}>
            Settings
              <q-menu>
                <q-list
                  dense
                  style={{ 'min-width': '100px' }}
                >
                  <q-item
                    v-close-popup
                    clickable
                    to={'/electron'}
                  >
                    <q-item-section>Remote Server URL</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>

            <div class={'q-ml-md cursor-pointer non-selectable'}>
              About
              <q-menu>
                <q-list
                  dense
                  style={{ 'min-width': '100px' }}
                >
                  <q-item
                    v-close-popup
                    clickable
                    to={'/about'}
                  >
                    <q-item-section>About</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
        </q-header>
      )
    }
  }
})
