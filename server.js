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

//All dishes, show each dish
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

////////////////////
//  ORDERS
///////////////////

// Create order
app.post('/api/order', (req, res) => {
    /* This endpoint will add a todo to our "database"
     * and respond with the newly created todo.
     */
    const newTodo = req.body;
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