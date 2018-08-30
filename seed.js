const db = require("./models");

let dishes_list = [
    { name: 'eggs', completed: false , price: 12.00, description:"sadd" },
    { name: 'chicken', completed: false , price: 10.00, description:"asdds" },
    { name: 'yougurt', completed: false , price: 11.00, description:"asddsa" },
    { name: 'milk', completed: false , price: 9.00, description:"asddsa" },
    { name: 'chocolate', completed: false , price: 8.00, description:"asddsa" },
];

db.Dish.remove({}, function(err, books){
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        console.log('removed all books');

    // create new records based on the array books_list
    db.Dish.create(dishes_list, function(err, dishes){
        if (err) { return console.log('err', err); }
        console.log("created", dishes.length, "dishes");
        process.exit();
    });
    }
});

