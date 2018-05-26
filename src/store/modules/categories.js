import get from 'lodash/get';
import { makeTypes, qdHash36 } from '../../util'; // If we were using webpack, I'd create a util folder with an alias;
import request from 'superagent';

// types
export const types = makeTypes('categories', 'LOAD_CATEGORY');

// one-off functions (isolated for testing)

// actions (technically action creators);
const loadCategory = ({
  name,
  title,
  description,
  products,
  productIdList
}) => ({
  type: types.LOAD_CATEGORY,
  name,
  title,
  description,
  products,
  productIdList
});

// async actions
const getCategory = name => (dispatch, getState) =>
  request
    .get(`${window.location.origin}/categories.json`)
    .then(resCategory => get(resCategory, ['body', name], ''))
    .then(categoryData =>
      request
        .get(`${window.location.origin}/${categoryData.productList}`)
        .then(resProductList => {
          // create unique ID for each product at ingestion. Since an ID is not provided by the backend,
          // we'll use a hash to generate it. Note that there may be the possibility of collisions
          // using this method.
          const products = resProductList.body.map(prod =>
            Object.assign({}, prod, {
              productId: qdHash36(JSON.stringify(prod)),
              categoryName: name
            })
          );
          // creates an O(1) map instead of having to O(n) .filter or .find;
          const productIdList = products.map(prod => prod.productId);
          dispatch(
            loadCategory({
              name,
              title: categoryData.title,
              description: categoryData.description,
              products,
              productIdList
            })
          );
        })
    );

const categories = (state = {}, action = {}) => {
  switch (action.type) {
    case types.LOAD_CATEGORY:
      const { title, description, productIdList, name } = action;
      return Object.assign({}, state, {
        [name]: { title, description, productIdList }
      });
    default:
      return state;
  }
};

export default {
  types,
  actions: { loadCategory, getCategory },
  reducers: { categories }
};
