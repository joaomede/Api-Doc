export default {
  computed: {
    user () {
      if (this.$store.getters.getUser != null) {
        return this.$store.getters.getUser
      } else {
        return { id: null,
          email: 'email@email.com',
          name: 'Nothing',
          headers: {
            auth: 'nothing nothing'
          }
        }
      }
    },
    version () {
      return this.$store.getters.getVersion
    },
    versionCloud () {
      return this.$store.getters.getVersionCloud
    },
    feedID () {
      if (this.$store.getters.getAppFeedID != null) {
        return this.$store.getters.getAppFeedID
      } else {
        return null
      }
    }
  }
}
