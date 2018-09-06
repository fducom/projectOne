const db = require("./models");

let orders_list = [
    {dishes: [
        {_id: "5b881415f1f9f81647404f73",
        ref: 'Dish'}
    ],
    paymentMethod: "Cash",
    totalPrice: 18},

    {dishes: [
        {_id: "5b881415f1f9f81647404f72",
        ref: 'Dish'}
    ],
    paymentMethod: "Credit Card",
    totalPrice: 19},

    {dishes: [
        {_id: "5b881415f1f9f81647404f74",
        ref: 'Dish'}
    ],
    paymentMethod: "Debit Card",
    totalPrice: 20},
];

//empties the existing order_list
db.Order.remove({}, (err, orders)=>{
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        console.log('removed all orders');
    // create new records based on the array books_list
    db.Order.create(orders_list, (err, savedOrders)=>{
        if (err) { return console.log('err', err); }
        console.log('created', savedOrders.length,  'orders'); 
        process.exit();
        
    });
    }
});