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
    