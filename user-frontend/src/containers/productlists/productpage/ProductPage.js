import React, { useEffect } from 'react'
import { getProductPage } from '../../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import GetParams from '../../../utlis/GetParams'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const ProductPage = (props) => {
  const dispatch = useDispatch()
  const productPage = useSelector((state) => state.productPage)

  useEffect(() => {
    const params = GetParams(props.location.search)
    console.log({ params })
    const payload = {
      params,
    }

    dispatch(getProductPage(payload))
  }, [])
  return <div>{JSON.stringify(productPage.page)}</div>
}

export default ProductPage
