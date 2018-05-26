import cartModule from './cart';
const { actions, types, reducers } = cartModule;

describe('store/cart', () => {
  it('has the right types', () => {
    expect(types).toEqual({
      ADD_TO_CART: 'cart.ADD_TO_CART',
      SET_CART_QUANTITY: 'cart.SET_CART_QUANTITY',
      DELETE_ITEM: 'cart.DELETE_ITEM',
      SET_CART_DROPDOWN_OPEN: 'cart.SET_CART_DROPDOWN_OPEN',
      TOGGLE_CART_DROPDOWN_OPEN: 'cart.TOGGLE_CART_DROPDOWN_OPEN'
    });
  });
  describe('action creators', () => {
    it('deleteFromCart', () => {
      expect(actions.deleteFromCart('foo')).toEqual({
        type: types.DELETE_ITEM,
        productId: 'foo'
      });
    });
    it('addToCart', () => {
      expect(actions.addToCart('foo', 7)).toEqual({
        type: types.ADD_TO_CART,
        productId: 'foo',
        quantity: 7
      });
    });
    it('setCartQuantity', () => {
      expect(actions.setCartQuantity('foo', 7)).toEqual({
        type: types.SET_CART_QUANTITY,
        productId: 'foo',
        quantity: 7
      });
    });
    it('toggleCartDropdown', () => {
      expect(actions.toggleCartDropdown()).toEqual({
        type: types.TOGGLE_CART_DROPDOWN_OPEN
      });
    });
    it('setCartDropdown', () => {
      expect(actions.setCartDropdown(true)).toEqual({
        type: types.SET_CART_DROPDOWN_OPEN,
        isOpen: true
      });
      expect(actions.setCartDropdown(false)).toEqual({
        type: types.SET_CART_DROPDOWN_OPEN,
        isOpen: false
      });
    });
  });
  describe('Reducers', () => {
    describe('cart', () => {
      let state = [];
      it('defaults to []', () => {
        state = reducers.cart();
        expect(state).toEqual([]);
      });
      it('can add items', () => {
        state = reducers.cart(state, {
          type: types.ADD_TO_CART,
          productId: 'foo',
          quantity: 3
        });
        expect(state).toEqual([{ productId: 'foo', quantity: 3 }]);
        state = reducers.cart(state, {
          type: types.ADD_TO_CART,
          productId: 'bar',
          quantity: 1
        });
        expect(state).toEqual([
          { productId: 'foo', quantity: 3 },
          { productId: 'bar', quantity: 1 }
        ]);
      });
      it('can set a quantity', () => {
        state = reducers.cart(state, {
          type: types.SET_CART_QUANTITY,
          productId: 'bar',
          quantity: 7
        });
        expect(state).toEqual([
          { productId: 'foo', quantity: 3 },
          { productId: 'bar', quantity: 7 }
        ]);
      });
      it('can delete an item', () => {
        state = reducers.cart(state, {
          type: types.DELETE_ITEM,
          productId: 'foo'
        });
        expect(state).toEqual([{ productId: 'bar', quantity: 7 }]);
      });
    });
    describe('cartDropdownIsOpen', () => {
      let state = false;
      it('defaults to false', () => {
        state = reducers.cartDropdownIsOpen(undefined);
        expect(state).toBe(false);
      });
      it('can be set manually', () => {
        state = reducers.cartDropdownIsOpen(state, {
          type: types.SET_CART_DROPDOWN_OPEN,
          isOpen: true
        });
        expect(state).toBe(true);
        state = reducers.cartDropdownIsOpen(state, {
          type: types.SET_CART_DROPDOWN_OPEN,
          isOpen: false
        });
        expect(state).toBe(false);
      });
      it('can be toggled', () => {
        state = reducers.cartDropdownIsOpen(state, {
          type: types.TOGGLE_CART_DROPDOWN_OPEN
        });
        expect(state).toBe(true);
        state = reducers.cartDropdownIsOpen(state, {
          type: types.TOGGLE_CART_DROPDOWN_OPEN
        });
        expect(state).toBe(false);
      });
    });
  });
});
