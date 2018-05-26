import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';
import './Category.css';
import CategoryHero from './CategoryHero';
import CategoryProductGrid from './CategoryProductGrid';

class Category extends Component {
  /* // The commented out code in this file
     // would be part of a real application, 
     // however since we're only loading data for one category,
     // via a JSON file instead of get request, it makes sense to
     // get the category at first mount on any route. 

     // the use of lifecycle events in theory is also why Category is a 
     // React.Component instead of a React.SFC
     
   componentWillMount() {
    if (!this.props.categoryIsLoaded) {
      this.props.getCategory(); // defined in actions and mapped to dispatch;
    }
  }
  */
  render() {
    const { categoryIsLoaded, title, description, productIdList } = this.props;
    return categoryIsLoaded ? (
      <div>
        <CategoryHero title={title} description={description} />
        <CategoryProductGrid productIdList={productIdList} />
      </div>
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const categoryName = get(ownProps, 'match.params.category', '');
  const category = state.categories[categoryName];
  console.log({ category });
  return {
    categoryName,
    categoryIsLoaded: !!category,
    ...category
  };
};

export default withRouter(connect(mapStateToProps)(Category));
