import React, { useEffect } from 'react'
import { getProductPage } from '../../../actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import GetParams from '../../../utlis/GetParams'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Card from '../../../components/UI/card/Card'
import { Link } from 'react-router-dom'

const ProductPage = (props) => {
  const dispatch = useDispatch()
  const productPage = useSelector((state) => state.productPage)
  const { page } = productPage

  useEffect(() => {
    const params = GetParams(props.location.search)
    console.log(params)
    const payload = {
      params,
    }

    dispatch(getProductPage(payload))
  }, [])
  return (
    <div style={{ margin: '0 10px' }}>
      <h3>{page.title}</h3>
      <h4>{page.description}</h4>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <Link
              key={index}
              style={{ display: 'block' }}
              href={banner.navigateTo}
            >
              <img
                src={`http://localhost:5000${banner.img}`}
                alt=""
                style={{ width: '700px', height: '100%' }}
              />
            </Link>
          ))}
      </Carousel>
      <Carousel renderThumbs={() => {}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '10px 0',
          }}
        >
          {page.products &&
            page.products.map((product, index) => (
              <Card
                key={index}
                style={{ display: 'block' }}
                href={product.navigateTo}
                style={{ width: '400px', height: '300px', margin: '5px' }}
              >
                <img
                  src={`http://localhost:5000${product.img}`}
                  alt=""
                  style={{ width: '100%', height: '100%', margin: '5px' }}
                />
              </Card>
            ))}
        </div>
      </Carousel>
    </div>
  )
}

export default ProductPage
