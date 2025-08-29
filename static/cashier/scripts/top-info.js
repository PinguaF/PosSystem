function set_current_info(){
    let date = new Date();
    let current_time = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    $('.ti-curent-time').val(current_time)

    let current_pos_id = $('.pos_id').text()
    $('.ti-current-pos-number').val(`POS ${current_pos_id}`)

    let current_pos_channel = $('.pos_channel').text()
    $('.ti-current-pos-channel').val(current_pos_channel)

    let current_pos_state = $('.pos_state').text()
    $('.ti-current-state').val(current_pos_state)

    let current_pos_cashier = $('.pos_cashier').text()
    if(current_pos_cashier=="NULL"){
        $('.ti-current-cashier').val("Не зарегестрирован")
    } else {
        $('.ti-current-cashier').val(current_pos_cashier)
    }
    
}

setInterval(set_current_info, 1000)