<template>
  <div class="centralDiv q-pa-xs text-center">
    <BackMobile />
    <BackDesktop />

    <DialogConfirmDelete
      :dialog="dialogconfirmExitTeam"
      @eventClose="dialogconfirmExitTeam = false"
      @confirm="exitTeam()"
    />

    <q-card class="my-card text-center">
      <q-list
        bordered
        style="max-width: 900px; margin: auto;"
      >
        <div class="text-h6">
          Times que faço parte
        </div>
        <q-separator spaced />
        <q-item
          v-for="(item, index) in listAllTeamsAm"
          :key="index"
          v-ripple
          clickable
          style="font-size: 18px;"
          @click="toDocView(item)"
        >
          <q-item-section
            avatar
            top
          >
            <i
              class="fas fa-users text-black"
              style="font-size: 3em;"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ item.teamName }}
            </q-item-label>

            <q-item-label>
              Doc: {{ item.apiName }}
            </q-item-label>

            <q-item-label caption>
              Manager: {{ item.name }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              name="fas fa-sign-out-alt"
              color="primary"
              @click.stop="dialogconfirmExitTeam = true, rules = item"
            />
          </q-item-section>

          <q-separator spaced />
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import DialogConfirmDelete from '../components/dialog/DialogConfirmDelete'

import BackMobile from '../components/fab/FabBtnBackMobile'
import BackDesktop from '../components/fab/FabBtnBackDesktop'

export default {
  name: 'PrivateList',
  components: {
    DialogConfirmDelete,
    BackMobile,
    BackDesktop
  },
  data () {
    return {
      listAllTeamsAm: [],
      dialogconfirmExitTeam: false,
      dialogAddTeam: false,
      rules: null
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.indexAllTeamsIAm()
    },
    async indexAllTeamsIAm () {
      try {
        const result = await this.$axios.get('api/teamdocs/listall/', { headers: this.cUser.headers })
        this.listAllTeamsAm = await result.data
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async exitTeam () {
      try {
        const result = await this.$axios.delete(`api/teamdocs/delete/${this.rules.id}`, { headers: this.cUser.headers })
        this.indexAllTeamsIAm()
        this.dialogconfirmExitTeam = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.dialogconfirmExitTeam = false
        this.$notify(error.response.data.error, 'red')
      }
    },
    toDocView (item) {
      this.$router.push({ name: 'DocViewTeam', params: { id: ('' + item.id) } })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
