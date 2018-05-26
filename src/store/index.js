import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import categories from './modules/categories';
import cart from './modules/cart';
import products from './modules/products';

const allModules = [categories, cart, products];

const combinedModules = allModules.reduce(
  (pv, mod) => {
    Object.keys(pv).forEach(modProp => {
      if (mod[modProp]) {
        pv[modProp] = Object.assign({}, pv[modProp], mod[modProp]);
      }
    });
    return pv;
  },
  { actions: {}, reducers: {}, types: {} }
);

export const { actions, reducers, selectors, types } = combinedModules;

const appReducer = combineReducers(Object.assign({}, reducers));
const rootReducer = (state, action) => appReducer(state, action);
// in actual code, you would use a setting in webpack to determine if this is
// a production or development build - the logger would only be part of a development build
const logger = createLogger();
const enhancer = compose(applyMiddleware(thunk, logger));

const configureStore = initialState =>
  createStore(rootReducer, initialState, enhancer);

export default configureStore();
