<template>
  <q-card class="centralDiv">
    <FabButton
      color="orange darken-2"
      position="left"
      icon="fas fa-arrow-left"
      @eventClick="$router.go(-1)"
    />

    <FabButton
      color="orange darken-2"
      position="right"
      icon="add"
      @eventClick="dialogAddTeam = true"
    />

    <DialogAddTeam
      :dialog="dialogAddTeam"
      @eventClose="dialogAddTeam = false"
      @save="storeNewTeam($event)"
    />

    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteTeam"
      @eventClose="dialogConfirmDeleteTeam = false"
      @eventConfirm="deleteMyTeam()"
    />

    <div class="text-h6 text-center">
      Lista de Equipes
    </div>

    <q-list
      v-for="(item, index) in listAllTeams"
      :key="index"
      style="width:100%"
    >
      <q-separator />

      <q-item
        v-ripple
        clickable
        style="font-size: 18px;"
        @click="toEditMembers(item)"
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
          <q-item-label lines="5">
            {{ item.teamName }}
          </q-item-label>

          <q-item-label caption>
            {{ item.descriptionApi }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            name="delete_sweep"
            color="primary"
            @click.stop="dialogConfirmDeleteTeam = true, team = item"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import DialogAddTeam from '../components/dialog/addDialog/DialogAddTeam'

export default {
  name: 'PrivateList',
  components: { DialogAddTeam },
  data () {
    return {
      listAllTeams: [],
      dialogConfirmDeleteTeam: false,
      dialogAddTeam: false,
      team: null
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.indexAllTeamsManager()
    },
    async storeNewTeam (api) {
      try {
        const result = await this.$axios.post('api/team/create', api, { headers: this.cUser.headers })
        this.indexAllTeamsManager()
        this.dialogAddTeam = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async indexAllTeamsManager () {
      try {
        const result = await this.$axios.get('api/team/getall', { headers: this.cUser.headers })
        this.listAllTeams = await result.data
      } catch (error) {
        this.$notify('Erro ao carregar lista de documentação publica', 'red')
      }
    },
    async deleteMyTeam () {
      try {
        const result = await this.$axios.delete(`api/team/delete/${this.team.id}`, { headers: this.cUser.headers })
        this.indexAllTeamsManager()
        this.dialogConfirmDeleteTeam = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.dialogConfirmDeleteTeam = false
        this.$notify(error.response.data.error, 'red')
      }
    },
    toEditMembers (item) {
      this.$router.push({ name: 'MemberManager', params: { id: ('' + item.id) } })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
