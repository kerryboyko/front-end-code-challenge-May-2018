import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from '../store';
import { formatPrice } from '../util';

const CategoryProduct = props => {
  const { image, brand, title, price, id } = props;
  const handleAddToCart = () => props.addToCart(id);
  return (
    <div className="category__product">
      <div
        className="category__product__image"
        style={{
          backgroundImage: `url(${window.location.origin}/media/${image})`
        }}
      >
        <div className="category__product__overlay">
          <div className="category__product__overlay__inner">
            <div
              onClick={() => props.history.push(`/product/${id}`)}
              className="category__product__button"
            >
              View Details
            </div>
            <div
              onClick={handleAddToCart}
              className="category__product__button"
            >
              Add To Cart
            </div>
          </div>
        </div>
      </div>
      <div className="category__product__brand">{brand}</div>
      <div className="category__product__title">{title}</div>
      <div className="category__product__price">{formatPrice(price)}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.productId;
  console.log(id);
  const { image, brand, title, price } = state.products[id];
  return {
    id,
    image,
    brand,
    title,
    price
  };
};

const mapDispatchToProps = { addToCart: actions.addToCart };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryProduct)
);
