import React from 'react'
import {
  CREATE_PAGE_FAILURE,
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_SUCCESS,
} from '../actions/page/page.types'

const initState = {
  error: null,
  loading: false,
  page: {},
}

const pageReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case CREATE_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default pageReducer
