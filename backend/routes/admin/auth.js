import express from 'express'

import { signinUser, registerUser } from '../../controllers/admin/auth.js'

const router = express.Router()

router.post('/admin/signin', signinUser)

router.post('/admin/signup', registerUser)

export default router
