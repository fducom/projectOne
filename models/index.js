const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true } )


const Dish = require('./dishes');
const Order = require("./orders");

//this will make Todo available to anyone who requires index.js
module.exports ={
    Order: Order,
    Dish: Dish
}