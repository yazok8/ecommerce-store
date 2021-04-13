import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILURE,
  LOGOUT_REQUEST_SUCCESS,
} from '../actions/auth/auth.types'

const initState = {
  token: null,
  user: {
    name: '',
    email: '',
    picture: '',
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: '',
}

export const authReducer = (state = initState, action) => {
  console.log(action)
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, authenticating: true }

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticate: true,
        authenticating: false,
      }

    case LOGIN_REQUEST_FAIL:
      return { error: 'Invalid email or password' }

    case LOGOUT_REQUEST:
      return { ...state, loading: true }

    case LOGOUT_REQUEST_SUCCESS:
      return { ...initState }

    case LOGOUT_REQUEST_FAILURE:
      return { ...state, error: action.payload.error, loading: false }

    default:
      return state
  }
}
