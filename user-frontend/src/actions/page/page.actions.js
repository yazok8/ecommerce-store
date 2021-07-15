import React from 'react'
import axios from '../../helpers/axios'
import {
  GET_PRODUCT_PAGE_SUCCESS,
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCT_PAGE_REQUEST,
} from './page.types'

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params
      const res = await axios.get(`/page/${cid}/${type}`)
      dispatch({ type: GET_PRODUCT_PAGE_REQUEST })
      if (res.status === 200) {
        const { page } = res.data
        dispatch({
          type: GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        })
      } else {
        const { error } = res.data
        dispatch({
          type: GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
