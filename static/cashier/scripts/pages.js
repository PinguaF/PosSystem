function change_page(page){
    for (let i = 0; i < 999; i++) {
        $(`.page${i}`).hide()
        $(`[topage = "${i}"]`).removeClass('active')
    }
    $(`.page${page}`).show()
    $(`[topage = "${page}"]`).addClass('active')
}
$(document).ready(function() {
    $(".menu-page").click(function(){
        change_page($(this).attr("topage"))
    })
});