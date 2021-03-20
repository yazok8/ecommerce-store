import express from 'express'
import {
  createProduct,
  getProductById,
  getProducts,
} from '../controllers/productContoller.js'
import multer from 'multer'
import { nanoid } from 'nanoid'

const app = express()

app.use(express.json())
nanoid(10)
var ID = nanoid()

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, ID + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

const router = express.Router()

// @desc fetch all shop products...
// @route GET /api/shop...
// @access Public

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.post('/create', upload.array('productPicture'), createProduct)

export default router
