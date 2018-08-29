const mongoose = require('mongoose');

module.exports = mongoose.model('Dish', 
    new mongoose.Schema({
        name: String,
        completed: Boolean,
        price: Number,
        description:String, //Customer specifications
    })
);
