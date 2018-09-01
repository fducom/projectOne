const db = require("./models");

let dishes_list = [
    { name: 'California Roll', completed: false , price: 7.00, description:"sadd", image:"./images/californiaroll.jpg" },
    { name: 'Spicy California Roll', completed: false , price: 8.00, description:"asdds",image:"./images/7789_spicycaliroll.jpg" },
    { name: 'Vegetable California Roll', completed: false , price: 7.50, description:"asddsa",image:"./images/7714_vegecaliroll.jpg" },
    { name: 'Spicy California Spring Roll', completed: false , price: 9.00, description:"asddsa",image:"./images/7789_spicycaliroll.jpg" },
    { name: 'Rainbow Roll', completed: false , price: 8.00, description:"asddsa",image:"./images/8219_rainroll.jpg" },
    { name: 'Salmon Avocado Roll', completed: false , price: 6.90, description:"asddsa",image:"./images/7673_salmavoroll.jpg" },
    { name: 'Atlantic Salmon Avocado Roll', completed: false , price: 9.00, description:"asddsa",image:"./images/7673_salmavoroll.jpg" },
    { name: 'Spicy Salmon Roll', completed: false , price: 7.80, description:"asddsa",image:"./images/7739_spicysalm.jpg" },
    { name: 'Spicy Tuna Roll', completed: false , price: 8.50, description:"asddsa",image:"./images/7829_spicytuna.jpg" },
    { name: 'Salmon Volcano Roll', completed: false , price: 9.00, description:"asddsa",image:"./images/7673_salmavoroll.jpg" },
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

