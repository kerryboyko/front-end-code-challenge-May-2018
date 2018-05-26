import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './App.css';
import Category from './Category';
import Header from './Header';
import Cart from './Cart';
import Product from './Product';
import { actions } from './store';

class App extends Component {
  /* This code would likely not be in a real application in this component.
   See /src/Category/index.js for more information */
  componentWillMount() {
    if (!this.props.platesIsLoaded) {
      this.props.getPlates();
    }
  }
  render() {
    return this.props.platesIsLoaded ? (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/product/:productId" component={Product} />
              <Route path="/category/:category" component={Category} />
              <Route path="/cart" component={Cart} />
              <Route exact path="/">
                <Redirect to="/category/plates" />
              </Route>
              <Route>
                <Redirect to="/category/plates" />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return { platesIsLoaded: !!get(state, 'categories.plates', false) };
};

/* This code would likely not be in a real application in this component.
   See /src/Category/index.js for more information */
const mapDispatchToProps = dispatch => ({
  getPlates: () => dispatch(actions.getCategory('plates'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
