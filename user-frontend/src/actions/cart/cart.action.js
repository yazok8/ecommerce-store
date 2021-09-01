import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  CART_RESET,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE0,
} from './cart.types'
import store from '../../store'

export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const { cartItems } = store.getState().cart
    // console.log("action::products", cartItems);
    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1

    cartItems[product._id] = {
      ...product,
      qty,
    }

    localStorage.setItem('cart', JSON.stringify(cartItems))
    dispatch({
      type: ADD_TO_CART_REQUEST,
      payload: {
        cartItems,
      },
    })
  }
}

export const updateCart = () => {
  return async (dispatch) => {
    const cartItems = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : null

    if (cartItems) {
      dispatch({
        type: ADD_TO_CART_REQUEST,
        payload: {
          cartItems,
        },
      })
    }
  }
}
