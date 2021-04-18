import React, { useState } from 'react'
import Layout from '../../layouts/header.layout'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import Input from '../../UI/input/Input.ui'
import { addProduct } from '../../../actions/actions'

function Products() {
  // const product = useSelector((state) => state.product)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [productPictures, setProductsPictures] = useState([])
  const [show, setShow] = useState(false)

  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()

  const handleClose = () => {
    {
      const form = new FormData()

      form.append('name', name)
      form.append('quantity', quantity)
      form.append('price', price)
      form.append('description', description)
      form.append('category', categoryId)

      for (let pic of productPictures) {
        form.append('productPicture', pic)
      }

      dispatch(addProduct(form))

      // const cat = {
      //   categoryName,
      //   parentCategoryId,
      //   categoryImage,
      // }

      // console.log(cat)

      setShow(false)
    }
  }

  const handleShow = () => setShow(true)

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options
  }

  const handleProductPictures = (e) => {
    setProductsPictures([...productPictures, e.target.files[0]])
  }

  console.log(productPictures)

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={name}
            placeholder={'Product Name'}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="quantity"
            value={quantity}
            placeholder={'Product Quantity'}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label="price"
            value={price}
            placeholder={'Product Price'}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            label="description"
            value={description}
            placeholder={'Product Description'}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}
          <input
            type="file"
            name="productPicture"
            onChange={handleProductPictures}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default Products
