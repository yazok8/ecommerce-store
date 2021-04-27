import { combineReducers } from 'redux'
import { authReducer } from './auth.reducer'
import userReducer from './user.reducer'
import { productReducer } from './product.reducer'
// import orderReducer from './order.reducer'
import { categoryReducer } from './categoriy.reducer'

export default combineReducers({
  auth: authReducer,
  userRegister: userReducer,
  category: categoryReducer,
  // order: orderReducer,
  product: productReducer,
})
