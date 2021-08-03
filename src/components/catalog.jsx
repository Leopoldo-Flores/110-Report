import React, { Component } from "react";
import Item from "./item";
import "./catalog.css";
import ItemService from "../services/itemService";

class Catalog extends Component {
  state = {
    items: [],
    categories: [],
    selectedCategory: "",
  };

  
  // display elements on the screen
  render() {
    let itemsToDisplay = this.state.items;

    if (this.state.selectedCategory) {
      // filter your items array
      itemsToDisplay = itemsToDisplay.filter((item) => item.category === this.state.selectedCategory);
    }

    return (
      <div className="catalog-page">
        <h3>{this.state.items.length} Amazing silicone pets to take home!</h3>

        <div className="filter-buttons">
          <button onClick={() => this.filterItems("")} className="btn btn-info">
              All items
            </button>        

          {this.state.categories.map((cat) => (
            <button onClick={() => this.filterItems(cat)} className="btn btn-info" key={cat}>
              {cat}
            </button>
          ))}
        </div>

        <div className="item-container">
          {itemsToDisplay.map((prod) => (
            <Item key={prod._id} prod={prod}></Item>
          ))}
        </div>
      </div>
    );
  }
        
  filterItems = (category) => {
    console.log("Filtering", category);
    this.setState({ selectedCategory: category });
  };

  // called after the render function
  async componentDidMount() {
    console.log("Catalog did mount");

    // call the service to get the list of items
    var itemService = new ItemService();
    var items = await itemService.getCatalog();
    console.log(items);
    this.setState({ items: items });

    // identify the unique categories
    // let cats = [];
    // for (let i = 0; i < items.length; i++) {
    //   let cat = items[i].category;

    //   if (!cats.includes(cat)) {
    //     cats.push(cat);
    //   }
    // }

    // GET CATEGORIES FROM SERVER
    let cats = await itemService.getCategories();
    console.log("categories from server", cats);

    this.setState({ categories: cats});
  }
}

export default Catalog;