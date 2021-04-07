import express from 'express'
import {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} from '../validators/auth.validators.js'
import { check, validationResult } from 'express-validator'
import User from '../models/userModel.js'

import { signinUser, registerUser } from '../controllers/authController.js'
import { requireSignin } from '../middleware/signinMiddleware.js'

const router = express.Router()

router.post('/signin', validateSigninRequest, isRequestValidated, signinUser)

router.post('/signup', validateSignupRequest, isRequestValidated, registerUser)

// router.post('/profile', requireSignin, (req, res) => {
//   res.status(200).json({ user: 'profile' })
// })

export default router
