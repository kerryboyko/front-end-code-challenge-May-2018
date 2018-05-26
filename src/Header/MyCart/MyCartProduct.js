import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../store';
import { formatPrice } from '../../util';

const MyCartProduct = props => {
  const { productId, image, title, quantity, price, brand, deleteItem } = props;
  const handleDelete = () => deleteItem(productId);
  return (
    <div className="my-cart__product">
      <div className="my-cart__product__image-and-data">
        <div
          className="my-cart__product__image"
          style={{
            backgroundImage: `url(${window.location.origin}/media/${image})`
          }}
        />
        <div className="my-cart__product__data">
          <div className="my-cart__product__title">
            {title}

            <span className="my-cart__product__quantity">
              {/* &nbsp;&times;&nbsp; */}
              {`\u00A0\u00D7\u00A0${quantity}`}
            </span>
          </div>
          <div className="my-cart__product__brand">{brand}</div>
          <div className="my-cart__product__price">{formatPrice(price)}</div>
        </div>
      </div>
      <div onClick={handleDelete} className="my-cart__product__delete">
        <i className="fa fa-times" />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  deleteItem: actions.deleteFromCart
};

export default connect(
  null,
  mapDispatchToProps
)(MyCartProduct);
