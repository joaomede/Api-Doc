<template>
  <div>
    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteTag"
      @eventClose="dialogConfirmDeleteTag = false"
      @confirm="deleteTag()"
    />

    <q-expansion-item
      expand-separator
      :label="tags.nameTag"
      header-class="text-black text-left"
      @show="getPathAndResponses(tags.id, indexTags)"
    >
      <q-item>
        <q-item-section>
          <q-item-label lines="5">
            <q-icon
              style="font-size: 24px"
              class="text-right"
              side
              name="save"
              color="primary"
              @click.stop="updateTag(tags)"
            />
            <q-icon
              style="font-size: 24px"
              class="text-right"
              side
              name="delete"
              color="primary"
              @click.stop="showDeleteTag()"
            />
          </q-item-label>

          <q-item-section>
            <q-checkbox
              v-model="pathEditOption"
              color="secondary"
              label="Edição desabilitada"
            />
          </q-item-section>

          <q-item-label lines="5">
            <div
              v-if="pathEditOption === true"
              class="text-p text-left"
            >
              <strong>Tag:</strong> {{ tags.nameTag }}
            </div>
            <div
              v-if="pathEditOption === true"
              class="text-p text-left"
            >
              <strong>Descrição da Tag:</strong> {{ tags.descriptionTag }}
            </div>
            <q-input
              v-if="pathEditOption === false"
              v-model="tags.nameTag"
              class="text-white q-ma-xs"
              square
              dense
              label="Tag:"
              outlined
              :disable="pathEditOption"
            />
            <q-input
              v-if="pathEditOption === false"
              v-model="tags.descriptionTag"
              class="text-white q-ma-xs"
              square
              dense
              label="Descrição da Tag:"
              outlined
              :disable="pathEditOption"
            />
          </q-item-label>
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
            :key="indexPath"
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
import DialogConfirmDelete from '../dialog/DialogConfirmDelete'

export default {
  components: {
    ListPaths,
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
      pathEditOption: true,

      newPath: {
        methodType: '',
        pathName: '',
        path: '',
        descriptionVerb: '',
        parameter: {
          params: []
        },
        query: {
          querys: []
        },
        headersValue: {},
        bodyValue: {},
        data: {
          data: []
        }
      }
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setTag', this.tags)
      this.$store.dispatch('setTagIndex', this.indexTags)
    },
    async addNewPath () {
      this.dispatchs()
      try {
        const result = await this.$axios.post(`api/paths/create/${this.cTag.id}`, this.newPath, { headers: this.cUser.headers })
        this.$store.dispatch('setNewPath', result.data)
        this.$notify('Novo verbo criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async updateTag (tag) {
      try {
        const result = await this.$axios.put(`api/tags/update/${tag.id}`, tag, { headers: this.cUser.headers })
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    showDeleteTag () {
      this.dispatchs()
      this.dialogConfirmDeleteTag = true
    },
    async deleteTag () {
      try {
        const result = await this.$axios.delete(`api/tags/delete/${this.cTag.id}`, { headers: this.cUser.headers })
        this.dialogConfirmDeleteTag = false
        this.$store.dispatch('removeTag')
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async getPathAndResponses (tagId, index) {
      this.$store.dispatch('setTagIndex', index)
      this.$store.dispatch('setPathsByTagIndex', [tagId, this.$router.currentRoute.name])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
