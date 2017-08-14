var w = $("#swiper1 .swiper-slide").attr("w");
var h = $("#swiper1 .swiper-slide").attr("h");
var h1s = h/w*$(window).width();

$("#swiper1 .swiper-wrapper,#swiper1 img, #swiper1").css({"height":h1s,width: "100%"});
            
var mySwiper1 = new Swiper ('#swiper1', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    nextButton: '',
    prevButton: '',
    autoplay: 2000
});