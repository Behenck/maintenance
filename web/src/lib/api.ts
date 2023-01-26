import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://intranet.santacasa.com.br:3333',
})
