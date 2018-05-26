import React from 'react';
import { withRouter } from 'react-router-dom';

const ProductBreadcrumbs = props => (
  <div className="product__detail__breadcrumbs">
    <span
      className="product__detail__breadcrumbs__link"
      onClick={() => props.history.push('/')}
    >
      {'HOME'}
    </span>
    {` / `}
    <span
      className="product__detail__breadcrumbs__link"
      onClick={() => props.history.push(`/category/${props.category}`)}
    >
      {props.category}
    </span>
    {` / `}
    <span className="product__detail__breadcrumbs__title">{props.title}</span>
  </div>
);

export default withRouter(ProductBreadcrumbs);
