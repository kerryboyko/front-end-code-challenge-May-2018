import React from 'react';

const CartProductData = props => {
  const { image, title, brand } = props;
  return (
    <div className="cart__product-data">
      <div
        className="cart__product-data__image"
        style={{
          backgroundImage: `url(${window.location.origin}/media/${image})`
        }}
      />
      <div className="cart__product-data__data">
        <div className="cart__product-data__brand">{brand}</div>
        <div className="cart__product-data__title">{title}</div>
      </div>
    </div>
  );
};

export default CartProductData;
