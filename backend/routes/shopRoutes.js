import express from 'express'
import {
  createProduct,
  getProductById,
  getProducts,
} from '../controllers/productContoller.js'
import {
  requireSignin,
  adminMiddleware,
} from '../middleware/signinMiddleware.js'

import multer from 'multer'
import { nanoid } from 'nanoid'
import path from 'path'
import { fileURLToPath } from 'url'

const ID = { nanoid }

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

const upload = multer({ storage })

const router = express.Router()

// @desc fetch all shop products...
// @route GET /api/shop...
// @access Public

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.post(
  '/create',
  requireSignin,
  adminMiddleware,
  upload.array('productPicture'),
  createProduct
)

export default router
