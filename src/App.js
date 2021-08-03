import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/navBar";
import Footer from "./components/footer";
import Catalog from "./components/catalog";
import Home from "./components/home";
import About from "./components/about";
import Cart from "./components/cart";
import Contact from "./components/contact";
import Admin from "./components/admin";
import GlobalState from "./context/globalState";
import ShoppingList from "./components/shoppingList";

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <div className="App">
          <NavBar></NavBar>

          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/catalog" exact component={Catalog}></Route>
            <Route path="/cart" exact component={Cart}></Route>
            <Route path="/about" exact component={About}></Route>
            <Route path="/contact" exact component={Contact}></Route>
            <Route path="/admin" exact component={Admin}></Route>
            <Route path="/list" exact component={ShoppingList}></Route>
          </Switch>

          <Footer></Footer>
        </div>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;

// Admin
// /admin route
// attributes:
/**
 * _id
 * title
 * price
 * stock
 * image
 * minimum
 */
