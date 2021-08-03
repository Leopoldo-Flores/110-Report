import React, { Component } from 'react';
import "./itemInCart.css"

class ItemInCart extends Component {
    state = {};
    render() {
        return (
          <div className="item-in-cart">
            <img src={"/images/products/" + this.props.prod.image} alt="item" />
        
            <div className="item-info">
                <h6>{this.props.prod.title}</h6>
                <label>{this.props.prod.category}</label>
            </div>

            <label>${this.props.prod.price}</label>
            <label>{this.props.prod.quantity}</label>
            <label>${this.getTotal()}</label>
        
            <button className="btn btn-sm btn-danger">Remove</button>
          </div>
        );
    }

    getTotal = () => {
      let total = this.props.prod.price * this.state.quantity;
      return total.toFixed(2);
    };
} 

export default ItemInCart;