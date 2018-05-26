import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

export const CartProductQuantity = props => {
  const { quantity, incrementQuantity, decrementQuantity } = props;
  return (
    <div className="cart__quantity__grid">
      <div className="cart__quantity__value">{quantity}</div>
      <div onClick={incrementQuantity} className="cart__quantity__plus">
        +
      </div>
      <div onClick={decrementQuantity} className="cart__quantity__minus">
        -
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { quantity, productId } = ownProps;

  const incrementQuantity = () =>
    dispatch(actions.setCartQuantity(productId, quantity + 1));

  const decrementQuantity = () =>
    dispatch(actions.setCartQuantity(productId, Math.max(0, quantity - 1)));

  return {
    incrementQuantity,
    decrementQuantity
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CartProductQuantity);
