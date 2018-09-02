$(document).ready(function(){

    //AJAX request to get all orders from the data base
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/orders',  
        success: function (json){
            for(let i = 0; i < json.data.length ; i++){
                $("#ControlList").append(`<div id="number${i}" style="border-bottom: 2px solid white">Order number: ${i}<div id="order-${i}"></div></div>`);
                for(let j = 0; j < json.data[i].dishes.length ;j++){
                    // console.log(json.data[i].dishes[j].name)
                    $(`#order-${i}`).append(`<li>${json.data[i].dishes[j].name}</li>`);
                }
                $(`#number${i}`).append(`Total price: $${json.data[i].totalPrice} <button class="DeleteBtn">Delete Order</button>`);
            }
        },
        error: function(error){
            console.log(error);
        },
    });

    $(".DeleteBtn").on('click',"div", event =>{
        event.preventDefault();
        console.log(this);
        //AJAX request to delete one order

        $.ajax({
            method: "DELETE",
            url: 'http://localhost:3000/api/orders',
            data: newOrder,
            success: json =>{
                console.log(json)
            },
            
        });
    });
})