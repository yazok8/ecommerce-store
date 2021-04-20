import express from 'express'
import { initialData } from '../../controllers/admin/initData.js'

const router = express.Router()

router.post('/initialdata', initialData)

export default router
