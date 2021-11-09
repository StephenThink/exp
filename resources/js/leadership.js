import Flickity from 'flickity-as-nav-for'

let slider = document.querySelector('.department-manager-slider')

var flkty = new Flickity( slider , {
    // options
    pageDots: false,
    prevNextButtons: true,
    cellAlign: 'left',
    contain: true,
    wrapAround: true
});


let container = document.querySelector('.department-managers').querySelector('.container')

let left = slider.querySelector('.flickity-button.previous')
let right = slider.querySelector('.flickity-button.next')

let div = document.createElement('div')

div.classList.add('arrow-holder', 'py-8', 'container', 'justify-end', 'flex', '-mx-5')

div.appendChild(left)
div.appendChild(right)

container.appendChild(div)