socket.on('answer_get_order', function(data) {
    let current_pos_id = $('.pos_id').text()
    const order = data['answ']
    console.log(order)
    let current_pos_state = $('.pos_state').text()
    let current_pos_cashier = $('.pos_cashier').text()
    if(current_pos_state=="close" || current_pos_cashier=="NULL"){
        $('.welcome').fadeOut(100)
        $('.order').fadeOut(100)
        $('.close').fadeIn(100)
    } else {
        if(order[4] == current_pos_id && order[6]!='saved'){
                    $('.welcome').fadeOut(100)
                    $('.order').show()
                    $('.js-temp-cart').text(String(order[2]).replaceAll(`'`,'"'))
                    $('.product-list').empty();

                    let cart = JSON.parse(String(order[2]).replaceAll(`'`,'"')) || {}
                    let total_price = 0

                    for(var product in cart){
                        if(cart[product]['count']>0){
                        let product_html =  
                            `
                            <p>${cart[product]['count']}</p>
                            <p>${cart[product]['shortname']}</p>
                            <p>${(parseFloat(cart[product]['price'])*parseFloat(cart[product]['count'])).toFixed(2) }</p>
                            `
                        $('.product-list').append(product_html)
                        total_price += parseFloat(cart[product]['price'])*parseFloat(cart[product]['count'])
                        } else {
                            let product_html =  
                            `<div class="cart-zero" cid="${product}">
                            <p></p>
                            <p>${cart[product]['shortname']}</p>
                            <p></p>
                            </div>`
                        //$('.cart').append(product_html)
                        }
                    $('.js-total').text(total_price.toFixed(2))
                    }
                    //socket.emit('get_active_order_id', {'pos_id': current_pos_id})
        //$('.order').fadeIn(10)
            } else{
                if(order[4] == current_pos_id){
                    $('.close').fadeOut(100)
                $('.order').fadeOut(100)
                $('.welcome').fadeIn(100)
                }
            }  
    }
});

let current_pos_id = $('.pos_id').text()
socket.emit('get_active_order_id', {'pos_id': current_pos_id})
socket.on('active_order_id', function(data) {
    console.log(data['active_order_id'])
    if(data['active_order_id'] == 0){
            console.log('No order in proccessing')
            let current_pos_state = $('.pos_state').text()
            let current_pos_cashier = $('.pos_cashier').text()
            if(current_pos_state=="close" || current_pos_cashier=="NULL"){
                $('.welcome').fadeOut(100)
                $('.order').fadeOut(100)
                $('.close').fadeIn(100)
            } else {
                $('.close').fadeOut(100)
                $('.order').fadeOut(100)
                $('.welcome').fadeIn(100)
            }
    } else {
            socket.emit('get_order', {'id': data['active_order_id']})
    }
});