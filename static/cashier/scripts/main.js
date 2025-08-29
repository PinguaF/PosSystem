var socket = io();

$(document).ready(function() {
    console.log("---= DuckPos v3.1 =---");
    console.log("Only for developers! Not fot commercial!");
    /* script for load */


    change_page(1);
    $('.manager-auth').hide()
    $('.alert-message').hide()
    $('.manager-screen').hide()
    $('.tender-screen').hide()
    check_state()
    
    let current_pos_id = $('.pos_id').text()
    socket.emit('get_active_order_id', {'pos_id': current_pos_id})
    socket.on('active_order_id', function(data) {
        $('.ti-current-order-id').val(data['active_order_id'])
        console.log(data['active_order_id'])
        if(data['active_order_id'] == 0){
            console.log('No order in proccessing')
            localStorage.setItem('cart'+current_pos_id, '{}')
        } else {
            socket.emit('get_order', {'id': data['active_order_id']})
        }
        //render_cart()
    });
    //showalert("Успешно","Касса загружена успешно. Можете приступать к работе. DuckPos v3.1")

    
    /* script for load */
    console.log("ready");
    $(document).click(function () {
        const element = document.documentElement;
        //element.requestFullscreen();        
    })
});