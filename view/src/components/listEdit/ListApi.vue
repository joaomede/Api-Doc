<template>
  <div
    class="centralDiv"
  >
    <q-card
      class="text-center my-card"
      style="max-width: 100%; background-color: #fff9f0"
    >
      <q-card-section>
        <q-item class="text-left">
          <q-item-section>
            <q-checkbox
              v-model="pathEditOption"
              color="secondary"
              label="Edição desabilitada"
            />
            <q-input
              v-if="pathEditOption === false"
              v-model="cApi.apiName"
              class="text-white q-ma-xs"
              square
              dense
              label="Api Name:"
              outlined
              :disable="pathEditOption"
            />
            <q-input
              v-if="pathEditOption === false"
              v-model="cApi.descriptionApi"
              class="text-white q-ma-xs"
              square
              dense
              label="Descrição:"
              outlined
              :disable="pathEditOption"
            />
            <q-input
              v-if="pathEditOption === false"
              v-model="cApi.version"
              class="text-white q-ma-xs"
              square
              dense
              label="Version API:"
              outlined
              :disable="pathEditOption"
            />
            <q-checkbox
              v-if="pathEditOption === false"
              v-model="cApi.isPublic"
              color="secondary"
              label="Public?"
            />
            <q-input
              v-if="pathEditOption === false"
              v-model="cApi.email"
              class="text-white q-ma-xs"
              square
              dense
              label="E-Mail:"
              outlined
              :disable="pathEditOption"
            />
            <q-input
              v-if="pathEditOption === false"
              v-model="cApi.license"
              class="text-white q-ma-xs"
              square
              dense
              label="License:"
              outlined
              :disable="pathEditOption"
            />
            <q-input
              v-if="pathEditOption === false"
              v-model="cApi.baseURL"
              class="text-white q-ma-xs"
              square
              dense
              label="Base URL:"
              outlined
              :disable="pathEditOption"
            />
            <div v-if="pathEditOption === true">
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
              name="save"
              color="primary"
              @click.stop="updateApi(cApi)"
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

        <q-item-section side>
          <q-icon
            class="text-right"
            side
            name="add"
            color="primary"
            @click.stop="storeNewTag()"
          />
        </q-item-section>
      </q-item>

      <!-- vfor Tags -->
      <q-card
        v-for="(tags, indexTags) in cApi.tags"
        :key="tags.id"
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
  </div>
</template>

<script>
import ListTags from '../listEdit/ListTags'

export default {
  components: {
    ListTags
  },
  data () {
    return {
      dialogAddNewTags: false,
      dialogUpdateApi: false,
      pathEditOption: true,

      newTag: {
        nameTag: 'Default',
        descriptionTag: 'Default'
      }
    }
  },
  methods: {
    async updateApi (api) {
      try {
        const result = await this.$axios.put(`api/api/update/${api.id}`, api, { headers: this.cUser.headers })
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async storeNewTag () {
      try {
        const result = await this.$axios.post(`api/tags/create/${this.cApi.id}`, this.newTag, { headers: this.cUser.headers })
        this.$store.dispatch('setNewTag', result.data)
        this.$notify(await result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
