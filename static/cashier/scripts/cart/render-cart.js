/*socket.on('create_order', function(data) {
    //render_cart(data[answ][2])
    alert(data[answ][2])
});
socket.on('update_order', function(data) {
    //render_cart(data[answ][2])
    alert(data[answ][2])
});
socket.on('end_order', function(data) {
    //render_cart(data[answ][2])
    alert(data[answ][2])
});*/

socket.on('answer_get_order', function(data) {
    let current_pos_id = $('.pos_id').text()
    const order = data['answ']
    console.log(order)
    if(order[4] == current_pos_id){
        $('.ti-current-order-id').text(order['id'])
        cart = JSON.parse(String(order[2]).replaceAll(`'`,'"')) || {}
        $('.js-temp-cart').text(String(order[2]).replaceAll(`'`,'"'))
        localStorage.setItem('cart'+current_pos_id, JSON.stringify(cart))
        $('.cart').empty();
    let total_price = 0
    for(var product in cart){
        if(cart[product]['count']>0){
            let product_html =  
                `<div class="cart-item" cid="${product}">
                    <p>${cart[product]['count']}</p>
                    <p>${cart[product]['shortname']}</p>
                    <p>${parseFloat(cart[product]['price'])*parseFloat(cart[product]['count']) }</p>
                </div>`
            $('.cart').append(product_html)
            total_price += parseFloat(cart[product]['price'])*parseFloat(cart[product]['count'])
        } else {
            let product_html =  
                `<div class="cart-zero" cid="${product}">
                    <p></p>
                    <p>${cart[product]['shortname']}</p>
                    <p></p>
                </div>`
            $('.cart').append(product_html)
        }
        $('.cart-info').val(total_price)
    }
    //ACTIVE
    $('.cart-item').off().on('click', function(){
        $('div').removeClass('active-product')
        $(this).addClass('active-product')
    })
    }
});






/*
function render_cart(){
    let current_order_id = $('.ti-current-order-id').text()
    let current_pos_id = $('.pos_id').text()
    let current_pos_channel = $('.pos_channel').text()
    let current_pos_cashier = $('.pos_cashier').text()
    var cartJSON = JSON.parse(localStorage.getItem("cart"))
    if(current_order_id == 0){
        socket.emit('create_order', {'pos_id': current_pos_id, 'json_order':cartJSON, 'channel':current_pos_channel, 'cashier':current_pos_cashier})
    } else {
        socket.emit('update_order', {'id': current_order_id, 'json_order':cartJSON, 'pos_id':current_pos_id, 'cashier':current_pos_cashier})
    }
  var cart = JSON.parse(localStorage.getItem("cart")) || {};
    $('.cart').empty();
    for(var product in cart){
        if(cart[product]['count']>0){
            let product_html =  
                `<div class="cart-item" cid="${product}">
                    <p>${cart[product]['count']}</p>
                    <p>${cart[product]['shortname']}</p>
                    <p>${cart[product]['price']}</p>
                </div>`
            $('.cart').append(product_html)
        } else {
            let product_html =  
                `<div class="cart-zero" cid="${product}">
                    <p></p>
                    <p>${cart[product]['shortname']}</p>
                    <p></p>
                </div>`
            $('.cart').append(product_html)
        }
    }

    //ACTIVE
    $('.cart-item').off().on('click', function(){
        $('div').removeClass('active-product')
        $(this).addClass('active-product')
    })
       
} */