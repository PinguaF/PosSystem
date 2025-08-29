$('.take-out').on('click', function(){
    let current_order_id = $('.ti-current-order-id').val()
    if(current_order_id == "0"){
        showalert('Ошибка', "Нет текущего заказа в корзине")
    } else {
        $('.main-page').hide()
        $('.tender-screen').show()
    }
    $('.cart-type').val('НВ')
})

$('.take-in').on('click', function(){
    let current_order_id = $('.ti-current-order-id').val()
    if(current_order_id == "0"){
        showalert('Ошибка', "Нет текущего заказа в корзине")
    } else {
        $('.main-page').hide()
        $('.tender-screen').show()
    }
    $('.cart-type').val('ВЗ')
})

$('.back-from-tender').on('click', function(){
    $('.main-page').show()
    $('.tender-screen').hide()
})

$('.save-order').on('click', function(){
    let state='saved'

    let current_type = $('.cart-type').val()
    let current_pos_id = $('.pos_id').text()
    let current_order_id = $('.ti-current-order-id').val()
    let current_pos_channel = $('.pos_channel').text()
    let current_pos_cashier = $('.pos_cashier').text()
    var cart = JSON.parse(localStorage.getItem("cart"+current_pos_id)) || {}
    socket.emit('end_order', {'id':current_order_id, 'json_order':cart, 'pos_id':current_pos_id,
        'cashier':current_pos_cashier, 'type': current_type, 'state': state})
    $('.main-page').show()
    $('.tender-screen').hide()
    let info_html =  
                `<div class="cart-item">
                    <p>***</p>
                    <p>СОХРАНЕН</p>
                    <p>***</p>
                </div>`

    setTimeout(() => $('.cart').append(info_html), 500);
})