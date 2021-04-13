import express from 'express'

import {
  signinUser,
  registerUser,
  signoutUser,
} from '../../controllers/admin/auth.js'
import {
  isRequestValidated,
  validateSigninRequest,
  validateSignupRequest,
} from '../../validators/auth.validators.js'

import { requireSignin } from '../../middleware/signinMiddleware.js'

const router = express.Router()

router.post('/signin', validateSigninRequest, isRequestValidated, signinUser)

router.post('/signup', validateSignupRequest, isRequestValidated, registerUser)

router.post('/signout', signoutUser)

export default router
