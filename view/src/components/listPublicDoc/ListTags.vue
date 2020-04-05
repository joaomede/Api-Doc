<template>
  <div>
    <q-expansion-item
      expand-separator
      :label="tags.nameTag"
      header-class="text-black text-left"
      @show="getPathAndResponses(tags.id, indexTags)"
    >
      <q-item>
        <q-item-section>
          <q-item-label lines="5">
            <div
              class="text-p text-left"
            >
              <strong>Tag:</strong> {{ tags.nameTag }}
            </div>
            <div
              class="text-p text-left"
            >
              <strong>Descrição da Tag:</strong> {{ tags.descriptionTag }}
            </div>
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
import ListPaths from '../listPublicDoc/ListPaths'
export default {
  components: {
    ListPaths
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
    }
  },
  methods: {
    dispatchs () {
      this.$store.dispatch('setTag', this.tags)
      this.$store.dispatch('setTagIndex', this.indexTags)
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
