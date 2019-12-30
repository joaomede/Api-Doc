export default {
  methods: {
    async pathTest (object, indexTag, indexPath) {
      const o = object
      const iT = indexTag
      const iP = indexPath
      let params = ''
      let path = ''
      forParams(object.parameter.params)
      path = this.apiData.baseURL + '/' + o.path + params

      switch (o.verbType) {
        case 'DELETE':
          await this.deleteMethod(o, path, iT, iP)
          break
        case 'GET':
          await this.getMethod(o, path, iT, iP)
          break
        case 'PUT':
          await this.putMethod(o, path, iT, iP)
          break
        case 'POST':
          await this.postMethod(o, path, iT, iP)
          break
      }

      function forParams (param) {
        for (let index = 0; index < param.length; index++) {
          params = `${params}/${param[index].parameterValue}`
        }
      }
    },
    async postMethod (o, path, iT, iP) {
      try {
        const result = await this.$axios.post(path, o.bodyValue, o.headersValue)
        this.$set(this.apiData.tags[iT].paths[iP], 'response', result)
      } catch (error) {
        this.$set(this.apiData.tags[iT].paths[iP], 'response', error.response)
      }
    },
    async getMethod (o, path, iT, iP) {
      try {
        const result = await this.$axios.get(path, { headers: o.headersValue })
        this.$set(this.apiData.tags[iT].paths[iP], 'response', result)
      } catch (error) {
        this.$set(this.apiData.tags[iT].paths[iP], 'response', error.response)
      }
    },
    async putMethod (o, path, iT, iP) {
      try {
        const result = await this.$axios.get(path, o.bodyValue, { headers: o.headersValue })
        this.$set(this.apiData.tags[iT].paths[iP], 'response', result)
      } catch (error) {
        this.$set(this.apiData.tags[iT].paths[iP], 'response', error.response)
      }
    },
    async deleteMethod (o, path, iT, iP) {
      try {
        const result = await this.$axios.get(path, { headers: o.headersValue })
        this.$set(this.apiData.tags[iT].paths[iP], 'response', result)
      } catch (error) {
        this.$set(this.apiData.tags[iT].paths[iP], 'response', error.response)
      }
    }
  }
}
