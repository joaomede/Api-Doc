export default {
  methods: {
    /**
     * Path Test: method to test a endpoint
     *
     * @param {*} object Object: Header and Payload
     * @param {*} indexTag Index of Tag
     * @param {*} indexPath Index of Path
     */
    async pathTest (object, indexTag, indexPath) {
      this.$store.dispatch('setTagIndex', indexTag)
      this.$store.dispatch('setPathIndex', indexPath)
      const params = this.forParams(object.parameter.params)
      const querys = this.forQuerys(object.query.querys)
      const path = `${this.cApi.baseURL}/${object.path}${params}${querys}`
      switch (object.methodType) {
        case 'DELETE':
          await this.methodWithoutPayload(object, path, 'delete')
          break
        case 'GET':
          await this.methodWithoutPayload(object, path, 'get')
          break
        case 'PUT':
          await this.methodWithPayload(object, path, 'put')
          break
        case 'POST':
          await this.methodWithPayload(object, path, 'post')
          break
      }
    },
    /**
     * Get a Params path
     *
     * @param {*} param params
     * @returns string
     */
    forParams (param) {
      let params = ''
      for (let index = 0; index < param.length; index++) {
        params = `${params}/${param[index].parameterValue}`
      }
      return params
    },
    /**
     * Get a query string
     *
     * @param {*} query querys
     * @returns string
     */
    forQuerys (query) {
      let querys = ''
      if (query.length > 0) {
        querys = '?'
      }

      for (let index = 0; index < query.length; index++) {
        querys = `${querys}${query[index].queryName}=${query[index].queryValue}&`
        if (index + 1 === query.length) {
          querys = querys.slice(0, -1)
        }
      }
      return querys
    },
    /**
     * Abstract method post or put
     *
     * @param {*} o Contains Headers Value and BodyValue
     * @param {*} path Path
     * @param {*} method Method: POST or PUT
     */
    async methodWithPayload (o, path, method) {
      try {
        const result = await this.$axios[method](path, o.bodyValue, { headers: o.headersValue })
        this.$store.dispatch('setResponseTest', result)
      } catch (error) {
        this.$store.dispatch('setResponseTest', error.response)
      }
    },
    /**
     * Abstract method delete or get
     *
     * @param {*} o Contains Headers Values
     * @param {*} path Path
     * @param {*} method Method: "DELETE or GET"
     */
    async methodWithoutPayload (o, path, method) {
      try {
        const result = await this.$axios[method](path, { headers: o.headersValue })
        this.$store.dispatch('setResponseTest', result)
      } catch (error) {
        this.$store.dispatch('setResponseTest', error.response)
      }
    }
  }
}
