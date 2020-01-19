export default {
  computed: {
    user () {
      if (this.$store.getters.getUser != null) {
        return this.$store.getters.getUser
      } else {
        return {
          id: null,
          email: 'email@email.com',
          name: 'Nothing',
          headers: {
            auth: 'nothing nothing'
          }
        }
      }
    },
    cVersion () {
      return this.$store.getters.getVersion
    },
    cTypeMethods () {
      return this.$store.getters.getTypeMethods
    },
    cTypeCodes () {
      return this.$store.getters.getTypeCodes
    },
    cApi () {
      return this.$store.getters.getApiData
    },
    cTag () {
      return this.$store.getters.getTag
    },
    cPath () {
      return this.$store.getters.getPath
    },
    cResponse () {
      return this.$store.getters.getResponse
    }
  }
}
