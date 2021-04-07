import express from 'express'

import { signinUser, registerUser } from '../../controllers/admin/auth.js'
import {
  isRequestValidated,
  validateSigninRequest,
  validateSignupRequest,
} from '../../validators/auth.validators.js'

const router = express.Router()

router.post(
  '/admin/signin',
  validateSigninRequest,
  isRequestValidated,
  signinUser
)

router.post(
  '/admin/signup',
  validateSignupRequest,
  isRequestValidated,
  registerUser
)

export default router
