<<<<<<< HEAD
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
=======
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const orderSchema = new Schema({
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    paymentMethod: String,
    totalPrice: Number
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
    
>>>>>>> ff8271a1f247be3daebc6b80382637860d2badaf
