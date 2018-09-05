We decided to solve a Entry level web developer job challange. Here is the premise:

    Functional requirements:

    - Logging with company mail.
    
    - Manage information of employees (3 types: admin, cashier and chef).

    Roles:

    ATM

    - Register orders (list of dishes ordered by customer)

    Chef

    - Mark orders as ready

    Admin
    - Cash flow

    - View orders and their states

    - Orders Report

    Characteristics of the Orders
    State (Command, In process, Completed)
    They must have the client's name
    Date and time of creation of the order
    Type of Payment of the order (Card or Cash)
    Total amount of the order
    Order detail (list of dishes, each with its price)
    In addition to the application in Ruby on Rails you must enable an API and create a web application in AngularJS or ReactJS to which you can only enter the admin and can see the list of employees (system users) and orders (with their respective characteristics) ).

## 1: Express API
We hard coded our API, which was basically our dishes. To do that, first we coded our Dishes Schema:

    ``` javascript

    const orderSchema = new Schema({
        _user: {
            type: Schema.Types.ObjectId,
            ref: ‘User’
        },
        dishes: [{
            type: Schema.Types.ObjectId,
            ref: ‘Dish’
        }],
        paymentMethod: String,
        totalPrice: Number
    });

    ```

    ``` javascript

    const dishSchema = new Schema({
        name: String,
        completed: Boolean,
        price: Number,
        description:String, //Customer specifications
        image: String
    });

    ```
We then proceeded to write our seed.js. We took the dishes from Bento sushi restaurant.

## 2: CRUD
Users can order once they are logged in. When they click on menu, the name, price, description and image of dishes will be loaded. An order belongs to only a user, but it can contain many/ any combination of dishes.

``` javascript

    const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { type: String, required: true , select: false},
    isAdmin: Boolean
})
```

## 3:AJAX
Most of the AJAX request were directed to our database to fill our menu as well as the Admin page. The Admin is able to track orders, see user who order it, check whether is completed or not and delete the completed orders.

## 4:jQuery
Hover animation
    
## 5:Authentication
Following the instructions from our challange, We decided to create a users schema for our Admin (merged chef and admin functionality) and clients roles.
    
## 6:MongoDB
one to many -> order to dishes, one to many users can create multiple orders:
    
## 7:Visual Design
Implemented features like: CSS grid, Bootstrap Navbar, Carousel, Font-awesome icons, on-hover effects and responsive design(ish)