$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/dishes',  
        success: function (json){
            for (let i = 0; i < json.data.length; i++){
                $(".photo").append(`<img src=${json.data[i].image} value="${json.data[i].name}" name=${json.data[i].price}>`);
            }
        },
        error: function(){

        },
    });

    $('.photo').on('click',"img",function(e){
        e.preventDefault();
        var item = $(this).attr("value");
        var price = $(this).attr("name");
        console.log(item)
        $('form').append(` 
            <p>${item}   $${price}<button class="DeleteBtn">delete</button></p>
            <input class = 'itemList' type = 'hidden'></input>`)
    });

    $("Foodlist").on("click","button",function(e){
        e.preventDefault();
        console.log($(this));
        $(this).parent().remove()
    })
})