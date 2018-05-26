import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

class OrderButtons extends Component {
  state = {
    orderAmount: 1
  };

  handleIncrement = () => {
    this.setState({ orderAmount: this.state.orderAmount + 1 });
  };

  handleDecrement = () => {
    this.setState({ orderAmount: Math.max(this.state.orderAmount - 1, 1) });
  };

  handleAddToCart = () => {
    const { addToCart, productId } = this.props;
    const { orderAmount } = this.state;
    addToCart(productId, orderAmount);
    this.setState({ orderAmount: 1 });
  };

  render() {
    const { quantityInCart } = this.props;
    const { orderAmount } = this.state;
    return (
      <div>
        <div className="product__order-buttons">
          <div className="product__order-buttons__grid">
            <div className="product__order-buttons__quantity">
              {orderAmount}
            </div>
            <div
              onClick={this.handleIncrement}
              className="product__order-buttons__plus"
            >
              {'+'}
            </div>
            <div
              onClick={this.handleDecrement}
              className="product__order-buttons__minus"
            >
              {'-'}
            </div>
            <div className="product__order-buttons__gutter" />
            <div
              onClick={this.handleAddToCart}
              className="product__order-buttons__add-to-cart"
            >
              Add {orderAmount === 1 ? null : `${orderAmount} `}To Cart
            </div>
          </div>
        </div>
        {quantityInCart > 0 ? (
          <div className="product__order-buttons__existing-quantity">{`${quantityInCart} item${
            quantityInCart > 1 ? 's' : ''
          } in your cart`}</div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { productId } = ownProps;
  // not the most efficient algorithm designed O(n), but since a cart is
  // not going to be more than 100000 items in the most extreme cases, acceptable.
  let quantity = 0;
  const cartEntry = state.cart.find(x => x.productId === productId);
  if (cartEntry) {
    quantity = cartEntry.quantity;
  }
  return {
    quantityInCart: quantity
  };
};

const mapDispatchToProps = {
  addToCart: actions.addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderButtons);
