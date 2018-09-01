$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/dishes',  
        success: function (json){
            for (let i = 0; i < json.data.length; i++){
                $(".photo").append(`<img src=${json.data[i].image} value="${json.data[i].name}" name=${json.data[i].price}>`);
            }
        },
        error: function(error){
            console.log(error);
        },
    });
    $("#orderNow").on("submit", event =>{
        event.preventDefault();
        let newOrder = $("form").serialize();
        $.ajax({
            method: "POST",
            url: 'http://localhost:3000/api/order',
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
        // console.log(total_array);
        var sum = 0;
        for(let j = 0; j < total_array.length;j++){
            sum = sum + total_array[j]
        }
        document.getElementById("showPrice").innerText = `Total Price: $${Math.round(sum * 100) / 100}`
        console.log($("form").serialize());
        document.getElementById("TotalPrice").value = `${sum}`
        return sum;
    }

    $('.photo').on('click',"img",function(e){
        e.preventDefault();
        var item = $(this).attr("value");
        var price = $(this).attr("name");
        $('.Foodlist').append(`
        <div> 
            <p>${item}   $${price}<button class="DeleteBtn">delete</button></p>
            <input name="name" value="${item}" type='hidden'>
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