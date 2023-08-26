const myCustomSlider = document.querySelectorAll('.swiper-container');

for( i=0; i< myCustomSlider.length; i++ ) {

    myCustomSlider[i].classList.add('swiper-container-' + i);
    let swiperCards = new Swiper(".gallery-cards" + (i + 1), {
      loop: true,
      loopedSlides: 4,
      cssMode: true,
      effect: 'fade',
    });
      
    let swiperThumbs = new Swiper(".gallery-thumbs" + (i + 1), {
      loop: true,
      loopedSlides: 4,
      slidesPerView: 3,
      centeredSlides: true,
      slideToClickedSlide: true,
    
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next" + (i + 1),
        prevEl: ".swiper-button-prev" + (i + 1),
      },
    });
  
  swiperThumbs.controller.control = swiperCards;
}