import React from 'react'
import NewModal from '../../../UI/modal/modal'
import Input from '../../../UI/input/Input.ui'
import { Col, Row } from 'react-bootstrap'

const AddCategoryModal = (props) => {
  const {
    handleClose,
    modalTitle,
    show,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props

  return (
    <NewModal show={show} handleClose={handleClose} modalTitle={modalTitle}>
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={'Category Name'}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>

        <Col>
          {' '}
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          ></input>
        </Col>
      </Row>
    </NewModal>
  )
}

export default AddCategoryModal
