import { types as categoryTypes } from './categories';
import { makeTypes } from '../../util';

// types
const types = makeTypes('products', 'ADD_PRODUCTS');

// actions
const addProducts = products => ({ type: types.ADD_PRODUCTS, products });

// reducers
const products = (state = {}, action = {}) => {
  switch (action.type) {
    case types.ADD_PRODUCTS: // fallthrough is deliberate
    case categoryTypes.LOAD_CATEGORY:
      const productsById = {};
      action.products.forEach(prod => {
        productsById[prod.productId] = prod;
      });
      return Object.assign({}, state, productsById);
    default:
      return state;
  }
};

export default {
  types,
  actions: { addProducts },
  reducers: { products }
};
