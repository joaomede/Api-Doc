export default {
  methods: {
    async pathTest (object, indexTag, indexPath) {
      const o = object
      this.$store.dispatch('setTagIndex', indexTag)
      this.$store.dispatch('setPathIndex', indexPath)
      let params = ''
      let path = ''
      forParams(object.parameter.params)
      path = this.cApi.baseURL + '/' + o.path + params
      switch (o.verbType) {
        case 'DELETE':
          await this.deleteMethod(o, path)
          break
        case 'GET':
          await this.getMethod(o, path)
          break
        case 'PUT':
          await this.putMethod(o, path)
          break
        case 'POST':
          await this.postMethod(o, path)
          break
      }

      function forParams (param) {
        for (let index = 0; index < param.length; index++) {
          params = `${params}/${param[index].parameterValue}`
        }
      }
    },
    async postMethod (o, path) {
      try {
        const result = await this.$axios.post(path, o.bodyValue, { headers: o.headersValue })
        this.$store.dispatch('setResponseTest', result)
      } catch (error) {
        this.$store.dispatch('setResponseTest', error.response)
      }
    },
    async getMethod (o, path) {
      try {
        const result = await this.$axios.get(path, { headers: o.headersValue })
        this.$store.dispatch('setResponseTest', result)
      } catch (error) {
        this.$store.dispatch('setResponseTest', error.response)
      }
    },
    async putMethod (o, path) {
      try {
        const result = await this.$axios.get(path, o.bodyValue, { headers: o.headersValue })
        this.$store.dispatch('setResponseTest', result)
      } catch (error) {
        this.$store.dispatch('setResponseTest', error.response)
      }
    },
    async deleteMethod (o, path) {
      try {
        const result = await this.$axios.get(path, { headers: o.headersValue })
        this.$store.dispatch('setResponseTest', result)
      } catch (error) {
        this.$store.dispatch('setResponseTest', error.response)
      }
    }
  }
}
