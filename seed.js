const db = require("./models");

let dishes_list = [
    { name: 'eggs', completed: false , price: 12.00, description:"sadd" },
    { name: 'chicken', completed: false , price: 10.00, description:"asdds" },
    { name: 'yougurt', completed: false , price: 11.00, description:"asddsa" },
    { name: 'milk', completed: false , price: 9.00, description:"asddsa" },
    { name: 'chocolate', completed: false , price: 8.00, description:"asddsa" },
];


db.Dish.remove({}, (err, dishes)=>{
    if(err) {
        console.log('Error occurred in remove', err);
    } else {
        console.log('removed all dishes');

    // create new dishes based on the array dishes_list
    db.Dish.create(dishes_list, (err, dishes)=>{
        if (err) { return console.log('err', err); }
        console.log("created", dishes.length, "dishes");
    });
    }
});

