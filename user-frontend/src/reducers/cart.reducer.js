import React from 'react'
import { ADD_TO_CART_REQUEST } from '../actions/cart/cart.types'

const initialState = {
  cartItems: {
    // 123: {
    //   _id: 123,
    //   name: 'TPE Yoga Mat',
    //   img: 'some.jpg',
    //   price: 200,
    //   qty: 1,
    // },
  },
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      }
    default:
      return state
  }
}

export default cartReducer
