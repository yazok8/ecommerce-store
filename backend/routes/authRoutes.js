import express from 'express'
import slugify from 'slugify'
import User from '../models/userModel.js'

import { signinUser, registerUser } from '../controllers/authController.js'
import { requireSignin } from '../controllers/authController.js'

const router = express.Router()

router.post('/signin', signinUser)

router.post('/signup', registerUser)

// router.post('/profile', requireSignin, (req, res) => {
//   res.status(200).json({ user: 'profile' })
// })

export default router
