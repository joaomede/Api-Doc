<template>
  <div>
    <DialogAddNewTags
      :dialog="dialogAddNewTags"
      @eventClose="dialogAddNewTags = false"
    />

    <DialogUpdateApi
      :dialog="dialogUpdateApi"
      @eventClose="dialogUpdateApi = false"
    />

    <div
      class="centralDiv"
    >
      <q-card
        class="text-center my-card"
        style="max-width: 100%; background-color: #fff9f0"
      >
        <q-card-section>
          <q-item>
            <q-item-section>
              <div class="text-h5">
                <strong>API:</strong> {{ cApi.apiName }}
              </div>
              <div class="text-h6">
                <strong>Versão:</strong> {{ cApi.version }}
              </div>
              <div
                v-if="cApi.isPublic"
                class="text-h6"
              >
                <strong>Documentação Pública</strong>
              </div>
              <div
                v-if="!cApi.isPublic"
                class="text-p"
              >
                <strong>Documentação Privada</strong>
              </div>

              <div class="text-p">
                <strong>E-mail:</strong> {{ cApi.email }}
              </div>

              <div class="text-h6">
                <strong>Licença:</strong> {{ cApi.license }}
              </div>

              <div class="text-h6">
                <strong>Base URL:</strong> {{ cApi.baseURL }}
              </div>

              <div class="text-p">
                <strong>Descrição:</strong> {{ cApi.descriptionApi }}
              </div>
            </q-item-section>

            <q-item-section side>
              <q-icon
                class="text-right"
                side
                name="edit"
                color="primary"
                @click.stop="showEditApi()"
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
              @click.stop="dialogAddNewTags = true"
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
  </div>
</template>

<script>
import DialogAddNewTags from '../dialog/addDialog/DialogAddNewTags'
import DialogUpdateApi from '../dialog/updateDialog/DialogUpdateApi'
import ListTags from '../listEdit/ListTags'

export default {
  components: {
    DialogAddNewTags,
    DialogUpdateApi,
    ListTags
  },
  data () {
    return {
      dialogAddNewTags: false,
      dialogUpdateApi: false
    }
  },
  methods: {
    showEditApi () {
      this.dialogUpdateApi = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
