import React, { Component } from "react"; 
import QuantityPicker from "./quantityPicker";

import "./item.css"
import storeContext from "../context/storeContext";

class Item extends Component {
    static contextType = storeContext;

    state = {
        quantity: 1,
    };

    render() {
        return (
            <div className="item">
                <img src={"/images/products/" + this.props.prod.image} alt="item"/>
            
                <h6>{this.props.prod.title}</h6>

                <div className="prices">
                    <label className="info">Total</label>
                    <label className="info">Price</label>
                    <label className="total-value">${this.getTotal()}</label>
                    <label className="price-value">${this.props.prod.price.toFixed(2)}</label>
                </div>

                <div className="item-controls">
                    <QuantityPicker onValueChange={this.handelQuantityChange}></QuantityPicker>

                    <button onClick={this.handleAddButton} className="btn btn-sm btn-light btn-add">
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        );
    }

    handleAddButton = () => {
        //create a copy of the prod
        var copy = {
            ...this.props.prod, //copy ever property from prod
            quantity: this.setState.quantity
        };
        
        // copy.quantity = this.setState.quantity;
        this.context.addProdToCart(copy);
    };

    getTotal = () => {
        let total = this.props.prod.price * this.state.quantity;
        return total.toFixed(2);
    };

    handelQuantityChange = (quantity) => {
        console.log("Quantity changed", quantity);
        this.setState ({ quantity : quantity });
    };
}

export default Item;
