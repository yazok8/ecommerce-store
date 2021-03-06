import { combineReducers } from 'redux'
import { categoryReducer } from './categoriy.reducer'
import { pageReducer } from './page.reducer'
import { productReducer } from './product.reducer'
import { authReducer } from './auth.reducer'
import { cartReducer } from './cart.reducer'

export default combineReducers({
  category: categoryReducer,
  product: productReducer,
  productPage: pageReducer,
  auth: authReducer,
  cart: cartReducer,
})
