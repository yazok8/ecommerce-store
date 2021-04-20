import { GET_ALL_PRODUCTS_SUCCESS } from '../actions/product/product.types'

const initialState = {
  products: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
      }
    default:
      return state
  }
}
