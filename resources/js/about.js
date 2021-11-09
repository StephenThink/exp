// import Flickity from 'flickity';
import Flickity from 'flickity-as-nav-for';

// let slider = document.querySelector('.smarter-choice-slider')

// var flkty = new Flickity( slider , {
//     // options
//     pageDots: false,
//     prevNextButtons: true,
//     cellAlign: 'left',
//     contain: true
// });

// fix the arrows for the smarter slider



window.smarterChoiceSlider = function() {
    return {
        ww: window.innerWidth,
        containerRight: document.querySelector('.the-smarter-choice').querySelector('.container').getBoundingClientRect().right,
        slider: document.querySelector('.smarter-choice-slider'),
        flkty: null,
        init() {
            this.flkty = new Flickity( this.slider , {
                // options
                pageDots: false,
                prevNextButtons: true,
                cellAlign: 'left',
                contain: true,
                wrapAround: true
            }),
            this.setMargin()
            this.moveButtons()
        },
        resize() {
            this.ww = window.innerWidth
            this.containerRight = document.querySelector('.the-smarter-choice').querySelector('.container').getBoundingClientRect().right

            if( this.ww >= 1024) {
                console.log('resizing')
                this.setMargin()
                this.flkty.resize()
            } else {
                console.log('not')
            }

        },
        width() {
            return 0
            // return (this.ww - this.containerRight) * -1
        },
        setMargin() {
            return this.$el.style.marginRight = (this.width() > 0 ? 0 :  this.width() + "px")
        },
        moveButtons() {

            let container = document.querySelector('.the-smarter-choice')
            let left = this.slider.querySelector('.flickity-button.previous')
            let right = this.slider.querySelector('.flickity-button.next')

            let div = document.createElement('div')

            div.classList.add('arrow-holder', 'py-8', 'container', 'justify-end', 'flex','-mx-5')

            div.appendChild(left)
            div.appendChild(right)

            container.appendChild(div)

        }
    }
}
