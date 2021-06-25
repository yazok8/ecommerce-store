import React from 'react'
import Header from '../header/Header'
import MenuHeader from '../menu-header/Menu-Header'

const Layout = (props) => {
  return (
    <div>
      <Header />
      <MenuHeader />
      {props.children}
    </div>
  )
}

export default Layout
