$('.mng-kb-button').on("click", function(){
    $('.mng-kb-input').val($('.mng-kb-input').val()+$(this).text())
})
$('.mng-kb-clear').on("click", function(){
    $('.mng-kb-input').val('')
})


$('.reload-this-pos').on("click", function(){
    location.reload()
})


$('.reload-all-pos').on("click", function(){
    socket.emit('command_reload_all_pos')
})


$('.mng-clear-cart').on('click', function(){
    localStorage.clear()
    render_cart()
})


$('.pos-system-info').on("click", function(){
    showalert('Информация о POS:', 
        `Версия: ${"---= DuckPos v3.1 =---"} <br/>Активный менеджер:${ 303 }<br/><br/>Касса: ${1}<br/>Кассир: ${24}<br/><br/>Время: ${$('.ti-curent-time').val()} `)
})


socket.on('reload_all_pos', function() {
    location.reload()
});
socket.on('reload_pos', function(data) {
    let current_pos_id = $('.pos_id').text()
    if(current_pos_id == data['pos']){
        location.reload()
    }
});
