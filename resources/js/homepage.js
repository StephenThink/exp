//import Flickity from 'flickity';

import Flickity from 'flickity-fade';

import lottie from 'lottie-web';

let el = document.querySelector('.homepage-carousel')

if( el ) {

    var flkty = new Flickity( el, {
        // options
        pageDots: true,
        prevNextButtons: false,
        autoPlay: 7500,
        pauseAutoPlayOnHover: false,
        wrapAround: true,
        fade: true
    })

}

//Footer
var svgContainer = document.getElementById('svgContainer');
var animItem = lottie.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: true,
  path: '/assets/site/jonesco-fluid.json'
});

document.location.host;


// Carousel
 var carouselContainer = document.getElementById('carouselContainer');
console.log(carouselContainer);
var animItem2 = lottie.loadAnimation({
  wrapper: carouselContainer,
  animType: 'svg',
  loop: true,
  path: '/assets/site/jonesco-bg-mask.json'
});



animItem2.addEventListener('DOMLoaded', function(event) {
    var car = carouselContainer.querySelector("svg");
    car.removeAttribute('viewBox');
    car.removeAttribute('width');
    car.removeAttribute('height');
    car.removeAttribute('preserveAspectRatio');
    car.style.height = '';
    car.classList.add('h-screen', 'w-screen');
});


