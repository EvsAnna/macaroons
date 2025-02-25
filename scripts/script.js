'use strict'

new WOW().init();

const menu = $('#menu');
const product = $('#product');
const name = $('#name');
const phone = $('#phone');
const loader = $('.loader');
const menuLink = $('.menu__item');
const btnChoose = $('.card__action .button');



$('#burger').on('click', function () {
    menu.addClass('open');
});
menu.on('click', function () {
    menu.removeClass('open');
})

const inputs = [product.eq(0), name.eq(0), phone.eq(0)];
$('.order__button').on('click', function () {
    let error = false;
    inputs.forEach((inp) => {
        inp.next().css('display', 'none');
        inp.css('border-color', 'rgb(130, 19, 40)');

        for (let i of inputs) {
            if (!inp.val()) {
                inp.next().css('display', 'block');
                inp.css('border-color', 'red');
                error = true;
            }
        }
    })

    if (!error) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {product: product.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('.form').add($('.order__description')).add($('.order__title')).css('visibility', 'hidden')
                    $('.button').css('transition', 'none');  //чтоб кнопка исчезала сразу, а не через 500мс
                    $('.order__thanks').css('display', 'flex')

                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].val('')
                    }

                    setTimeout(function () {
                        $('.form').add($('.order__description')).add($('.order__title')).css('visibility', 'unset')
                        $('.button').css('transition', 'all 500ms');
                        $('.order__thanks').css('display', 'none')
                    }, 4000)
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            });
    }
})



// изменение даты на правах в футере
$('.right span').text((new Date()).getFullYear());

//плавный скролл
$('.info .button').on('click', function () {
    $('.choose')[0].scrollIntoView({behavior: "smooth"})
})
menuLink.eq(0).on('click', function () {
    $('.choose')[0].scrollIntoView({behavior: "smooth"})
})
menuLink.eq(1).on('click', function () {
    $('.about')[0].scrollIntoView({behavior: "smooth"})
})
menuLink.eq(2).on('click', function () {
    $('.order')[0].scrollIntoView({behavior: "smooth"})
})
$('.present__circle').on('click', function () {
    $('.choose')[0].scrollIntoView({behavior: "smooth"})
})

//маска для телефона
phone.inputmask({"mask": "+375 (99) 999 - 99 - 99"});

// добавление в инпут названия макаруна через кнопку заказать
btnChoose.on('click', function (e) {
    let res = $(e.target).parent().parent().prev().text()

    if (!product.val()) {
        product.val(res);
    } else {
        product.val(product.val() + ', ' + res);
    }

})








