<template>
  <q-card class="centralDiv">
    <FabButton
      color="orange darken-2"
      position="left"
      icon="fas fa-arrow-left"
      @eventClick="$router.go(-1)"
    />

    <DialogConfirmDelete
      :dialog="dialogconfirmExitTeam"
      @eventClose="dialogconfirmExitTeam = false"
      @eventConfirm="exitTeam()"
    />

    <div class="text-h6 text-center">
      Times que faço parte
    </div>

    <q-list
      v-for="(item, index) in listAllTeamsAm"
      :key="index"
      style="width:100%"
    >
      <q-separator />

      <q-item
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
      </q-item>
    </q-list>
  </q-card>
</template>

<script>

export default {
  name: 'PrivateList',
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
