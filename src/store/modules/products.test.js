import productsModule from './products';
const { actions, types, reducers } = productsModule;

describe('store/products', () => {
  it('has the right types', () => {
    expect(types).toEqual({
      ADD_PRODUCTS: 'products.ADD_PRODUCTS'
    });
  });
  describe('action creators', () => {
    it('addProducts', () => {
      expect(
        actions.addProducts([{ productId: 'a' }, { productId: 'b' }])
      ).toEqual({
        type: types.ADD_PRODUCTS,
        products: [{ productId: 'a' }, { productId: 'b' }]
      });
    });
  });
  describe('reducer/products', () => {
    describe('products', () => {
      let state = {};
      it('defaults to {}', () => {
        state = reducers.products();
        expect(state).toEqual({});
      });
      it('can add products', () => {
        state = reducers.products(state, {
          type: types.ADD_PRODUCTS,
          products: [{ productId: 'a' }, { productId: 'b' }]
        });
        expect(state).toEqual({ a: { productId: 'a' }, b: { productId: 'b' } });
      });
      it('can add products after a category retrieval', () => {
        state = reducers.products(state, {
          type: 'categories.LOAD_CATEGORY',
          products: [{ productId: 'c' }, { productId: 'd' }]
        });
        expect(state).toEqual({
          a: { productId: 'a' },
          b: { productId: 'b' },
          c: { productId: 'c' },
          d: { productId: 'd' }
        });
      });
    });
  });
});
