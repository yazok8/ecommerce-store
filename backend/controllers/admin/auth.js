import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import express from 'express'

import User from '../../models/userModel.js'

const registerUser = asyncHandler(async (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({ message: 'Admin is already registered' })

    const { name, email, password } = req.body
    const _user = new User({
      name,
      username: Math.random().toString(),
      email,
      password,
      role: 'admin',
    })
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: 'something went wrong',
        })
      }
      if (data)
        return res.status(201).json({
          message: 'Admin created successfully',
        })
    })
  })
})

const signinUser = asyncHandler(async (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error })
    if (user) {
      if (user.authenticate(req.body.password) && user.role === 'admin') {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          `${process.env.JWT_SECRET}`,
          {
            expiresIn: '30d',
          }
        )
        const { _id, name, email, role, fullName } = user
        res.status(200).json({
          token,
          user: {
            _id,
            name,
            email,
            role,
            fullName,
          },
        })
      } else {
        return res.status(400).json({
          message: 'invalid password',
        })
      }
    } else {
      return res.status(400).json({ message: 'something went wrong ' })
    }
  })
})

const requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const user = jwt.verify(token, process.env.JWT_SECRET)
  req.user = user
  console.log(token)
  next()
  //jwt.decode()
}

export { requireSignin, signinUser, registerUser }
