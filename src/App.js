import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Category from "./category/Category";
import Cart from "./cart/Cart";
import Product from "./product/Product";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Storefront Assignment</h1>
        </header>
        <p className="App-intro">
          To get started, delete this header and introduction, and begin building your app in the provided components.
        </p>
        <p className="App-intro">
          We've setup the bare minimum you need to get started, but feel free to add as many components as you see fit.
        </p>

        <header>
            <Link to="/cart">My Cart</Link>
        </header>

        <Route exact path="/" component={Category} />
        <Route path="/cart" component={Cart}/>
        <Route path="/product/:id" component={Product}/>
      </div>
    );
  }
}

export default App;
