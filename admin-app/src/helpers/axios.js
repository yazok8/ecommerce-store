import axios from 'axios'
import { api } from '../urlConfig'

const token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: api,
  header: {
    'Accept-Version': 1,
    ' Authorization': token ? `Bearer ${token}` : '',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export default axiosInstance
