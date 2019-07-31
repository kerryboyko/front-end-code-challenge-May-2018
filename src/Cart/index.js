import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Cart.css';
import CartProductData from './CartProductData';
import CartProductQuantity from './CartProductQuantity';
import { formatPrice, getFullCart, getCartTotal } from '../util';
import { actions } from '../store';

const Cart = props => {
  const { cart, total, removeItem, history } = props;
  const handleContinueShopping = () => history.push('/');
  return (
    <div>
      <div className="cart__background" />
      <div className="cart">
        <div className="cart__title">Shopping Cart</div>
        <div className="cart__main">
          <div className="cart__grid__entry">
            <div className="cart__grid__header__label">Product</div>
            <div className="cart__grid__header__label center-align">
              Quantity
            </div>
            <div className="cart__grid__header__label center-align">Total</div>
            <div className="cart__grid__header__label right-align">Action</div>
          </div>
          {cart.map((item, i) => (
            <div key={i} className="cart__grid__entry">
              <CartProductData {...item} />
              <CartProductQuantity
                quantity={item.quantity}
                productId={item.productId}
              />
              <div className="cart__grid__total">
                {formatPrice(item.quantity * item.price)}
              </div>
              <div
                onClick={() => removeItem(item.productId)}
                className="cart__grid__remove"
              >{`\u00D7`}</div>
            </div>
          ))}
          <div className="cart__overview">
            <div className="cart__overview__label">Cart Overview</div>
            <div className="cart__overview__subtotal">
              <div className="cart__overview__subtotal__label">Subtotal</div>
              <div className="cart__overview__subtotal__value">
                {formatPrice(total)}
              </div>
            </div>
            <div className="cart__overview__total">
              <div className="cart__overview__total__label">Total</div>
              <div className="cart__overview__total__value">
                {formatPrice(total)} CAD
              </div>
            </div>
          </div>
          <div className="cart__buttons">
            <div
              onClick={handleContinueShopping}
              className="cart__buttons__continue-shopping"
            >
              Continue Shopping
            </div>
            <div className="cart__buttons__checkout">{`Checkout (${formatPrice(
              total
            )})`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cart: getFullCart(state),
    total: getCartTotal(state)
  };
};

const mapDispatchToProps = {
  removeItem: actions.deleteFromCart
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cart)
);
