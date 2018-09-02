$(document).ready(function(){

    //AJAX request to get all orders from the data base
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/orders',  
        success: function (json){
            for(let i = 0; i < json.data.length ; i++){
                $("#ControlList").append(   `<div id="number${i}" style="border-bottom: 2px solid white">
                                                Order number: ${i}
                                                <div id="order-${i}">
                                                <input value="${json.data[i]._id}" type='hidden'>
                                                </div>
                                            </div>`);
                for(let j = 0; j < json.data[i].dishes.length ;j++){
                    $(`#order-${i}`).append(`<li>${json.data[i].dishes[j].name}</li>`);
                }
                $(`#number${i}`).append(`<p>
                                            Total price: $${json.data[i].totalPrice} 
                                            <button class="DeleteBtn">Delete Order</button>
                                        </p>`);
            }
        },
        error: function(error){
            console.log(error);
        },
    });

    $("#ControlList").on('click',".DeleteBtn", event =>{
        console.log($(this).parent().siblings("div").find("input"));
        let delOrderId = $();
        //AJAX request to delete one order
        // $.ajax({
        //     method: "DELETE",
        //     url: 'http://localhost:3000/api/orders',
        //     data: delOrderId,
        //     success: json =>{
        //         
        //     },
        // });
    });
})