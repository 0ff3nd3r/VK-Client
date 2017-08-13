if ($(".swiper-container > .swiper-wrapper > .swiper-slide").length > 0) {
  var photosSwiper = new Swiper('.swiper-container', {
    freeMode: true,
    slidesPerView: 'auto',
    speed: 400,
    spaceBetween: 0
  });
}