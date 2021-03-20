import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signin from './components/container/signin/Signin.container'
import Signup from './components/container/signup/Signup.container'
import Home from './components/container/home/Home.container'
import Layout from './components/layouts/header.layout'
import Homescreen from './screens/Homescreen'
import Shopscreen from './screens/Shopscreen'
import { Container } from 'react-bootstrap'
import './bootstrap.min.css'
import ProductScreen from './screens/ProductScreen'
import Collectionscreen from './screens/Collectionscreen'
import Cartscreen from './screens/Cartscreen'
const App = () => {
  return (
    <Router>
      <Layout />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/shop" component={Shopscreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/collection/list" component={Collectionscreen} />
            <Route path="/cart/:id?" component={Cartscreen} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
