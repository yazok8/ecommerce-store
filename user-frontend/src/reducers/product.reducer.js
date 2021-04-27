import { GET_PRODUCTS_BY_SLUG } from '../actions/product/products.types'

const initialState = {
  product: [],
  productsByPrice: {
    under30: [],
    under40: [],
    under50: [],
  },
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SLUG:
      return {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      }

    default:
      return state
  }
}
