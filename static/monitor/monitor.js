var socket = io();

socket.on('reload_all_pos', function() {
    location.reload()
});
socket.on('reload_pos', function(data) {
    let current_pos_id = $('.pos_id').text()
    if(current_pos_id == data['pos']){
        location.reload()
    }
});
/*
function check_state(){
    let current_pos_state = $('.pos_state').text()
    let current_pos_cashier = $('.pos_cashier').text()
    if(current_pos_state=="close" || current_pos_cashier=="NULL"){
        $('.welcome').fadeOut(100)
        $('.order').fadeOut(100)
        $('.close').fadeIn(500)
    } else {
        $('.close').fadeOut(100)
        $('.order').fadeOut(100)
        $('.welcome').fadeIn(500)
    }
}*/
