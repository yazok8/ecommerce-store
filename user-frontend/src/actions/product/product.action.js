import axios from '../../helpers/axios'
import { GET_PRODUCTS_BY_SLUG } from './products.types'
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
