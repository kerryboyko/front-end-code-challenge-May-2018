import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../store';
import MyCart from './MyCart';

// temporary.

const Header = props => {
  const { isOpen, numberInCart, toggleCart, closeCart } = props;
  return (
    <div className="header">
      <div className="header__logo">
        <img alt="Logo for Hero" src="../media/logo.png" />
      </div>
      <div className="header__nav-menu">
        <Link to="/home">
          <div className="header__nav-menu__link">Home</div>
        </Link>
        {/* As there are no other shop pages, I'm linking to category/pages here */}
        <Link to="/category/plates">
          <div className="header__nav-menu__link">
            Shop <i className="fa fa-angle-down" />
          </div>
        </Link>
        <Link to="/home">
          <div className="header__nav-menu__link">Journal</div>
        </Link>
        <div>
          <div className="header__nav-menu__link">
            More <i className="fa fa-angle-down" />
          </div>
        </div>
      </div>
      <div className="header__cart-container">
        <div onClick={toggleCart} className="header__cart-button">
          <span
            className={`header__cart-button__text ${
              isOpen ? 'header__cart-button__text__open' : ''
            }`}
          >
            {`My Cart`}
            {numberInCart > 0 ? ` (${numberInCart})` : null}
          </span>
          {` `}
          <i className="fa fa-angle-down" />
        </div>
        <MyCart />
        {isOpen ? (
          <div onClick={closeCart} className="header__my-cart__underlay" />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { cart, cartDropdownIsOpen } = state;
  return {
    numberInCart: cart.length,
    isOpen: cartDropdownIsOpen
  };
};

const mapDispatchToProps = {
  toggleCart: actions.toggleCartDropdown,
  closeCart: () => actions.setCartDropdown(false)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
