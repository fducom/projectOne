1: Express API

    Built an API to store user order to and data base.
    Authentication routing for user login & admin login
        admin login : 123@123
        admin password: 123
    Created restricted access for different users
    Pulled google map with geo location

2: CRUD

    Created read delete function
    
3:AJAX

    Deploy data from data base to order list in HTML via Ajax

4:jQuery

    Hover animation
    
5:Templating

    
6:MongoDB

    one to many
        order to dishes

    one to many
        users can create multiple orders:

    const userSchema = mongoose.Schema({
        email: { 
            type: String, 
            required: true, 
            unique: true
        },
        password: { type: String, required: true , select: false},
        isAdmin: Boolean
    })

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

    const dishSchema = new Schema({
        name: String,
        completed: Boolean,
        price: Number,
        description:String, //Customer specifications
        image: String
    });
    
7:Git 50+
    
8:Code Style
    
9:Visual Design
    CSS grid
    Bootstrap Navbar , Carousel
    Responsive web
    Font-awesome icon
    Hover effect
    Google maps api