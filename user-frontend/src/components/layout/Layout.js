import React from 'react'
import Header from '../header/Header'
import MenuHeader from '../menu-header/Menu-Header'

const Layout = (props) => {
  return (
    <>
      <Header />
      <MenuHeader />
      {props.children}
    </>
  )
}

export default Layout
