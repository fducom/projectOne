$(document).ready(function(){

    //AJAX request to show menu
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/dishes',  
        success: function (json){
            for (let i = 0; i < json.data.length; i++){
                $(".photo").append(`<img src=${json.data[i].image} value="${json.data[i].name}" 
                                    name=${json.data[i].price} data-id=${json.data[i]._id}>`);
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
        console.log(newOrder);
        $.ajax({
            method: "POST",
            url: 'http://localhost:3000/api/orders',
            data: newOrder,
            success: json =>{
                console.log(json)
            },
            
        });
    });

    function CalculateTotal(){
        let array = $("input[name='price']");
        var total_array = [];
        for(let i = 0; i < array.length ; i++){
            total_array.push(parseInt(array[i].getAttribute("value")));
        }
        var sum = 0;
        for(let j = 0; j < total_array.length;j++){
            sum = sum + total_array[j]
        }
        document.getElementById("showPrice").innerText = `Total Price: $${Math.round(sum * 100) / 100}`
        document.getElementById("TotalPrice").value = `${sum}`
        return sum;
    }

    $('.photo').on('click',"img",function(e,json){
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


})