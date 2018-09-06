$(document).ready(function(){
    
    $.ajax({
        method: "GET",
        url: 'http://localhost:3000/api/dishes',  
        success: function (json){
            for (let i = 0; i < json.data.length; i++){
                $(".orderList").append(`<div class="resize">
                                            <img src=${json.data[i].image} value="${json.data[i].name}" name=${json.data[i].price} data-id=${json.data[i]._id}>
                                            <div class="card">${json.data[i].name} $${json.data[i].price} </br>${json.data[i].description}</div>
                                        </div>`);
            }
        },
        error: function(error){
            console.log(error);
        },
    });
})