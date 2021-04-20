import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, addCategory } from '../../../actions/actions'
import Input from '../../UI/input/Input.ui'
import NewModal from '../../UI/modal/modal'
import Layout from '../../layouts/header.layout'

const Category = (props) => {
  const [categoryName, setCategoryName] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [show, setShow] = useState(false)

  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()

  const handleClose = () => {
    const form = new FormData()

    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryPicture', categoryImage)
    dispatch(addCategory(form))
    // window.location.reload(false)
    setCategoryName('')
    setParentCategoryId('')
    // const cat = {
    //   categoryName,
    //   parentCategoryId,
    //   categoryImage,
    // }

    // console.log(cat)

    setShow(false)
  }
  const handleShow = () => setShow(true)

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
        <NewModal
          show={show}
          handleClose={handleClose}
          modalTitle={'Add New Category'}
        >
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
        </NewModal>
      </Layout>
    </div>
  )
}

export default Category
