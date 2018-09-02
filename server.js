const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user')
const jwt = require('jsonwebtoken')

const db = require("./models");

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use('/user', userRoutes);

////////////////////
//  ROUTES       //
///////////////////

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/menu', (req, res) => {
    res.sendFile(__dirname + '/views/menu.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/views/admin.html');
});

////////////////////
//DISHES => USERS //
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
// AUTHENTICATION
///////////////////
    
app.post('/verify', verifyToken, (req, res) => {
    let verified= jwt.verify(req.token, 'waffles')
    console.log("verified: ", verified)
    res.json(verified)
})

// SAMPLE PROTECTED ROUTE!
// protected route - a route only a user with a jwt token in their header can access.
app.post('/protectedPage', verifyToken, (req, res) => {
    console.log(req.token)
    jwt.verify(req.token, 'waffles', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } 
        else if(authData.isAdmin){


        }
        else if(authData.isAdmin === false){
            
            
        }
        else {
            res.json({
            message: 'Post created',
            authData
            });
        }
        });
    });

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Tokenj 
function verifyToken(req, res, next) {
    console.log("in verify...");
    // Get auth header value
    // when we send our token, we want to send it in our header
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader)
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    
        } else {
        // Forbidden
        res.sendStatus(403);
        }
    }

////////////////////
// ORDERS => ADMIN
///////////////////

//Show all orders
app.get("/api/orders", (req,res) =>{
    db.Order.find()
        // populate fills in the dishes id with all the dishes data
        .populate('dishes')
        .exec(function(err, orders){
            if (err) { console.log("index error: " + err); }
            res.json({data:orders});
    });
})

//Show one order
app.get('/api/orders/:id', function (req, res) {
    db.Order.findOne({_id: req.params.id })
        // populate fills in the dishes id with all the dishes data
        .populate('dishes')
        .exec(function(err, orders){
            if (err) { console.log("index error: " + err); }
            res.json({data:orders});
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