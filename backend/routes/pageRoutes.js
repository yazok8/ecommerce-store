import express from 'express'
import {
  adminMiddleware,
  requireSignin,
  upload,
} from '../middleware/signinMiddleware.js'
import { createPage, getPage } from '../controllers/admin/pageController.js'

const router = express.Router()

router.post(
  '/page/create',
  requireSignin,
  adminMiddleware,
  upload.fields([{ name: 'banners ' }, { name: 'products' }]),
  createPage
)

router.get('/page/:category/:type', getPage)

export default router
