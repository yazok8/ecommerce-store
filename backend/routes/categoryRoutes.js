import express from 'express'
import asyncHandler from 'express-async-handler'

import Category from '../models/categoryModel.js'
import {
  addCategory,
  getCategories,
} from '../controllers/categoryController.js'
import {
  adminMiddleware,
  requireSignin,
} from '../middleware/signinMiddleware.js'

const router = express.Router()

router.post('/create', requireSignin, adminMiddleware, addCategory)

router.get('/getcategory', getCategories)
export default router
