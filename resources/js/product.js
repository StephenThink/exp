import Flickity from 'flickity-as-nav-for';


var productFlick = new Flickity( '.other-products-in-this-range-carousel', {
    pageDots: false,
    prevNextButtons: true,
    imagesLoaded: true,
    cellAlign: 'left',
    contain: true,
}) 



var flktyA = new Flickity('.product-carousel', {
    pageDots: false,
    prevNextButtons: true
})

var flktyB = new Flickity( '.carousel-nav', {
    asNavFor: '.product-carousel',
    contain: true,
    prevNextButtons: false,
    pageDots: true
})

