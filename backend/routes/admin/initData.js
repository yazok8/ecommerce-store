import express from 'express'
import { initialData } from '../../controllers/admin/initData.js'
import {
  adminMiddleware,
  requireSignin,
} from '../../middleware/signinMiddleware.js'

const router = express.Router()

router.post('/initialdata', requireSignin, adminMiddleware, initialData)

export default router
