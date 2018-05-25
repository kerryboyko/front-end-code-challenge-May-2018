import React, { Component } from 'react';
import './Product.css';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
        };
    }

    render() {
        return (
            <div className="Product">
                Product { this.state.id }
            </div>
        );
    }
}

export default Product;
