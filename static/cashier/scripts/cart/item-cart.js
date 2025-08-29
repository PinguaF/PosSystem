function add_to_cart(pID){
    let current_pos_id = $('.pos_id').text()
    var cart = JSON.parse(localStorage.getItem("cart"+current_pos_id)) || {}
    if(typeof cart[pID] !== "undefined"){
        cart[pID]['count']++
    } else {
        var product = {}
            product[pID] = {
                "longname": $(`#${pID}`).attr('longname'),
                "shortname": $(`#${pID}`).attr('shortname'),
                "price": $(`#${pID}`).attr('price'),
                "pid": pID,
                "cid": pID,
                "count": 1
            }
        cart[pID] = product[pID]
    }

    let current_order_id = $('.ti-current-order-id').val()
    let current_pos_channel = $('.pos_channel').text()
    let current_pos_cashier = $('.pos_cashier').text()
    if(current_order_id == 0){
        socket.emit('create_order', {'pos_id': current_pos_id, 'json_order': cart, 'channel':current_pos_channel, 'cashier':current_pos_cashier})
    } else {
        socket.emit('update_order', {'id': current_order_id, 'json_order': cart, 'pos_id':current_pos_id, 'cashier':current_pos_cashier})
    }
    
}

function delete_product(){
    var cart = JSON.parse(localStorage.getItem("cart")) || {};
    var cid = $('.active-product').attr('cid')
    delete cart.cid
    localStorage.setItem('cart', JSON.stringify(cart))
}

$('.delete-item').on('click', function(){
    let current_pos_id = $('.pos_id').text()
    var cart = JSON.parse(localStorage.getItem("cart"+current_pos_id)) || {};
    var cid = $('.active-product').attr('cid')
    let current_order_id = $('.ti-current-order-id').val()
    let current_pos_cashier = $('.pos_cashier').text()
    cart[cid]['count'] = 0
    socket.emit('update_order', {'id': current_order_id, 'json_order': cart, 'pos_id':current_pos_id, 'cashier':current_pos_cashier})
    //localStorage.setItem('cart', JSON.stringify(cart))
})