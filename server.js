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
//  DISHES
///////////////////

//Show one dish
app.get('/api/dishes/:id', function (req, res) {
    db.Dish.findOne({_id: req.params.id }, function(err, data) {
        res.json(data);
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
//  ORDERS
///////////////////

app.get("api/orders", (req,res) =>{
    db.Dish.find(function(err, orders){
        if (err) {
            console.log("index error: " + err);
            res.sendStatus(500);
        }
        res.json({data:orders});
    });
})


// Create order
app.post('/api/order', (req, res) => {
    /* This endpoint will add a todo to our "database"
     * and respond with the newly created todo.
     */
    const newOrder = req.body;
    newTodo._id  = parseInt(todos.length);
    todos.push(newTodo);
    res.status(200).json(newTodo);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});