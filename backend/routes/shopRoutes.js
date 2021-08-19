import express from 'express'
import {
  createProduct,
  getProductDetailsById,
  getProductsBySlug,
} from '../controllers/productContoller.js'
import {
  requireSignin,
  adminMiddleware,
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
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
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

// @desc fetch all shop products...
// @route GET /api/shop...
// @access Public

// router.route('/').get(getProducts)

router.post(
  '/create',
  requireSignin,
  adminMiddleware,
  upload.array('productPicture'),
  createProduct
)

router.get('/:slug', getProductsBySlug)

router.get('/:productId/p', getProductDetailsById)

export default router
