import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MyCartProduct from './MyCartProduct';
import './MyCart.css';
import { actions } from '../../store';
import { formatPrice, getCartTotal, getFullCart } from '../../util';

const HeaderMyCartDropdown = props => {
  const { open, cart, total, history, close } = props;
  const goToCart = () => {
    close();
    history.push('/cart');
  };
  const justClose = () => {
    close();
  };
  return open ? (
    <div className="my-cart__dropdown">
      {cart.map((prod, i) => <MyCartProduct {...prod} key={i} />)}
      {total > 0 ? (
        <div className="my-cart__dropdown__total">
          <div>Total</div>
          <div>{formatPrice(total)}</div>
        </div>
      ) : null}
      <div className="my-cart__dropdown__buttons">
        <div
          onClick={goToCart}
          className="my-cart__dropdown__buttons__view-cart"
        >
          View Cart
        </div>
        <div
          onClick={justClose}
          className="my-cart__dropdown__buttons__checkout"
        >
          Checkout
        </div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = state => ({
  open: state.cartDropdownIsOpen,
  cart: getFullCart(state),
  total: getCartTotal(state)
});

const mapDispatchToProps = {
  close: () => actions.setCartDropdown(false)
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderMyCartDropdown)
);
