import Footer from "./components/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./components/Header";
import Homescreen from "./screens/Homescreen"
import { Container } from "react-bootstrap";
import "./bootstrap.min.css"
import Productscreen from "./screens/Productscreen";


const App = () => {
  return (
    
    <Router>

      <Header />
      <main className="py-3">
        <Container>
          <Route path = "/" component={Homescreen} exact/>
          <Route path = "/product/:id" component={Productscreen} exact/>
        </Container>
      </main>
   
      <Footer />

      </Router>
  );
}

export default App;
