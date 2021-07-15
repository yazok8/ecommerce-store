import {
  GET_PRODUCT_PAGE_FAILURE,
  GET_PRODUCT_PAGE_REQUEST,
  GET_PRODUCT_PAGE_SUCCESS,
} from '../actions/page/page.types'

const initialState = {
  pageRequest: false,
  page: {},
  error: null,
}

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_PAGE_REQUEST:
      return {
        ...state,
        pageReuqest: true,
      }
    case GET_PRODUCT_PAGE_SUCCESS:
      return {
        ...state,
        page: action.payload.page,
        pageReuqest: false,
      }
    case GET_PRODUCT_PAGE_FAILURE:
      return {
        ...state,
        pageReuqest: false,
        error: action.payload.error,
      }

    default:
      return state
  }
}
