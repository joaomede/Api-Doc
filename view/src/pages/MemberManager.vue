<template>
  <q-card class="centralDiv">
    <BackMobile />
    <BackDesktop />

    <AddMobile
      @eventClick="dialogAddNewMember = true"
    />
    <AddDesktop
      @eventClick="dialogAddNewMember = true"
    />

    <DialogAddNewMember
      :dialog="dialogAddNewMember"
      @eventClose="dialogAddNewMember = false"
      @save="storeNewMember($event)"
    />

    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteMember"
      @eventClose="dialogConfirmDeleteMember = false"
      @confirm="deleteMember()"
    />

    <div class="text-h6 text-center">
      Lista de Equipes
    </div>

    <q-list
      bordered
      style="width:100%"
    >
      <q-item
        v-for="item in listAllMembers"
        :key="item.idApi"
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
            class="fas fa-user text-black"
            style="font-size: 3em;"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="5">
            {{ item.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            name="delete_sweep"
            color="primary"
            @click.stop="dialogConfirmDeleteMember = true, team = item"
          />
        </q-item-section>

        <q-separator spaced />
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import DialogAddNewMember from '../components/dialog/addDialog/DialogAddNewMember'
import DialogConfirmDelete from '../components/dialog/DialogConfirmDelete'

import BackMobile from '../components/fab/FabBtnBackMobile'
import BackDesktop from '../components/fab/FabBtnBackDesktop'
import AddMobile from '../components/fab/FabBtnAddMobile'
import AddDesktop from '../components/fab/FabBtnAddDesktop'

export default {
  name: 'PrivateList',
  components: {
    DialogAddNewMember,
    DialogConfirmDelete,
    BackMobile,
    BackDesktop,
    AddMobile,
    AddDesktop
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      listAllMembers: [],
      dialogConfirmDeleteMember: false,
      dialogAddNewMember: false,
      team: {
        teamIdFk: '',
        userIdFk: ''
      }
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.indexAllMembers()
    },
    async storeNewMember (member) {
      try {
        const result = await this.$axios.post('api/team/addmember', {
          teamIdFk: this.id,
          email: member.email
        }, { headers: this.cUser.headers })
        this.indexAllMembers()
        this.dialogAddNewMember = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.dialogAddNewMember = false
        this.$notify(error.response.data.error, 'red')
      }
    },
    async indexAllMembers () {
      try {
        const result = await this.$axios.get(`api/team/listallmembers/${this.id}`, { headers: this.cUser.headers })
        this.listAllMembers = await result.data
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async deleteMember () {
      try {
        const result = await this.$axios.delete(`api/team/deletemember/${this.team.id}`, { headers: this.cUser.headers })
        this.indexAllMembers()
        this.dialogConfirmDeleteMember = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.dialogConfirmDeleteMember = false
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
