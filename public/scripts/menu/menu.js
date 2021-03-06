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
            user = { email: response.email, _id: response._id }
            console.log("you can access variable user: " , user)
            $('#adminName').text(`Logged as: ${ response.email || response.result.email}`)
            $(".Foodlist").append(`<input type="hidden" name="_user" value="${user._id}">`)
            console.log(user._id)
            logged();

        }).fail(function (err) {
        });
            $('#yesToken').toggleClass('show');
        } else {
            $('#noToken').toggleClass('show');
            window.location.href = "http://localhost:3000/menuout";
        }
    }

    function logged (){
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/menu",
            success: NowOrder,
        })
    }

    //AJAX request to show menu
    function NowOrder(){
        $.ajax({
            method: "GET",
            url: 'http://localhost:3000/api/dishes',  
            success: function (json){
                for (let i = 0; i < json.data.length; i++){
                    $(".photo").append(`<div class="wrap">
                                            <img src=${json.data[i].image} value="${json.data[i].name}" 
                                            name=${json.data[i].price} data-id=${json.data[i]._id}>
                                            <div class="middle">
                                                <div class="centered">${json.data[i].name} $${json.data[i].price}</div>
                                            </div>
                                        </div>`);
                }
            },
            error: function(error){
                console.log(error);
            },
        });
    
        //AJAX request to create order
        $("#orderNow").on('click', event =>{
            event.preventDefault();
            var payment = $("#Payment").val();
            $("input[name='paymentMethod']").attr("value",`${payment}`)
            let newOrder = $("form").serialize();
            if($(".Foodlist").find("p").length > 0){
                if(payment === null){
                    alert("Please select a valid payment method");
                } else{
                    $.ajax({
                        method: "POST",
                        url: 'http://localhost:3000/api/orders',
                        data: newOrder,
                        success: json =>{
                            console.log(json)
                        },
                    });
                    alert("Thanks for your order");
                    window.location.href = "http://localhost:3000/";
                }
            } else if($(".Foodlist").find("p").length == 0){
                alert("Please make a valid order");
            }
        });
    
        function CalculateTotal(){
            let array = $("input[name='price']");
            var total_array = [];
            for(let i = 0; i < array.length ; i++){
                total_array.push(parseFloat(array[i].getAttribute("value")));
            }
            var sum = 0.00;
            for(let j = 0; j < total_array.length;j++){
                sum = sum + total_array[j]
            }
            document.getElementById("showPrice").innerText = `Total Price: $${Math.round(sum * 100)/100}`
            document.getElementById("TotalPrice").value = `${sum}`
            return sum;
        }
    
        $('.photo').on('click',"img",function(e){
            e.preventDefault();
            var item = $(this).attr("value");
            var itemId = $(this).attr("data-id");
            var price = $(this).attr("name");
            $('.Foodlist').append(`
            <div>
                <p>${item}   $${price}<button class="DeleteBtn">delete</button></p>
                <input name="dishes" value="${itemId}" type='hidden'>
                <input name="price" value="${price}" type='hidden'>
            </div>`);
            CalculateTotal();
        });
    
        $(".Foodlist").on("click",".DeleteBtn",function(event){
            event.preventDefault();
            // console.log($(this).parent().parent());
            $(this).parent().parent().remove()
            CalculateTotal();
        })
    
    }
    

})