import {
  CREATE_PAGE_FAILURE,
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_SUCCESS,
} from './page.types'
import axios from '../../helpers/axios'

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_PAGE_REQUEST })
    try {
      const res = await axios.post('/page/create', form)
      if (res.status === 201) {
        dispatch({
          type: CREATE_PAGE_SUCCESS,
          payload: { page: res.data.page },
        })
      } else {
        dispatch({
          type: CREATE_PAGE_FAILURE,
          payload: res.data.error,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
