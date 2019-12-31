<template>
  <div>
    <DialogAddNewPaths
      :dialog="dialogAddNewPaths"
      @eventClose="dialogAddNewPaths = false"
    />

    <DialogUpdateTag
      :dialog="dialogUpdateTag"
      @eventClose="dialogUpdateTag = false"
    />

    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteTag"
      @eventClose="dialogConfirmDeleteTag = false"
      @confirm="deleteTag()"
    />

    <q-expansion-item
      expand-separator
      :label="tags.nameTag"
      header-class="text-black text-left"
      @show="getVerbsAndCodes(tags.id, indexTags)"
    >
      <q-item>
        <q-item-section>
          <q-item-label lines="5">
            <div class="text-p text-left">
              <strong>Tag:</strong> {{ tags.nameTag }}
            </div>
          </q-item-label>
          <q-item-label lines="5">
            <div class="text-p text-left">
              <strong>Descrição da Tag:</strong> {{ tags.descriptionTag }}
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon
            class="text-right"
            side
            name="edit"
            color="primary"
            @click.stop="dialogUshowEditTag()"
          />
        </q-item-section>

        <q-item-section side>
          <q-icon
            class="text-right"
            side
            name="delete"
            color="primary"
            @click.stop="showDeleteTag()"
          />
        </q-item-section>
      </q-item>
      <q-separator spaced />

      <q-card style="background-color: #fff9f0">
        <q-card-section class="q-pa-xs">
          <q-item>
            <q-item-section>
              <div class="text-h6">
                <strong>Paths relacionados a tag:</strong> {{ tags.nameTag }}
              </div>
            </q-item-section>
            <q-item-section side>
              <q-icon
                class="text-right"
                side
                name="add"
                color="primary"
                @click.stop="addNewPath()"
              />
            </q-item-section>
          </q-item>

          <q-card
            v-for="(paths, indexPath) in tags.paths"
            :key="paths.id"
          >
            <ListPaths
              :paths="paths"
              :index-tags="indexTags"
              :index-path="indexPath"
            />
          </q-card>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import ListPaths from '../listEdit/ListPaths'
import DialogAddNewPaths from '../dialog/addDialog/DialogAddNewPaths'
import DialogUpdateTag from '../dialog/updateDialog/DialogUpdateTags'
import DialogConfirmDelete from '../dialog/DialogConfirmDelete'

export default {
  components: {
    ListPaths,
    DialogAddNewPaths,
    DialogUpdateTag,
    DialogConfirmDelete
  },
  props: {
    tags: {
      type: Object,
      default: function () {
        return {}
      }
    },
    indexTags: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dialogConfirmDeleteTag: false,
      dialogUpdateTag: false,
      dialogAddNewPaths: false
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setTag', this.tags)
      this.$store.dispatch('setTagIndex', this.indexTags)
    },
    addNewPath () {
      this.dispatchs()
      this.dialogAddNewPaths = true
    },
    showEditTag () {
      this.dispatchs()
      this.dialogUpdateTag = true
    },
    showDeleteTag () {
      this.dispatchs()
      this.dialogConfirmDeleteTag = true
    },
    async deleteTag () {
      try {
        const result = await this.$axios.delete(`api/tags/delete/${this.cTag.id}`, { headers: this.user.headers })
        this.dialogConfirmDeleteTag = false
        this.$store.dispatch('removeTag')
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async getVerbsAndCodes (tagId, index) {
      this.$store.dispatch('setTagIndex', index)
      try {
        const result = await this.$axios.get(`api/api/getverbsandcodes/${tagId}`, { headers: this.user.headers })
        this.$store.dispatch('setPathsByTagIndex', await result.data)
      } catch (error) {
        if (error.response.data.error !== 'Não há verbos disponíveis') {
          this.$notify(error.response.data.error, 'red')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
