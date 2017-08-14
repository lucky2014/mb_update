var w = $("#swiper3 .swiper-slide").attr("w");
var h = $("#swiper3 .swiper-slide").attr("h");
var h3s = h/$(window).width()*w*0.92*0.58;

$("#swiper3 .swiper-wrapper, #swiper3").css({"height":h});
            
var swiper3 = new Swiper('#swiper3', {
    pagination: '',
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflow: {
        rotate: 30,
        stretch: 0,
        depth: 120,
        modifier: 2,
        slideShadows : true
    },
    loop: 1,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
}); 