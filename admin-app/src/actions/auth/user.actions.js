import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './auth.types'
import axios from '../../helpers/axios'

export const signup = (user) => async (dispatch) => {
  console.log(user)

  dispatch({
    type: USER_REGISTER_REQUEST,
  })
  const res = await axios.post('/admin/signup', {
    ...user,
  })

  if (res.status === 200) {
    const { message } = res.data
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: [message],
    })
  }

  // const config = {
  //   Headers: {
  //     'content-type': 'application/json',
  //   },
  // }
  else {
    if (res === 400) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
