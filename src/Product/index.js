import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash/get';
import './Product.css';
import ProductBreadcrumbs from './ProductBreadcrumbs';
import ProductOrderButtons from './ProductOrderButtons';
import { formatPrice } from '../util';

const Product = props => {
  const {
    title,
    brand,
    price,
    description,
    image,
    categoryName
  } = props.product;
  return (
    <div>
      <div className="product__detail">
        <ProductBreadcrumbs category={categoryName} title={title} />
        <div className="product__image">
          <img alt={image} src={`${window.location.origin}/media/${image}`} />
        </div>
        <div className="product__data">
          <div className="product__data__brand">{brand}</div>
          <div className="product__data__title">{title}</div>
          <div className="product__data__price">{formatPrice(price)}</div>
          <div className="product__data__description">{description}</div>
          <ProductOrderButtons productId={props.productId} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const productId = get(ownProps, 'match.params.productId', false);
  const product = state.products[productId];
  return {
    productId,
    product: product
  };
};

export default withRouter(connect(mapStateToProps)(Product));
