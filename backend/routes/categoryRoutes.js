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

import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

const router = express.Router()

router.post(
  '/create',
  requireSignin,
  adminMiddleware,
  upload.single('categoryPicture'),
  addCategory
)

router.get('/getcategory', getCategories)
export default router
