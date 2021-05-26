import React, { useState } from 'react'
import Layout from '../../layouts/header.layout'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Input from '../../UI/input/Input.ui'
import NewModal from '../../UI/modal/modal'
import { addProduct } from '../../../actions/actions'
import './ProductStyle.css'
import { generatePublicUrl } from '../../../urlConfig'

function Products() {
  // const product = useSelector((state) => state.product)
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [productPictures, setProductsPictures] = useState([])
  const [show, setShow] = useState(false)
  const [productDetailsModal, setProductDetailsModal] = useState(false)
  const [productDetails, setProductDetails] = useState(null)

  const category = useSelector((state) => state.category)
  const product = useSelector((state) => state.product)
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

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name:</th>
            <th>Price:</th>
            <th>Quantity:</th>
            <th>Category:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>

                  <button onClick={() => showProductDetailsModal(product)}>
                    info
                  </button>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    )
  }

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Product'}
      >
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
      </NewModal>
    )
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

  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false)
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product)
    setProductDetailsModal(true)
  }

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null
    }
    return (
      <NewModal
        show={productDetailsModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={'Product Details'}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name:</label>
            <p className="value">{productDetails.name}</p>
          </Col>

          <Col md="6">
            <label className="key">Price:</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity:</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category:</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description:</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)}></img>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    )
  }

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
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  )
}

export default Products
