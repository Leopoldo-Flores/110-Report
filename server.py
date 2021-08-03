from flask import Flask, abort, request, render_template
from data import data
import json
from flask_cors import CORS
from config import db, parse_json

app = Flask(__name__)
CORS(app)

# dictionary
me = {
    "name": "Leopoldo",
    "last": "Flores",
    "email": "leopoldoflores2002@gmail.com"
}

# list
products = data
# ["apple", "banana", "carrot"]


@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html")
   # return "Hello from python on wsl"


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/about/me")
def name():
    return me["name"]


@app.route("/about/fullname")
def fullname():
    return me["name"] + " " + me["last"]


@app.route("/api/catalog")
def get_catalog():
    cursor = db.products.find({})
    catalog = [item for item in cursor]
    # for item in cursor:
    #    catalog.append(item)
    return parse_json(catalog)

# create a POST endpoint
# to register new products


@app.route("/api/catalog", methods=['POST'])
def save_product():
    prod = request.get_json()
    db.products.insert(prod)
    return parse_json(prod)

@app.route("/api/order", methods=['POST'])
def save_order():
    order = request.get_json()
    # calculate the total

    total = 0.0
    for prod in order["products"]:
        qnty = prod["products"]
        price = prod["price"]
        total += (qnty * price)
    
    order["total"] =  total

    code = order["cuponCodes"]
    if(len(code) > 0):
        cursor = db.cuponCodes.find({"code": code})
        for cupon in cursor:
            discount = total * (coupon["discount"] / 100)
            total = total - discount
    order["total"] = total
    
    # verify if there is a couponCode on the order, if so
    # verify the coupon and get discount %
    # apply the discount to the order
    db.orders.insert(order)
    return parse_json(order)


@app.route("/api/catalog/<category>")
def get_product_by_category(category):
    data = db.products.find({"category": category})
    results = [item for item in data]

    return parse_json(results)

@app.route("/api/discountCode/<code>")
def validate_discount(code):
    data = db.cuponCodes.find({"code": code})
    for code in data:
        return parse_json(code)    
    
    return parse_json({"ERROR": True, "reason": "invalid code"})


@app.route("/api/catalog/id/<id>")
def get_product_by_id(id):
    for prod in products:
        if(prod["_id"].lower() == id):
            return json.dumps(prod)
    abort(404)

# get the cheapest product
# /api/catalog/cheapest


@app.route("/api/catalog/cheapest")
def get_product_cheapest():
    cheapest = products[0]
    for prod in products:
        if(cheapest["price"] > prod["price"]):
            cheapest = prod
    return json.dumps(cheapest)


@app.route("/api/categories")
def get_categories():
    data = db.products.find({})
    unique_categories = []
    # for prod in products:
    for prod in data:
        category = prod["category"]
        if category not in unique_categories:
            unique_categories.append(category)
    return parse_json(unique_categories)


@app.route("/api/test")
def test_data_manipulation():
    test_data = db.test.find({})
    print(test_data)
    return parse_json(test_data[0])


@app.route("/test/populatecodes")
def test_populate_manipulation():
    db.cuponCodes.insert({"code": "nascar", "discount": 10})
    db.cuponCodes.insert({"code": "aloe", "discount": 7})
    db.cuponCodes.insert({"code": "germs", "discount": 5})
    db.cuponCodes.insert({"code": "acab", "discount": 14})

    return "codes registered"

