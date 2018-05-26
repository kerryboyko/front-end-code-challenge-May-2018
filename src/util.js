// way to create constants for redux action creators that
// avoid namespace problems and ensure verbose logging info
// in redux logger.
export const makeTypes = (namespace, ...strings) =>
  strings.reduce((pv, s) => {
    pv[s] = `${namespace}.${s}`;
    return pv;
  }, {});

// quick and dirty way to create 36-bit hashes for URLs
// this method does not prevent the possibility of collisions.
export const qdHash36 = str => {
  let hash = 0;
  let char;
  if (str.length > 0) {
    for (let i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
  }
  return Math.abs(hash).toString(36);
};

// format integers of dollars into dollar currency strings
export const formatPrice = (num = 0) =>
  num.toLocaleString(
    'en-US',
    {
      style: 'currency',
      currency: 'USD'
    }
  );

// gets the full cart from state;
export const getFullCart = ({ cart, products }) =>
  cart.map(cartItem => ({
    ...cartItem,
    ...products[cartItem.productId]
  }));

// calculates a total money amount in carts;
export const getCartTotal = ({ cart, products }) =>
  getFullCart({ cart, products }).reduce((pv, item) => {
    return pv + item.quantity * item.price;
  }, 0);
