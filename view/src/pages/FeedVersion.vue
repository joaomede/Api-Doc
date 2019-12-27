<template>
  <div class="centralDiv text-center">
    <div v-if="user">
      <q-list
        v-for="item in listaFeedVersion"
        :key="item.idDaPostagem"
        color="secondary"
      >
        <q-card v-if="item.novo">
          <div class="text-h6">
            <q-icon
              class="text-orange"
              style="font-size: 1.2em"
              name="new_releases"
            />
            {{ item.dataVersao }}
            <q-icon
              class="text-orange"
              style="font-size: 1.2em"
              name="today"
            />
          </div>
          <q-badge
            color="orange"
            text-color="black"
            :label="item.tituloPostagem"
          />
          <q-separator />
          <div
            class="q-ma-md"
            v-html="item.conteudoPostagem"
          />
        </q-card>

        <q-card v-if="!item.novo">
          <div class="text-h6">
            <q-icon
              style="font-size: 1.3em"
              class="text-blue"
              name="today"
            />
            {{ item.dataVersao }}
          </div>
          <q-badge
            align="top"
            color="blue"
          >
            {{ item.tituloPostagem }}
          </q-badge>
          <q-separator />
          <div
            class="q-ma-md"
            v-html="item.conteudoPostagem"
          />
        </q-card>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      qtdLimite: 80,
      listaFeedVersion: []
    }
  },
  computed: {
  },
  watch: {
    qtdLimite: 'lerFeed'
  },
  created () {
    this.lerFeed()
  },
  methods: {
    async lerFeed () {
      const pathFeed = await this.$db
        .collection('app')
        .doc(this.feedID)
        .collection('feed')
        .orderBy('horaPostagem', 'desc')
        .where('visivel', '==', true)
        .limit(this.qtdLimite)
        .get()
      try {
        this.listaFeedVersion = []
        for (const feed of pathFeed.docs) {
          this.listaFeedVersion.push(feed.data())
        }
      } catch (error) {
        this.$notify('Error, problemas ao verificar o feed de versões')
      }
    }
  }
}
</script>
