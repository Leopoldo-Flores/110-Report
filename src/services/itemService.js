import axios from "axios";

var data = [
  {
    _id: "1283a9s8d71123123",
    title: "renald",
    desctiprion: "This is a description of the product",
    image: "renald.jpg",
    price: 1222.33,
    category: "Pet",
    discount: 5,
  },

  {
    _id: "1283a9s8d71123124",
    title: "john",
    desctiprion: "This is a description of the product",
    image: "john.jpg",
    price: 834.63,
    category: "Pet",
    discount: 5,
  },

  {
    _id: "1283a9s8d71123125",
    title: "armon",
    desctiprion: "This is a description of the product",
    image: "armon.jpg",
    price: 3456.38,
    category: "Pet",
    discount: 5,
  },

  {
    _id: "1283a9s8d71123126",
    title: "farmel",
    desctiprion: "This is a description of the product",
    image: "farmel.jpg",
    price: 837.29,
    category: "Pet",
    discount: 5,
  },

  {
    _id: "1283a9s8d71123127",
    title: "larm",
    desctiprion: "This is a description of the product",
    image: "larm.jpg",
    price: 2258.1,
    category: "Pet",
    discount: 5,
  },

  {
    _id: "1283a9s8d71123128",
    title: "lenard",
    desctiprion: "This is a description of the product",
    image: "lenard.jpg",
    price: 1785.38,
    category: "Pet",
    discount: 5,
  },

  {
    _id: "1283a9s8d71123129",
    title: "perma",
    desctiprion: "This is a description of the product",
    image: "perma.jpg",
    price: 1506.54,
    category: "Pet",
    discount: 5,
  },

  {
    _id: "1283a9s8d71123121",
    title: "benard",
    desctiprion: "This is a description of the product",
    image: "benard.jpg",
    price: 2278.29,
    category: "Pet",
    discount: 5,
  },
];

class ItemService {
  async getCatalog() {
    //logic to connec to a server and retrive the list items
    // URL: http://127.0.0.1:5000/api/catalog GET
    let response = await axios.get("http://127.0.0.1:5000/api/catalog");
    return response.data;

    //return mock data
    // return data;
  }

  async saveItem(item) {
    let response = await axios.post("http://127.0.0.1:5000/api/catalog", item);
    //hot fix: add and id if missing
    //todo:ensure server always returns an ID
    let newItem = response.data;
    if (!newItem._id) {
      newItem._id = Math.random().toString();
    }
    console.log("Save Item: ", newItem);
    return newItem;
  }

  //method to get the categories from the server
  async getCategories() {
    let response = await axios.get("http://127.0.0.1:5000/api/categories");
    console.log("Response: ", response.data);
    return response.data;
  }

  async validateCode(code) {
    let response = await axios.get(
      "http://127.0.0.1:5000/api/discountCode/" + code
    );
    return response.data;
  }

  async placeOrder(order) {}

  GetStock(itemId) {}

  getItemPrice(cupon) {}

  async saveItem(item) {
    let response = await axios.post("http://127.0.0.1:5000/api/order");
    //hot fix: add and id if missing
    //todo:ensure server always returns an ID
    let newItem = response.data;
    if (!newItem._id) {
      newItem._id = Math.random().toString();
    }
    console.log("Save Item: ", newItem);
    return newItem;
  }
}

export default ItemService;
