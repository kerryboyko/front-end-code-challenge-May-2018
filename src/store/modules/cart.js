import { makeTypes } from '../../util'; // If we were using webpack, I'd create a util folder with an alias;
// types
const types = makeTypes(
  'cart',
  'ADD_TO_CART',
  'SET_CART_QUANTITY',
  'DELETE_ITEM',
  'SET_CART_DROPDOWN_OPEN',
  'TOGGLE_CART_DROPDOWN_OPEN'
);

// actions (technically action creators);
const deleteFromCart = productId => ({ type: types.DELETE_ITEM, productId });

const addToCart = (productId, quantity = 1) => ({
  type: types.ADD_TO_CART,
  productId,
  quantity
});

const setCartQuantity = (productId, quantity) => ({
  type: types.SET_CART_QUANTITY,
  productId,
  quantity
});

const toggleCartDropdown = () => ({ type: types.TOGGLE_CART_DROPDOWN_OPEN });

const setCartDropdown = isOpen => ({
  type: types.SET_CART_DROPDOWN_OPEN,
  isOpen
});

// reducers
const cart = (state = [], action = {}) => {
  const index = state.findIndex(
    element => element.productId === action.productId
  );
  switch (action.type) {
    case types.SET_CART_QUANTITY:
      return state.map(
        (element, i) =>
          i === index
            ? Object.assign({}, element, { quantity: action.quantity })
            : element
      );
    case types.ADD_TO_CART:
      if (index === -1) {
        return state.concat(
          Object.assign(
            {},
            { productId: action.productId, quantity: action.quantity }
          )
        );
      }
      return state.map(
        (element, i) =>
          i === index
            ? Object.assign({}, element, {
                quantity: element.quantity + action.quantity
              })
            : element
      );
    case types.DELETE_ITEM:
      if (index !== -1) {
        return state.slice(0, index).concat(state.slice(index + 1));
      }
      return state;
    default:
      return state;
  }
};

const cartDropdownIsOpen = (state = false, action = {}) => {
  switch (action.type) {
    case types.SET_CART_DROPDOWN_OPEN:
      return action.isOpen;
    case types.TOGGLE_CART_DROPDOWN_OPEN:
      return !state;
    default:
      return state;
  }
};

export default {
  types,
  actions: {
    addToCart,
    deleteFromCart,
    setCartQuantity,
    toggleCartDropdown,
    setCartDropdown
  },
  reducers: { cart, cartDropdownIsOpen }
};
