import axios from '../../helpers/axios'
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILURE,
} from './auth.types'

export const login = (user) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  })

  const config = {
    Headers: {
      'content-type': 'application/json',
    },
  }

  const res = await axios.post('/admin/signin', {
    ...user,
    config,
  })

  if (res.status === 200) {
    const { token, user } = res.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    dispatch({
      type: LOGIN_REQUEST_SUCCESS,
      payload: token,
      user,
    })
  } else {
    if (res === 400) {
      dispatch({
        type: LOGIN_REQUEST_FAIL,
        payload: { error: res.data.error },
      })
    }
  }
}

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch({
        type: LOGIN_REQUEST_SUCCESS,
        payload: {
          token,
          user,
        },
      })
    } else {
      dispatch({
        type: LOGIN_REQUEST_FAIL,
        payload: { error: 'Failed to login' },
      })
    }
  }
}

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST })
    const res = await axios.post(`/admin/signout`)

    if (res.status === 200) {
      localStorage.clear()
      dispatch({ type: LOGOUT_REQUEST_SUCCESS })
    } else {
      dispatch({
        type: LOGOUT_REQUEST_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
