var socket = io();
$('.js-link-button').on('click', function(){
    let url = $(this).attr("topage")
    //window.open(url, popup = true, menubar = false);
    window.open(url);
})


$('.reload-pos').on('click', function(){
    let pos_id = $(this).attr('pos')
    socket.emit('reload_pos', {'pos_id': pos_id})
})
$('.reload-all-pos').on('click', function(){
    socket.emit('command_reload_all_pos')
})


$('.block-pos').on('click', function(){
    let pos_id = $(this).attr('pos')
    socket.emit('change_pos_block_state', {'pos_id': pos_id, 'state':'close'})
})
$('.unblock-pos').on('click', function(){
    let pos_id = $(this).attr('pos')
    socket.emit('change_pos_block_state', {'pos_id': pos_id, 'state':'open'})
})


$('.unblock-all-pos').on('click', function(){
    socket.emit('change_pos_block_state', {'pos_id': 1, 'state':'open'})
    socket.emit('change_pos_block_state', {'pos_id': 5, 'state':'open'})
    socket.emit('change_pos_block_state', {'pos_id': 6, 'state':'open'})
    socket.emit('change_pos_block_state', {'pos_id': 14, 'state':'open'})
    socket.emit('change_pos_block_state', {'pos_id': 19, 'state':'open'})
})
$('.block-all-pos').on('click', function(){
    socket.emit('change_pos_block_state', {'pos_id': 1, 'state':'close'})
    socket.emit('change_pos_block_state', {'pos_id': 5, 'state':'close'})
    socket.emit('change_pos_block_state', {'pos_id': 6, 'state':'close'})
    socket.emit('change_pos_block_state', {'pos_id': 14, 'state':'close'})
    socket.emit('change_pos_block_state', {'pos_id': 19, 'state':'close'})
})