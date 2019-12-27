import axios from 'axios'
import Vue from 'vue'

const urlAPI = process.env.APIURL

Vue.use({
  install (Vue) {
    Vue.prototype.$axios = axios.create({
      baseURL: urlAPI
    })
  }
})

export const http = axios.create({
  baseURL: urlAPI
})
