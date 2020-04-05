<template>
  <q-card
    class="text-center my-card"
    style="max-width: 100%; background-color: #fff9f0"
  >
    <SharedEmbed
      v-if="this.$router.currentRoute.name !== 'SharedViewDoc'"
      :dialog="dialogSharedEmbed"
      @eventClose="dialogSharedEmbed = false"
    />
    <q-card-section>
      <q-item class="text-left">
        <q-item-section>
          <div>
            <div class="text-h5">
              <strong>API:</strong> {{ cApi.apiName }}
              <q-badge color="primary">
                {{ cApi.version }}
              </q-badge>
            </div>

            <div class="text-h6">
              <strong>Descrição:</strong> {{ cApi.descriptionApi }}
            </div>

            <div
              v-if="!cApi.isPublic"
              class="text-h6"
              style="font-size: 20px;"
            >
              Private
              <q-icon
                name="fas fa-lock"
                color="red"
              />
            </div>

            <div>
              <div
                v-if="cApi.isPublic"
                class="text-h6"
                style="font-size: 20px;"
              >
                Public
                <q-icon
                  name="fas fa-lock-open"
                  color="green"
                />
              </div>
            </div>

            <div class="text-p">
              <strong>E-mail:</strong> {{ cApi.email }}
            </div>

            <div class="text-p">
              <strong>Licença:</strong> {{ cApi.license }}
            </div>

            <div class="text-p">
              <strong>Base URL:</strong> {{ cApi.baseURL }}
            </div>
          </div>
        </q-item-section>

        <q-item-section side>
          <q-icon
            class="text-right"
            side
            name="shared"
            color="primary"
            @click.stop="dialogSharedEmbed = true"
          />
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-item>
      <q-item-section>
        <div class="text-h6">
          Todas as Tags
        </div>
      </q-item-section>
    </q-item>

    <!-- vfor Tags -->
    <q-card
      v-for="(tags, indexTags) in cApi.tags"
      :key="indexTags"
      bordered
      style="background-color: #f5f7f6"
      class="rounded-borders"
    >
      <ListTags
        :tags="tags"
        :index-tags="indexTags"
      />
    </q-card>
  </q-card>
</template>
<script>
import ListTags from '../listPublicDoc/ListTags'
import SharedEmbed from '../../components/dialog/SharedEmbed'
export default {
  components: {
    ListTags,
    SharedEmbed
  },
  data () {
    return {
      dialogAddNewTags: false,
      dialogUpdateApi: false,
      dialogSharedEmbed: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
