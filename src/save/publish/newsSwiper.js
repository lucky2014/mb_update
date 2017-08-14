/*var w = $("#swiper1 .swiper-slide").attr("w");
var h = $("#swiper1 .swiper-slide").attr("h");
var h2s = h*$(window).width()*.4/h;

$("#swiper1 .swiper-wrapper,#swiper1 .swiper-slide, #swiper2").css({"height":h2s});*/
            
var mySwiper2 = new Swiper ('#swiper2', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
   autoplay: 2000
});