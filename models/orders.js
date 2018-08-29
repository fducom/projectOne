const mongoose = require('mongoose');

module.exports = mongoose.model('Orders', 
    new mongoose.Schema({
        _user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
            },
        dishes: [{
            type: Schema.Types.ObjectId,
            ref: 'Dish'
            }],
        totalPrice: Number
    })
);