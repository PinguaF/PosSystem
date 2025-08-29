function check_state(){
    let current_pos_state = $('.pos_state').text()
    if(current_pos_state=="close"){
        $(".block-message").show()
    } else {
        $(".block-message").hide()
    }
}
    