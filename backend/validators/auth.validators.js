import { check, validationResult } from 'express-validator'
import asyncHandler from 'express-async-handler'
import express from 'express'

const app = express()

app.use(express.json())

export const validateSignupRequest = [
  check('name').notEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('valid email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 charecters long'),
]

export const validateSigninRequest = [
  check('email').isEmail().withMessage('valid email is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 charecters long'),
]

export const isRequestValidated = async (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg })
  }
  console.log(errors)
  next()
}
