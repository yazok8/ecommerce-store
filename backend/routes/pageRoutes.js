import express from 'express'
import {
  adminMiddleware,
  requireSignin,
  upload,
} from '../middleware/signinMiddleware.js'
import { createPage } from '../controllers/admin/pageController.js'

const router = express.Router()

router.post(
  '/page/create',
  requireSignin,
  adminMiddleware,
  upload.fields([{ name: 'banners' }, { name: 'products' }]),
  createPage
)

export default router
