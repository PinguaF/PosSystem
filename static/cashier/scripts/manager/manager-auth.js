async function manager_auth(){
    $('.manager-auth').show()
    $('.manager-password').val('')
    return new Promise(function(resolve, reject){
        $('.mng-kb-exit').one('click', function(){
             $('.manager-auth').hide()
            resolve(false)
        })
        $('.mng-kb-confirm').one('click', function(){
            $('.manager-auth').hide()
            fetch("/mnglogin", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({"username": "303","password": "303"})})
            .then(function (response) {
                return response.text();
            }).then(function (text) {
                if(text == "MNG_Auth"){
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
            })
    })
}

$('.mng-kb-button').on('click', function(){
    $('.manager-password').val($('.manager-password').val()+$(this).text())
})


$('.manager-menu').on('click', function(){
    manager_auth().then(function(result){
        if(result){
            $('.main-page').hide()
            $('.manager-screen').show()
        }else{
            showalert("Ошибка","Неверный пароль!")
        }
    })
})

$('.mng-return').on('click', function(){
    $('.main-page').show()
    $('.manager-screen').hide()
})