import axios from '../../helpers/axios'
import {
  ADD_NEW_CATEGORY_FAIL,
  ADD_NEW_CATEGORY_REQUEST,
  ADD_NEW_CATEGORY_SUCCESS,
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

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NEW_CATEGORY_REQUEST })

    try {
      const res = await axios.post(`/category/create`, form)
      if (res.status === 201) {
        dispatch({
          type: ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        })
      } else {
        dispatch({
          type: ADD_NEW_CATEGORY_FAIL,
          payload: res.data.error,
        })
      }
    } catch (error) {
      console.log(error.response)
    }
  }
}

export const updateCategories = (form) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/category/update`, form)
      if (res.status === 201) {
        return true
        console.log(res)
      } else {
      }
    } catch (error) {
      console.log(error.response)
    }
  }
}

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    const res = await axios.post(`/category/delete`, {
      payload: { ids },
    })
    if (res.status === 201) {
      return true
    } else {
      return false
    }
  }
}
