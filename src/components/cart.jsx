import React, { Component } from 'react';
import storeContext from '../context/storeContext';
import ItemInCart from "./itemInCart";
import "./cart.css";
import ItemService from "./../services/itemService";

class Cart extends Component {
    static contextType = storeContext;

    state = {
        cuponCode: "",
        discount: 0,
    };

    render() {
        return (
            <div className="cart-page">
                <h4>Shopping Cart</h4>
                
                <div className="product-container">
                    {this.context.cart.map((prod) => (
                        <ItemInCart key={prod._} prod={prod}></ItemInCart>
                    ))}
                </div>

                <div className="total-container">
                    <div>Total {this.getTotal()}</div>
                    <div>
                        <input type="text" name="cuponCode" value={this.state.cuponCode} onChange={this.handleInputChange}
                            placeholder="Discount code"></input>

                        <button onClick={this.validateCode} className="btn btn-sm btn-dark">
                            Apply
                        </button>
                    </div>

                    <button onClick={this.handelPaceOrder} className="btn btn-block btn-primary">
                        Place Order
                    </button>
                </div>
            </div>
        );
    }

    handlePlaceOrder = async () => {
        let order = {
            user: "Leopoldo",
            cuponCode: this.state.cuponCode,
            products: this.context.cart,
            createdOn: new Date(),
        };

        let service = new ItemService();
        let placedOrder = await service.placeOrder(order);
        console.log(placedOrder);

        /*
            api end point: /api/order
            POST
            recive the order
            save the order in orders collection

        FE service:
            create a method that receives an order
            send the order to the new endpoint

        from the cmp:
            create an instance of the service
            call the new method
        */
    };

    validateCode = async () => {
        let service = new ItemService();
        let res = await service.validateCode(this.state.cuponCode);
        console.log(res);
        if(res.error) {
            alert("Invalid Code")
        }
        else {
            console.log("Discount", + res.discount + "%");
            //TODO: apply the discount to the total
            this.setState({ discount: res.discount });
        }
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    getTotal = () => {
        let total = 0;
        for (let i = 0; i < this.context.cart.length; i++) {
            let product = this.context.cart[i];
            total += product.quantity * product.price;
        }
        
        let discount = total * (this.state.discount / 100);
        return (total - discount).toFixed(2);
    };
}

export default Cart;