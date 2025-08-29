$('.confirm-alert').on('click', function(){
    $('.alert-message').hide()
})
$('.alert-message').on('click', function(){
    $('.alert-message').hide()
})

function showalert(label, text){
    $('.alert-label').text(label)
    $('.alert-text').html(text)
    $('.alert-message').show()
}