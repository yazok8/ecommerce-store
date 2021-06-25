import { combineReducers } from 'redux'
import { categoryReducer } from './categoriy.reducer'
import { pageReducer } from './page.reducer'
import { productReducer } from './product.reducer'

export default combineReducers({
  category: categoryReducer,
  product: productReducer,
  productPage: pageReducer,
})
