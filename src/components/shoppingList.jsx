import React, { Component } from 'react';
import storeContext from '../context/storeContext';

class ShoppingList extends Component {
    static contextType = storeContext;
    
    state = {  }
    render() { 
        return (
            <div className="shopping-list">
                <div className="capture">
                    <input type="text" />
                    <button onClick={this.handleAddToList} className="btn btn-sm btn-light btn-add">Add To List </button>
                    {this.context.cart.map((prod) =><addToShoppingList key={prod._id} prod={prod}></addToShoppingList>
                    )} 
                </div>
            </div>
        );
    }

    handleAddToList = () => {
        this.context.addToShoppingList("The text from the input here");
    }
}

export default ShoppingList;