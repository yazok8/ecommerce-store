import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../actions/auth/auth.types'

const initState = {
  error: null,
  message: '',
  loading: false,
}

const userReducer = (state = initState, action) => {
  console.log(action)
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true }

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      }
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }

    default:
      return state
  }
}

export default userReducer
