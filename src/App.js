import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Reset from './components/Authentication/Reset';
import CartListing from './components/cart/CartListing';
import Header from './components/Header';
import Login from './components/Authentication/Login';
import ProductDetail from './components/product/ProductDetail';
import ProductListing from './components/product/ProductListing';
import Register from './components/Authentication/Register';
import Stripe from './components/Payment/Stripe';

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
          path='/reset' exact component={Reset}></Route>
          <Route
          path='/product/:productId' exact component={ProductDetail}></Route>
          <Route
          path='/cart' exact component={CartListing}></Route>
          <Route
          path='/stripe' exact component={Stripe}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

