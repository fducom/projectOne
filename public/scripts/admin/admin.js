$(document).ready(function(){

    //AJAX request to get all orders from the data base
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/orders',  
        success: function (json){
            for(let i = 0; i < json.data.length ; i++){
                $("#ControlList").append(   `<div class="Ord" id="number${i}" style="border-bottom: 2px solid white">
                                                Order number: ${i}
                                                <div id="order-${i}"></div>
                                            </div>`);
                for(let j = 0; j < json.data[i].dishes.length ;j++){
                    $(`#order-${i}`).append(`<li>${json.data[i].dishes[j].name}</li>`);
                }
                $(`#number${i}`).append(`Total price: $${json.data[i].totalPrice}
                                        <input value="${json.data[i]._id}" type='hidden'> 
                                        <button class="del"> Delete</button>`);
            }
            $("#ControlList").children("div").on("click", ".del", function(e){
                e.preventDefault();
                let delOrderId = $(this).siblings("input").attr("value");
                //AJAX request to delete an existing order
                $.ajax({
                    method: "DELETE",
                    url: `http://localhost:3000/api/orders/${delOrderId}`,
                    success: json =>{
                        console.log("it's working")
                    },
                });
            });
        },
        error: function(error){
            console.log(error);
        }
    });
})