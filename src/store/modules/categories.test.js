import categoriesModule from './categories';
const { actions, types, reducers } = categoriesModule;

describe('store/categories', () => {
  it('has the right types', () => {
    expect(types).toEqual({
      LOAD_CATEGORY: 'categories.LOAD_CATEGORY'
    });
  });
  describe('action creators', () => {
    it('loadCategory', () => {
      expect(
        actions.loadCategory({
          name: 'foo',
          title: 'bar',
          description: 'baz',
          products: [{ productId: 'a' }, { productId: 'b' }],
          productIdList: ['a', 'b']
        })
      ).toEqual({
        type: types.LOAD_CATEGORY,
        name: 'foo',
        title: 'bar',
        description: 'baz',
        products: [{ productId: 'a' }, { productId: 'b' }],
        productIdList: ['a', 'b']
      });
    });
  });
  describe('reducer/categories', () => {
    describe('categories', () => {
      let state = {};
      it('defaults to {}', () => {
        state = reducers.categories();
        expect(state).toEqual({});
      });
      it('can load a category (or two)', () => {
        state = reducers.categories(state, {
          type: types.LOAD_CATEGORY,
          name: 'foo',
          title: 'bar',
          description: 'baz',
          products: [{ productId: 'a' }, { productId: 'b' }],
          productIdList: ['a', 'b']
        });
        expect(state).toEqual({
          foo: {
            description: 'baz',
            productIdList: ['a', 'b'],
            title: 'bar'
          }
        });
        state = reducers.categories(state, {
          type: types.LOAD_CATEGORY,
          name: 'aaaa',
          title: 'bbbb',
          description: 'dddd',
          products: [{ productId: 'c' }, { productId: 'd' }],
          productIdList: ['c', 'd']
        });
        expect(state).toEqual({
          foo: {
            description: 'baz',
            productIdList: ['a', 'b'],
            title: 'bar'
          },
          aaaa: {
            description: 'dddd',
            title: 'bbbb',
            productIdList: ['c', 'd']
          }
        });
      });
    });
  });
});
