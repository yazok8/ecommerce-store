import Footer from './components/Footer'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './components/container/signin/Signin.container'
import Signup from './components/container/signup/Signup.container'
import Home from './components/container/home/Home.container'

import './bootstrap.min.css'
import Products from './components/container/products/Products'
import Orders from './components/container/orders/Orders'
import PrivateRoute from './components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, getInitialData } from './actions/actions'

import Category from './components/container/category/Category'
import Page from './components/container/page/Page'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  //this is the same as componentDidMount but here we will use componnentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if (auth.authenticate) {
      dispatch(getInitialData())
    }
  }, [auth.authenticate])

  return (
    <Switch>
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/page" component={Page} />
      <PrivateRoute path="/products" component={Products}></PrivateRoute>
      <PrivateRoute path="/orders" component={Orders}></PrivateRoute>
      <PrivateRoute path="/category" component={Category}></PrivateRoute>
      <Route path="/signup" component={Signup} />
    </Switch>
  )
}

export default App
