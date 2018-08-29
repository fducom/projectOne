//Dish (hard coded)
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: String,
    completed: Boolean,
    price: Number,
    description:String, //Customer specifications
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;