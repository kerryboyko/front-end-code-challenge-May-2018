import React from 'react';
import get from 'lodash/get';
import CategoryProduct from './CategoryProduct';

// if the number of products is ever different than 6,
// it might be best to change this to a stateful Component
// class and add some sort of pagination.
const CategoryProductGrid = props => (
  <div className="category__product-grid">
    {get(props, 'productIdList', []).map((productId, index) => (
      <CategoryProduct key={productId} productId={productId} />
    ))}
  </div>
);

export default CategoryProductGrid;
