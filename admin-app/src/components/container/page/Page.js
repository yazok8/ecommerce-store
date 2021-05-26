import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import LinearCategories from '../../../helpers/linearCategory'
import Layout from '../../layouts/header.layout'
import Input from '../../UI/input/Input.ui'
import NewModal from '../../UI/modal/modal'
import { useSelector } from 'react-redux'

const Page = (props) => {
  const [createModal, setCreateModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')

  const category = useSelector((state) => state.category)

  useEffect(() => {
    setCategories(LinearCategories(category.categories))
  }, [category])

  const handleBannerImages = (e) => {
    console.log(e)
  }

  const handleProductImages = (e) => {
    console.log(e)
  }

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={() => setCreateModal(false)}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
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
            <Col>
              <input
                className="form-control-sm"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              ></input>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                className="form-control-sm"
                type="file"
                name="images"
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
      {renderCreatePageModal()}
      <button onClick={() => setCreateModal(true)}>Create Page</button>
    </Layout>
  )
}

export default Page
