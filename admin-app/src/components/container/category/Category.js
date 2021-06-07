import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from '../../../actions/actions'
import NewModal from '../../UI/modal/modal'
import Layout from '../../layouts/header.layout'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { IoCheckbox, IoArrowDown, IoArrowForward } from 'react-icons/io5'

import {
  IoIosCheckboxOutline,
  IoIosAdd,
  IoIosCloudUpload,
  IoIosTrash,
} from 'react-icons/io'
import UpdateCategoriesModal from './CategoryComponents.js/UpdateCategoryModal'
import AddCategoryModal from './CategoryComponents.js/AddCategoryModal'
import './style.css'

const Category = (props) => {
  const [categoryName, setCategoryName] = useState('')
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
  const [show, setShow] = useState(false)

  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])

  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!category.loading) setShow(false)
  // }, [category.loading])

  const handleClose = () => {
    const form = new FormData()

    if (categoryName === '') {
      alert('Category name is required')
      setShow(false)
      return
    }

    form.append('name', categoryName)
    form.append('parentId', parentCategoryId)
    form.append('categoryPicture', categoryImage)
    dispatch(addCategory(form))
    // window.location.reload(false)
    setCategoryName('')
    setParentCategoryId('')
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const renderCategories = (categories) => {
    let myCategories = []
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      })
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

  const updateCategory = () => {
    updateCheckedExpandedCategories()
    setUpdateCategoryModal(true)
  }

  const updateCheckedExpandedCategories = () => {
    const categories = createCategoryList(category.categories)
    const checkedArray = []
    const expandedArray = []
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        )

        //there is maybe a change a catgeory won't match, so just for safety we will have to do this
        category && checkedArray.push(category)
      })

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        )

        //there is maybe a change a catgeory won't match, so just for safety we will have to do this
        category && expandedArray.push(category)
      })

    //these two will help to modify the inputs in edit category
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
  }

  const handleCategoryInput = (key, value, index, type) => {
    if (type === 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      )
      setCheckedArray(updatedCheckedArray)
    } else if (type === 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      )
      setExpandedArray(updatedExpandedArray)
    }
  }
  {
    /* Edit Categories */
  }

  const updateCategoriesForm = () => {
    const form = new FormData()
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId ? item.parentId : '')
      form.append('type', item.type)
    })

    checkedArray.forEach((item, index) => {
      form.append('_id', item.value)
      form.append('name', item.name)
      form.append('parentId', item.parentId ? item.parentId : '')
      form.append('type', item.type)
    })

    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory())
      }
    })
  }

  const deleteCategory = () => {
    updateCheckedExpandedCategories()
    setDeleteCategoryModal(true)
  }

  const deleteCategories = () => {
    //get expandedCategory id
    const expandedByIdArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }))

    //get checkedCategory id
    const checkedByIdArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }))

    //merge the checked and expanded arrays by id
    const arrayByIds = expandedByIdArray.concat(checkedByIdArray)

    if (checkedArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedByIdArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory())
          setDeleteCategoryModal(false)
        }
      })
    }

    setDeleteCategoryModal(false)
  }

  const renderDeleteCategoryModal = () => {
    // console.log('delete', checkedArray)

    return (
      <NewModal
        modalTitle="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: 'No',
            color: 'primary',
            onClick: () => {
              alert('no')
            },
          },
          {
            label: 'Yes',
            color: 'danger',
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </NewModal>
    )
  }

  const categoryList = createCategoryList(category.categories)

  return (
    <div>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Category</h3>
                <div className="action-btn-container">
                  <span>Actions: </span>
                  <button onClick={handleShow}>
                    <IoIosAdd />
                    <span> Add</span>
                  </button>
                  <button onClick={deleteCategory}>
                    <IoIosTrash />
                    <span>Delete</span>
                  </button>
                  <button onClick={updateCategory}>
                    <IoIosCloudUpload />
                    <span> Edit</span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                icons={{
                  check: <IoCheckbox />,
                  uncheck: <IoIosCheckboxOutline />,
                  halfCheck: <IoIosCheckboxOutline />,
                  expandClose: <IoArrowForward />,
                  expandOpen: <IoArrowDown />,
                }}
              />
            </Col>
          </Row>
        </Container>

        <AddCategoryModal
          show={show}
          handleClose={() => setShow(false)}
          onSubmit={handleClose}
          modalTitle={'Add New Category'}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          parentCategoryId={parentCategoryId}
          setParentCategoryId={setParentCategoryId}
          categoryList={categoryList}
          handleCategoryImage={handleCategoryImage}
        />

        <UpdateCategoriesModal
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          onSubmit={updateCategoriesForm}
          modalTitle={'Update Categories'}
          size="lg"
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          handleCategoryInput={handleCategoryInput}
          categoryList={categoryList}
        />
        {renderDeleteCategoryModal()}
      </Layout>
    </div>
  )
}

export default Category
