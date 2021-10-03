import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CartListing from './components/cart/CartListing';
import Header from './components/Header';
import Login from './components/Login';
import ProductDetail from './components/product/ProductDetail';
import ProductListing from './components/product/ProductListing';
import Register from './components/Register';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Switch>
          <Route
          path='/' exact component={ProductListing}></Route>
          <Route
          path='/login' exact component={Login}></Route>
          <Route
          path='/register' exact component={Register}></Route>
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

