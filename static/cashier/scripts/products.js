socket.on('active_product_list', function(data) {
            for (let product of data['list']){
                switch( String(product[0]).charAt(0) ){
                    case "1": 
                        $(`#${product[0]}`).addClass("burger")
                    break;
                    case "2": 
                        $(`#${product[0]}`).addClass("snacks")
                    break;
                    case "3": 
                        $(`#${product[0]}`).addClass("drinks")
                    break;
                    case "4": 
                        $(`#${product[0]}`).addClass("deserts")
                    break;
                    case "5": 
                        $(`#${product[0]}`).addClass("other")
                    break;
                    case "6": 
                        $(`#${product[0]}`).addClass("other")
                    break;
                }

                if(product[5]=='active'){
                    $(`#${product[0]}`).text(product[2])
                    $(`#${product[0]}`).attr('longname', product[1])
                    $(`#${product[0]}`).attr('shortname', product[2])
                    $(`#${product[0]}`).attr('price', product[3])
                    $(`#${product[0]}`).addClass("js-product")
                } else {
                    $(`#${product[0]}`).text(product[2]+` off`)
                    $(`#${product[0]}`).addClass("disactive")
                }
                
            }
            $('.disactive').off().on("click", function(){
                let name = $(this).text().slice(0, -4)
                showalert('Товар не доступен', `Продукт ${name} временно не доступен для продажи.`)
            })
            $('.js-product').off().on("click", function(){
                add_to_cart($(this).attr('id'))
            })
        });
