import axios from 'axios'
import { Environment } from '../../environments'
import { requestInterceptor } from './interceptors/request_interceptor'

const api = axios.create({
  baseURL: Environment.URL_API_HEROES_LIST,
})

api.interceptors.request.use((request) => requestInterceptor(request))

export { api }
