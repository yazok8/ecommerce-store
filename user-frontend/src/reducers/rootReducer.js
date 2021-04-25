import { combineReducers } from 'redux'
import { categoryReducer } from './categoriy.reducer'

export default combineReducers({
  category: categoryReducer,
})
