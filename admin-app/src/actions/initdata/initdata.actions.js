import axios from '../../helpers/axios'
import { GET_ALL_PRODUCTS_SUCCESS } from '../product/product.types'
import { GET_ALL_CATEGORIES_SUCCESS } from '../category/catergory.types'

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post('/initialdata')

    if (res.status === 200) {
      const { categories, products } = res.data

      dispatch({
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      })
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      })
    }
    console.log(res)
  }
}
