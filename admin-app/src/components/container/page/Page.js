import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import LinearCategories from '../../../helpers/linearCategory'
import Layout from '../../layouts/header.layout'
import Input from '../../UI/input/Input.ui'
import NewModal from '../../UI/modal/modal'
import { useSelector, useDispatch } from 'react-redux'
import { createPage } from '../../../actions/actions'

const Page = (props) => {
  const [createModal, setCreateModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState('')

  const dispatch = useDispatch()

  const page = useSelector((state) => state.page)

  const category = useSelector((state) => state.category)

  useEffect(() => {
    setCategories(LinearCategories(category.categories))
  }, [category])

  useEffect(() => {
    console.log(page)
    if (!page.loading) setCreateModal(false)
    setTitle('')
    setDescription('')
    setProducts([])
    setBanners([])
    setCategoryId('')
  }, [page])

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    )
    setCategoryId(e.target.value)
    setType(category.type)
  }

  const handleBannerImages = (e) => {
    console.log(e)
    setBanners([...banners, e.target.files[0]])
  }

  const handleProductImages = (e) => {
    console.log(e)
    setProducts([...products, e.target.files[0]])
  }

  const submitPgaeForm = (e) => {
    // e.preventDefault()
    if (title === '') {
      alert('title is required')
      setCreateModal(false)
      return
    }
    const form = new FormData()
    form.append('title', title)
    form.append('description', description)
    form.append('category', categoryId)
    form.append('type', type)
    banners.forEach((banner, index) => {
      form.append('banners', banner)
    })

    products.forEach((product, index) => {
      form.append('products', product)
    })

    dispatch(createPage(form))

    // console.log({ title, description, categoryId, type, banners, products })
  }

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPgaeForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder={'Select Category'}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Page Title'}
                className="form-control"
              ></Input>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={'Page Description'}
                className="form-control"
              ></Input>
            </Col>
          </Row>
          <Row>
            {banners.length > 0
              ? banners.map((banner, index) => (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ))
              : null}
          </Row>

          <Row>
            <Col>
              <input
                className="form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              ></input>
            </Col>
          </Row>

          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <input
                className="form-control-sm  "
                type="file"
                name="products"
                onChange={handleProductImages}
              ></input>
            </Col>
          </Row>
        </Container>
      </NewModal>
    )
  }

  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating Page ...please wait</p>
      ) : (
        <>
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    </Layout>
  )
}

export default Page
