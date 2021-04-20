import { combineReducers } from 'redux'

import { productListReducer, productDetailsReducer } from './shopReducer'
import { cartReducer } from './cartReducer'
import { authReducer } from './auth.reducer'
import userReducer from './user.reducer'
import { productReducer } from './product.reducer'
import orderReducer from './order.reducer'
import { categoryReducer } from './categoriy.reducer'

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  auth: authReducer,
  userRegister: userReducer,
  category: categoryReducer,
  // order: orderReducer,
  product: productReducer,
})
