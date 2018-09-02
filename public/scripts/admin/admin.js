$(document).ready(function(){

    //GETS all orders from the data base
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/orders',  
        success: function (json){
            console.log(json);
        },
        error: function(error){
            console.log(error);
        },
    });
})