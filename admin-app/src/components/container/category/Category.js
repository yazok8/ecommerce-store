import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, addCategory } from '../../../actions/actions'
import Input from '../../UI/input/Input.ui'
import Layout from '../../layouts/header.layout'

const Category = (props) => {
  const [categoryName, setCategoryName] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [show, setShow] = useState(false)

  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Category.js')
    dispatch(getAllCategory())
  }, [])

  const handleClose = () => {
    const form = new FormData()

    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryPicture', categoryImage)
    dispatch(addCategory(form))

    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage,
    // }

    // console.log(cat)

    setShow(false)
  }
  const handleShow = () => setShow(true)

  const refreshPage = () => {
    window.location.reload(false)
  }

  const renderCategories = (categories) => {
    let myCategories = []
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      )
    }

    return myCategories
  }

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

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0])
  }

  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Category</h3>
                <button onClick={handleShow}>Add</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {renderCategories(category.categories)}
              {/* {JSON.stringify(createCategoryList(category.categories))} */}
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              value={categoryName}
              placeholder={'Category Name'}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <select
              className="form-control"
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
            >
              <option>select category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="categoryImage"
              onChange={handleCategoryImage}
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </div>
  )
}

export default Category
