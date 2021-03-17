import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
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
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Homescreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/shop" component={Shopscreen} />
          <Route path="/collection/list" component={Collectionscreen} />
          <Route path="/cart/:id?" component={Cartscreen} />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
