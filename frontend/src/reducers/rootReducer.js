import { combineReducers } from 'redux'

import { productListReducer, productDetailsReducer } from './shopReducer'
import { cartReducer } from './cartReducer'
import directoryReducer from './directoryReducer'

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  directory: directoryReducer,
  cart: cartReducer,
})
