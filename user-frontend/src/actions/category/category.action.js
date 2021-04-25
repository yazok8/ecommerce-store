import axios from '../../helpers/axios'
import {
  GET_ALL_CATEGORIES_FAIL,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
} from './catergory.types'

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST })
    const res = await axios.get(`category/getcategory`)
    console.log(res)
    if (res.status === 200) {
      const { categoryList } = res.data

      dispatch({
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      })
    } else {
      dispatch({
        type: GET_ALL_CATEGORIES_FAIL,
        payload: { error: res.data.error },
      })
    }
  }
}
