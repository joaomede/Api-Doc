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
      if (this.$store.getters.getVersion !== null) {
        return this.$store.getters.getVersion
      } else {
        return 'v1.0.0'
      }
    }
  }
}
