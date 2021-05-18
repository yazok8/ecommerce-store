import React, { useState } from 'react'
import NewModal from '../../../UI/modal/modal'
import Input from '../../../UI/input/Input.ui'

import { Col, Container, Row } from 'react-bootstrap'

const UpdateCategoriesModal = (props) => {
  const {
    size,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
    show,
  } = props

  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      size={size}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={'Category Name'}
                onChange={(e) =>
                  handleCategoryInput('name', e.target.value, index, 'expanded')
                }
              />
            </Col>

            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput('name', e.target.value, index, 'expanded')
                }
              >
                <option>select category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select className="form-control">
                <option value="">Select type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}

      <Row>
        <Col>
          <h6>Checked</h6>
        </Col>
      </Row>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={'Category Name'}
                onChange={(e) =>
                  handleCategoryInput('name', e.target.value, index, 'checked')
                }
              />
            </Col>

            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput('name', e.target.value, index, 'checked')
                }
              >
                <option>select category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select className="form-control">
                <option value="">Select type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
    </NewModal>
  )
}

export default UpdateCategoriesModal
