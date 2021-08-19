import {
  GET_PRODUCTS_BY_SLUG,
  GET_PRODUCT_DETAILS_BY_ID_FAILURE,
  GET_PRODUCT_DETAILS_BY_ID_REQUEST,
  GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
} from '../actions/product/products.types'

const initialState = {
  products: [],
  productsByPrice: {
    under30: [],
    under40: [],
    under50: [],
  },
  error: null,
  productDetails: {},
  loading: false,
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
    case GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      }

    case GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }

    default:
      return state
  }
}
