import axios from 'axios'
import { api } from '../urlConfig'
import { LOGOUT_REQUEST_SUCCESS } from '../actions/auth/auth.types'
import { ADD_NEW_CATEGORY_SUCCESS } from '../actions/category/catergory.types'
import store from '../store'
import { ADD_NEW_PRODUCT_REQUEST } from '../actions/product/product.types'

const token = window.localStorage.getItem('token')

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
})

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState()
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`
  }
  return req
})

axiosIntance.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    console.log(error.response)
    const status = error.response ? error.response.status : 500
    if (status && status === 500) {
      localStorage.clear()
      store.dispatch({ type: LOGOUT_REQUEST_SUCCESS })
    }
    return Promise.reject(error)
  }
)

axiosIntance.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    const status = error.response ? error.response.status : 401
    if (status && status === 401) {
      localStorage.clear()
      store.dispatch({ type: ADD_NEW_CATEGORY_SUCCESS })
    }
    return error
  }
)

axiosIntance.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    const status = error.response ? error.response.status : 400
    if (status && status === 400) {
      localStorage.clear()
      store.dispatch({ type: ADD_NEW_PRODUCT_REQUEST })
    }
    return error
  }
)

export default axiosIntance
