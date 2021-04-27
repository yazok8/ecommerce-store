import React, { useEffect } from 'react'
import { getProductsBySlug } from '../../actions/actions'
import Layout from '../../components/layout/Layout'
import { useDispatch } from 'react-redux'
const Productlist = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const { match } = props
    dispatch(getProductsBySlug(match.params.slug))
  }, [])

  return <Layout>Product List Page</Layout>
}

export default Productlist
