import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CartListing from './components/cart/CartListing';
import Header from './components/Header';
import ProductDetail from './components/product/ProductDetail';
import ProductListing from './components/product/ProductListing';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Switch>
          <Route
          path='/' exact component={ProductListing}></Route>
          <Route
          path='/product/:productId' exact component={ProductDetail}></Route>
          <Route
          path='/cart' exact component={CartListing}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

