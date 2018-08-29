//Dish (hard coded)
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: String,
    completed: Boolean,
    price: Number,
    description:String, //Customer specifications
});

const Dish = mongoose.model('Person', dishSchema);

module.exports = Dish;