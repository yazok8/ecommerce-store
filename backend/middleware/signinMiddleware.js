import express from 'express'
import jwt from 'jsonwebtoken'
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

export const upload = multer({ storage })

export const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.user = user
  } else {
    return res.status(400).json({ message: 'Authorization required' })
  }
  next()

  //jwt.decode()
}

export const userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'User access denided' })
  }

  next()
}

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Admin access denided' })
  }

  next()
}
