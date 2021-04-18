import axios from '../../helpers/axios'

import { ADD_NEW_PRODUCT_REQUEST } from './product.types'

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NEW_PRODUCT_REQUEST })
    const res = await axios.post(`shop/create`, form)

    console.log(res)
    // if (res.status === 201) {
    //   dispatch({
    //     type: ADD_NEW_CATEGORY_SUCCESS,
    //     payload: { category: res.data.category },
    //   })
    // } else {
    //   dispatch({
    //     type: ADD_NEW_CATEGORY_FAIL,
    //     payload: res.data.error,
    //   })
    // }
  }
}
