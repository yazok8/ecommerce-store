import axios from '../../helpers/axios'
import {
  GET_PRODUCTS_BY_SLUG,
  GET_PRODUCT_DETAILS_BY_ID_FAILURE,
  GET_PRODUCT_DETAILS_BY_ID_REQUEST,
  GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
} from './products.types'

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/shop/${slug}`)
    console.log(res)
    if (res.status === 200) {
      console.log(res.data)
      dispatch({
        type: GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      })
    } else {
      // dispatch({
      //   type: GET_ALL_PRODUCTS_FAIL,
      //   payload: { error: res.data.error },
      // })
    }
  }
}

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_DETAILS_BY_ID_REQUEST })
    let res
    try {
      const { productId } = payload.params
      res = await axios.get(`/shop/${productId}/p`)
      console.log(res)
      dispatch({
        type: GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
