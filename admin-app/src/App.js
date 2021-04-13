import Footer from './components/Footer'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './components/container/signin/Signin.container'
import Signup from './components/container/signup/Signup.container'
import Home from './components/container/home/Home.container'
import Shopscreen from './screens/Shopscreen'

import './bootstrap.min.css'
import ProductScreen from './screens/ProductScreen'
import Products from './components/container/products/Products'
import Orders from './components/container/orders/Orders'
import Cartscreen from './screens/Cartscreen'
import PrivateRoute from './components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions/actions'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [])

  return (
    <Switch>
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/products" component={Products}></PrivateRoute>
      <PrivateRoute path="/orders" component={Orders}></PrivateRoute>

      <Route path="/signup" component={Signup} />
      <Route path="/product/:id" component={ProductScreen} />
      <Route path="/shop" component={Shopscreen} />
      <Route path="/product/:id" component={ProductScreen} />
      <Route path="/cart/:id?" component={Cartscreen} />
    </Switch>
  )
}

export default App
