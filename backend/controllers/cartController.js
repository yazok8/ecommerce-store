import e from 'express'
import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

export const addCartItems = asyncHandler(async (req, res, next) => {
  Cart.findOne({
    user: req.user._id,
  }).exec((error, cart) => {
    if (error) return res.status(400).json({ error })
    if (cart) {
      //if cart exists, update cart quantity

      const product = req.body.cartItems.product
      const item = cart.cartItems.find((c) => c.product == product)

      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, 'cartItems.product': product },
          {
            $set: {
              cartItems: {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          },
          { new: true }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error })
          if (_cart) {
            return res.status(201).json({ cart: _cart })
          }
        })
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          },
          { new: true }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ error })
          if (_cart) {
            return res.status(201).json({ cart: _cart })
          }
        })
      }

      // res.status(200).json({ message: cart })
    } else {
      //if cart doesn't exist then create new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      })
      cart.save((err, cart) => {
        if (err) return res.status(400).json({ err })
        if (cart) {
          return res.status(201).json({ cart })
        }
      })
    }
  })
})

//   if (req.body.parentId) {
//     categoryObj.parentId = req.body.parentId
//   }

//   const cat = new Category(categoryObj)
//   cat.save((error, category) => {
//     if (error) return res.status(400).json({ error })
//     if (category) {
//       return res.status(201).json({ category })
//     }
//   })
