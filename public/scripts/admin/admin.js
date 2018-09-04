$(document).ready(function(){

    checkForLogin();

    function checkForLogin(){
        if(localStorage.length > 0){

        let jwt = localStorage.token
        $.ajax({
            type: "POST", //GET, POST, PUT
            url: '/verify',  
            beforeSend: function (xhr) {   
                xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.token);
            }
        }).done(function (response) {
            console.log(response)
            user = { email: response.email, _id: response._id, isAdmin: response.isAdmin}
            console.log("you can access variable user: " , user)
            if (user.isAdmin){
                $('#adminName').text(`Admin: ${ response.email || response.result.email} `)
                logged();
            }

        }).fail(function (err) {
            console.log(err);
        });
            $('#yesToken').toggleClass('show');
        } else {
            $('#noToken').toggleClass('show');
        }
    }

    function logged (){
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/admin",
            success: getOrders,
        })
    }

    //AJAX request to get all orders from the data base
    function getOrders(){
        $.ajax({
            method: "GET",
            url: 'http://localhost:3000/api/orders',  
            success: function (json){
                for(let i = 0; i < json.data.length ; i++){
                    $("#ControlList").append(   `<div class="Ord" id="number${i}" style="border-bottom: 2px solid white">
                                                    Order number: ${i} // by: ${json.data[i]._user} //Created at: ${json.data[i].createdAt}
                                                    <div id="order-${i}"></div>
                                                </div>`);
                    for(let j = 0; j < json.data[i].dishes.length ;j++){
                        $(`#order-${i}`).append(`<li>${json.data[i].dishes[j].name}</li>`);
                    }
                    $(`#number${i}`).append(`Total price: $${json.data[i].totalPrice} ||
                                            Payment: ${json.data[i].paymentMethod} || 
                                            <input value="${json.data[i]._id}" type='hidden'>
                                            <label for="status">Completed:</label> 
                                            <input type="checkbox" id="status" value="status"> ||
                                            <button class="del" disabled> Delete</button>`);
                }
            
                $("[type=checkbox]").click(function() {
                    $(this).siblings("button").attr("disabled", !this.checked);
                });
                
            $("#ControlList").children("div").on("click", ".del", function(e){
                e.preventDefault();
                let delOrderId = $(this).siblings("input").attr("value");
                //AJAX request to delete an existing order
                $.ajax({
                    method: "DELETE",
                    url: `http://localhost:3000/api/orders/${delOrderId}`,
                    success: function(){
                        $(this).parent().remove();
                        location.reload();
                    },
                    error: function(){
    
                    }
                });
            });
            },
            error: function(error){
                console.log(error);
            }
        });
    }
    
})