const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require("./models");
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

////////////////////
//  ROUTES
///////////////////


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

////////////////////
//  DISHES => USERS
///////////////////

//Show one dish
app.get('/api/dishes/:id', function (req, res) {
    db.Dish.findOne({_id: req.params.id }, function(err, dish) {
        res.json({data:dish});
    });
});

//Show all dish
app.get('/api/dishes', function (req, res) {
    // send all books as JSON response
    db.Dish.find(function(err, dishes){
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json({data:dishes});
    });
});

// Destroy one dish
app.delete('/api/dishes/:id', (req, res) => {
    // get todo id from url params (`req.params`)
    let dishId = req.params.id;
    // find todo in db by id and delete
    db.Dish.deleteOne(
        { _id: dishId },
        (err, deletedDish) => {
            if(err){ return res.status(400).json({err: "error has occured"})}
            res.json({data:deletedDish});
    });
});

////////////////////
//  ORDERS => ADMIN
///////////////////

//Show all orders
app.get("/api/orders", (req,res) =>{
    db.Order.find()
        // populate fills in the author id with all the author data
        .populate('dishes')
        .exec(function(err, orders){
            if (err) { console.log("index error: " + err); }
            res.json(orders);
    });
})

//Show one order
app.get('/api/orders/:id', function (req, res) {
    db.Order.findOne({_id: req.params.id }, function(err, order) {
        res.json({data:order});
    });
});

//Destroy one order
app.delete('/api/orders/:id', (req, res) => {
    // get todo id from url params (`req.params`)
    let orderId = req.params.id;
    // find todo in db by id and delete
    db.Order.deleteOne(
        { _id: orderId },
        (err, deletedOrder) => {
        if(err){ return res.status(400).json({err: "error has occured"})}
        res.json({data:deletedOrder});
    });
});

// Create order
app.post('/api/orders', function (req, res) {
    let newOrder = req.body;
    db.Order.create(newOrder,(err,savedOrder)=>{
        if(err){ return res.status(400).json({err: "error has occured"})}; 
        res.json({data:savedOrder})
    })
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});