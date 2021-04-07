import express from 'express'
import { addCartItems } from '../controllers/cartController.js'
import {
  userMiddleware,
  requireSignin,
} from '../middleware/signinMiddleware.js'

const router = express.Router()

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addCartItems)

export default router
