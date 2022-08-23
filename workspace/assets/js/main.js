$(function(){
    var visual_slide = new Swiper('.visual-slide', {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        speed:800,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.visual-pagination',
            type: 'bullets',
            clickable:true,
        },
        navigation: {
            nextEl: '.visual-button-next',
            prevEl: '.visual-button-prev',
        },
    });
})