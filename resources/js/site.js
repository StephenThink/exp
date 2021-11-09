let resetFlag = false

// This is all you.
import alpine from 'alpinejs';

import gsap from 'gsap';

import lottie from 'lottie-web';

import "flag-icon-css/css/flag-icon.min.css";

import 'material-icons/iconfont/sharp.css';

import moment from 'moment'

// import Flickity from 'flickity';


// var Flickity = require('flickity-as-nav-for');


import AOS from 'aos';

AOS.init({
    animatedClassName: 'jonesco-animate',
    initClassName: 'jonesco-start',
    useClassNames: false,
    easing: 'ease-out-quad',

    once: true,
});

//  alpine psuedo components.
window.page = function(e) {
    return {
        navHeight: 0,
        nav: document.querySelector('.navbar'),
        main_content: document.querySelector('.main_content'),
        init() {
            this.setItems();

            return
        },

        resize() {

            if( this.navHeight != this.nav.getBoundingClientRect().height && !this.nav.classList.contains('open') ) {
                this.setItems();
            }

        },
        setItems() {
            this.navHeight = this.nav.getBoundingClientRect().height;
            this.main_content.style.paddingTop = this.navHeight + 'px';
            document.documentElement.style.setProperty('--spacing', this.navHeight + 'px');
            return;
        },
        scrollDown(e) {

            let box = document.querySelector('.what-we-do')

            window.scroll({
                top: box.offsetTop - this.navHeight,
                left: 0,
                behavior: 'smooth'
            });
        }

        
    }
}

window.navigation = function() {
    return {
        open : false,
        child : null,
        langDropdown : false,
        slidingSearchBar : false,
        last_open : [],


        lastArray() {
           
            let lal = this.last_open.length;
          //  console.log(lal);
            let removeLL = this.last_open[lal-1];

            switch(lal) {
                case 1:
                    switch(removeLL) {
                        case "Navbar":
                    //    console.log("n");
                        break;
                        case "SBar":
                     //   console.log("s");
                        break;
                        case "LangBox":
                      //  console.log("l");
                        break;
                        default:
                    //    console.log("opps");
                    } ; 
                break;

                case 2:
                switch(removeLL) {
                    case "Navbar":
                  //  console.log("n+");
                    break;
                    case "SBar":
                  //  console.log("s+");
                    break;
                    case "LangBox":
                  //  console.log("l+");
                    break;
                    default:
                  //  console.log("opps+");
                }       ;    

                break;

                case 3:
                switch(removeLL) {
                    case "Navbar":
              //      console.log("n+");
                    break;
                    case "SBar":
             //       console.log("s+");
                    break;
                    case "LangBox":
                        // this.toggleLangBox(75, 0, 'topDown')
                    break;
                    default:
               //     console.log("opps+");
                }       ;    

                break;

                case 4:
                switch(removeLL) {
                    case "Navbar":
//console.log("n+");
                    break;
                    case "SBar":
                //    console.log("s+");
                    break;
                    case "LangBox":
                   //     this.toggleLangBox(75, 0, 'topDown')
                  //      this.last_open.pop();
                    break;
                    default:
                    console.log("opps+");
                };    

                default:
                //console.log("empty");
                break;
            }


           
        },


        checkClick() {
            if (this.open != false) {
                this.open = false;
                this.$el.classList.toggle('open');

               
            }
        },


        toggle(title) {
            return this.child = ( this.child == title ? null : title )
        },
        initialActive() {

            let newChild;

            Array.from(
                document.querySelectorAll('.child .current')
            ).map( function(item) {

                if(item) {
                    return newChild = item.closest('.parent').querySelector('a').dataset.current;
                }

            });

            this.child = newChild;

        },

        toggleLangBox(x, y, direction) {

            let ldb = document.querySelector(`.${direction}`);


            if  (!this.langDropdown) {
                this.last_open.push("LangBox")
                // If the lang box is hidden
                ldb.classList.remove('hidden');
                gsap.fromTo(ldb, {
                    scale: 0,
                    transformOrigin: "0% 0%",
                    duration: .5
                },
                {
                    scale: 1,
                    transformOrigin: `${x}% ${y}%`,
                    duration: .5,
                }
                );
            } else {
                gsap.to(ldb, {
                    scale: 0,
                    transformOrigin: `${x}% ${y}%`,
                    duration: .5,
                    onComplete: () => { ldb.classList.add('hidden') }
                });
            };
            this.langDropdown = !this.langDropdown;

        },

        toggleSearchBar() {
            let containerSize = getComputedStyle(document.documentElement).getPropertyValue('--container-md');
            let ssb = document.querySelector(".sliding-search-bar").querySelector("span");

            if( window.innerWidth < parseInt(containerSize) ) {
                if (!this.open){
                    this.open = !this.open;
                    this.$el.classList.toggle('open');
                    this.$nextTick(() => { this.$refs.searchBar.focus() });
                };
                this.$refs.searchBar.focus();
            } else {
                // Sliding Search bar on a medium upwards screen
                if (!this.slidingSearchBar) {

                        this.slidingSearchBar = !this.slidingSearchBar;

                        //ssb.classList.add('md:block');
                        gsap.to(ssb, {
                            width: "300px",
                            duration: .8,
                            ease: "power4.out",
                            onComplete: () => { this.$refs.slidingSearchBar.focus() }
                        });
                    this.last_open.push("SBar")

                    } else {
                        this.slidingSearchBar = !this.slidingSearchBar;

                        gsap.to(ssb, {
                            width: "0px",
                            duration: .6,
                            ease: "power4.in"
                        });

                        //ssb.classList.remove('md:block');
                    };
                }
        },
    }
}

window.vacancies = function() {

    return {
        
        modalIsOpen: false,
        modal:{
            job_id_label:"",
            job_id:"",
            job_description:"",
            job_title:""
        },

        openModal(job_id, job_id_label, job_description, title){
            
                this.modal.job_id = job_id
                this.modal.job_id_label = job_id_label
                this.modal.job_description = job_description
                this.modal.job_title = title

                this.modalIsOpen = !this.modalIsOpen
        },

        emptyModalsData(){
            this.modal.job_id = ""
                this.modal.job_id_label = ""
                this.modal.job_description = ""
                this.modal.job_title = ""
        },

        jobIdFill(e) {

            let jid = e.target.dataset.jobid; //info Grabs the dataset from a-tag
            let filler = document.querySelector("[name='job_id']"); //info Grabs the name of the input field on the form
            let titleinput = document.querySelector("[name='title']");

            let app_top = this.$refs.vacancy_form.offsetTop; //info Grabs the top of the element
            let fixedSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--spacing')); //info Gets the custom css, and changes it into a integer

            window.scroll({
                top: app_top - fixedSize,
                left: 0,
                behavior: 'smooth'
            });

            filler.value = jid; //info Copies the job id into the Job id input textbox

            titleinput.focus();
        }
    }

}

window.environment = function() {

   

    return {
        
        modalIsOpen: false,
        modal:{
            env_title:"",
            env_text:""
        },

        openModal(title, text){
                        
            this.modal.env_title = title
            this.modal.env_text = text

            this.modalIsOpen = !this.modalIsOpen

        },

        emptyModalsData(){
            this.modal.env_title = ""
            this.modal.env_text = ""
        }
    }

}

window.subcategorySelector = function() {
    return {
        items: [],
        overrides: [],
        init( data, overrides = [] ) {
            data.forEach( (item, index) => {
                item.order = document.querySelector(`[data-section="${item.slug}"]`).dataset.order
            })

            this.items = data.sort((a, b) => a.order - b.order)
            this.overrides = overrides
        },
        overrideCheck(value) {
            //  if we have overrides, try and find one. 
            if(this.overrideCheck.length > 0) {
                this.overrides.forEach( (item, key) => {
                    if( item.default.toLowerCase() == value.toLowerCase()) {
                        value =  item.locale
                    }
                })
            }

            
            return value;

        },
        toggle( e ) {
            
            // let item = this.items[e.target.dataset.index]
            // let selector = `[data-section="${item.slug}"]`
            // let section = document.querySelector( selector )

            // //  Change the status
            // item.active = !item.active

            // if( !item.active ) {
            //     section.classList.add('hidden')
            // } else {
            //     section.classList.remove('hidden')
            // }

            let item = this.items[e.target.dataset.index]
            let selector = `[data-section="${item.slug}"]`
            let section = document.querySelector( selector )
            let myButton = document.getElementsByClassName('all-button')[0]

                    for (let x = 0; x < this.items.length; x++) {
                        this.items[x].active = false // Turns all buttons off
                        //console.log(this.items[x].slug)

                        document.querySelector(`[data-section="${this.items[x].slug}"]`).classList.add('hidden') // Hides all Product Details
                    }

                    item.active = true // Turns selected button on
                    section.classList.remove('hidden') // Shows Products 
                    console.info(resetFlag = true);
                    console.log('Showing One');
                    myButton.classList.remove('bg-gray-400');
                    myButton.classList.add('bg-accent');
            },
        test() {
            let totalSelectionLen = document.getElementsByClassName('selector-button').length
            let totalSelection = document.getElementsByClassName('selector-button')
            let item = document.getElementsByClassName('selector-button')
            let selector = `[data-section="${item.slug}"]`
            let section = document.querySelector( selector )
            let myButton = document.getElementsByClassName('all-button')[0]

            console.log(totalSelectionLen)

            for (let a = 0; a < totalSelectionLen; a++) {
               totalSelection[a].active = true // Turns all buttons On
                //console.log(this.items[x].slug)
                
                myButton.classList.remove('bg-accent');
                myButton.classList.add('bg-gray-400');

                totalSelection[a].classList.remove('inactive');
                //totalSelection[a].innerText = a;
                document.querySelector(`[data-section="${totalSelection[a].dataset.panelTarget}"]`).classList.remove('hidden') // Hides all Product Details
            }
            
            // item.active = false // Turns selected button off
            //section.classList.add('hidden') // Shows Products 
            //console.log('Showing All');
            //resetFlag = false;

           
        }
    }
}

window.mudguard = function() {
    return {
        site: document.documentElement.getAttribute('lang'),
        isLoading: false,
        formData : {
            tyre_size: '',
            axle_type: '',
            mudguard: '',
            finish: '',
            part_number: '',
        },
        query: '',
        products: [],
        inputs: ['tyre_size','axle_type','mudguard','finish','part_number'],
        allValues: {
            'tyre_size': [], 'axle_type': [], 'mudguard': [], 'finish': [], 'part_number': []
        },

        init() {
            this.isLoading = true;
            let query = this.getQuery()
            this.getProducts()

        },
        parseString(a) {
            return JSON.parse( JSON.stringify(a))
        },
        getQuery() {

            //  Site is always default!!
            // limit doesn't like being negative 1 so set it to a massive number. 
            let query = '/api/collections/mudguard_search/entries?filter[site]=english&limit=999999999999999'
            let extra = '';

            //  below here we have to escape the string to get it functioning correctly.
            if( this.formData.tyre_size)
                extra += `&filter[tyre_size:contains]=${this.formData.tyre_size.replace('/', '\\/')}`

            if( this.formData.axle_type )
                extra += `&filter[axle_type:is]=${this.formData.axle_type}`

            if( this.formData.mudguard )
                extra += `&filter[mudguard:is]=${this.formData.mudguard}`

            if( this.formData.finish )
                extra += `&filter[finish:is]=${this.formData.finish}`

            if(this.formData.part_number)
                extra += `&filter[part_number:is]=${this.formData.part_number}`

            if( this.site != 'fr')
                extra += `&filter[france_only:is]=false`

            this.query = query + extra;

        },
        populateInputs() {

            let values = { 'tyre_size': [], 'axle_type': [], 'mudguard': [], 'finish': [], 'part_number': [] }

            Object.values(this.products).forEach( (product, i) => {

                // if( Array.isArray( this.parseString(product.tyre_size) ) )
                values.tyre_size.push( this.parseString(product.tyre_size) )
                values.axle_type.push( this.parseString(product.axle_type) )
                values.mudguard.push( this.parseString(product.mudguard) )
                values.finish.push( this.parseString(product.finish) )
                values.part_number.push( this.parseString(product.part_number) )

            })

            // let ts = values.tyre_size.flat(Infinity).filter(function (el) {
            //     if(el == '' || el == null || el == 'null') {
            //         return false 
            //     }
            //     return true
            // })

            // Ordering of the Tyre Size list, in future they would need to provide a list of maintence.
            let ts = [
                "5.60R12",
                "155/70R12",
                "7.00R12",
                "155R13",
                "155/70R13",
                "165R13",
                "165/70R13",
                "175R13",
                "175/70R13",
                "185/70R13",
                "195/70R13",
                "6.4R13",
                "6.70R13",
                "165R14",
                "165/70R14",
                "165/75R14",
                "175R14",
                "175X14",
                "175/75R14",
                "185R14",
                "185/65R14",
                "185/75R14",
                "194X14",
                "195R14",
                "195/70R14",
                "195/75R14",
                "205R14",
                "205/75R14",
                "215R14",
                "215/75R14",
                "6.70R14",
                "6.70X14",
                "7.00R14",
                "175/75R15",
                "185R15",
                "195/70R15",
                "6.00R15",
                "6.70R15",
                "205R15",
                "205/65R15",
                "205/70R15",
                "215R15",
                "225/70R15",
                "225/75R15",
                "205/80R15",
                "235/75R15",
                "255/75R15",
                "265/70R15",
                "7.00R15",
                "7.50R15",
                "8.25R15",
                "10.00R15",
                "17R400",
                "19R400",
                "175R16",
                "175/75R16",
                "185R16",
                "185/75R16",
                "195R16",
                "195/75R16",
                "205R16",
                "205/75R16",
                "205/80R16",
                "215R16",
                "215/75R16",
                "205R16",
                "205/75R17.5",
                "225R16",
                "235/65R16",
                "6.00R16",
                "6.50R16",
                "7.00R16",
                "7.50R16",
                "8.25R16",
                "9.00R16",
                "11.00R16",
                "8.25R17",
                "7R17.5",
                "8R17.5",
                "8.5R17.5",
                "9.5R17.5",
                "10R17.5",
                "205/75R17.5",
                "215/75R17.5",
                "225/75R17.5",
                "235/70R17.5",
                "235/75R17.5",
                "245/70R17.5",
                "265/70R17.5",
                "355/45R17.5",
                "245/70R19.5",
                "265/70R19.5",
                "285/70R19.5",
                "385/55R19.5",
                "385/65R19.5",
                "425/55R19.5",
                "435/50R19.5",
                "445/45R19.5",
                "445/55R19.5",
                "445/65R19.5",
                "18R19.5",
                "6.50R20",
                "7.00R20",
                "8.25R20",
                "9.00R20",
                "10.00R20",
                "10.00X20",
                "10.5R20",
                "11.00R20",
                "11.00X20",
                "12.00R20",
                "12.00X20",
                "12.5R20",
                "12/80R20",
                "13R20",
                "14.00R20",
                "365/80R20",
                "375/75R20",
                "405/70R20",
                "14/80R20",
                "14.50R20",
                "14.75/80R20",
                "15.5/80R20",
                "16.00R20",
                "375/70R20",
                "615/65R20.5",
                "24R20.5",
                "11.00R22",
                "9R22.5",
                "10R22.5",
                "10/70R22.5",
                "255/70R22.5",
                "11R22.5",
                "11/70R22.5",
                "11X22.5",
                "275/80R22.5",
                "285/70R22.5",
                "295/70R22.5",
                "12R22.5",
                "12X22.5",
                "12.00X22.5",
                "12/70R22.5",
                "305/70R22.5",
                "365/80R22.5",
                "375/70R22.5",
                "12/80R22.5",
                "315/80R22.5",
                "355/50R22.5",
                "385/55R22.5",
                "385/65R22.5",
                "15R22.5",
                "16.5R22.5",
                "425/65R22.5",
                "445/45R22.5",
                "445/55R22.5",
                "445/65R22.5",
                "455/55R22.5",
                "495/45R22.5",
                "18R22.5",
                "11R24",
                "12.00R24",
                "305/75R24",
                "14.5R24",
                "11R24",
                "285/75R24",
                "17R400",
                "19R400"
            ]

            let at = values.axle_type.flat(Infinity).filter( function (el) {
                if(el == '' || el == null || el == 'null') {
                    return false 
                }
                return true
            })
            let mg = values.mudguard.flat(Infinity).filter( function (el) {
                if(el == '' || el == null || el == 'null') {
                    return false 
                }
                return true
            })
            let fn = values.finish.flat(Infinity).filter( function (el) {
                if(el == '' || el == null || el == 'null') {
                    return false 
                }
                return true
            })

            let pn = values.part_number.flat(Infinity).filter( function (el) {
                if(el == '' || el == null || el == 'null') {
                    return false 
                }
                return true
            })

            this.allValues.tyre_size = [...new Set(ts)]
            this.allValues.axle_type = [...new Set(at)]
            this.allValues.mudguard = [...new Set(mg)]
            this.allValues.finish = [...new Set(fn)]
            this.allValues.part_number = [...new Set(pn)]
            

        },
        getProducts() {
            this.products = []
            this.isLoading = true
            fetch( this.query )
                .then(res => res.json())
                .then(data => {
                    console.log(this.products = data.data)
                    
                })
                .then( () => {
                    
                    this.populateInputs()
                    this.isLoading = false
                });
        },
        get productURL () {
            let loc = document.documentElement.getAttribute('lang');
            if (loc == "en"){
            return `/products/commercial-vehicle/mudguards/`
            } else {
                return '/' + loc + '/products/commercial-vehicle/mudguards/'
            }
        },
        updateQuery() {
            this.getQuery()
            this.getProducts()
        }

    }
}

window.downloadCentre = function() {
    return {

        data: null,
        available_parents: null,
        selected_parent: null,
        selected_products: [],
        search_products_term: '',
        search_products: [],
        download_view: false,
        can_download: false,
        all_selected: [],
        // this is a hardcoded list. 
        download_centre_items: [
            'download_centre_assembely_instructions', 
            'download_centre_images',
            'download_centre_information_leaflet',
            'download_centre_technical_data_sheet',
        ],

        init(data) {
            this.available_parents = Object.keys(data)
            this.data = data
            this.selected_parent = this.available_parents[0]
            
            let x = this
            this.$watch('search_products_term', value => this.searchProducts(value.toUpperCase()))
            this.$watch('selected_products', array => (array.length === 0 ? this.download_view = false : '') )
             
            if (this.available_parents.length != 0) {
                this.can_download = true
            }
        },
        parseString(a) {
            return JSON.parse( JSON.stringify(a))
        },
        selectItem(product, what) {
            //  this is were we have added a single item from the product
            // This built up array allows us to loop though on the downlaod function and quickly access and filter them. 
            if( product.download_centre.includes(what) ) {
                // we need to remove the item
                return product.download_centre = product.download_centre.filter( item => item != what )
            }

            product.download_centre.push(what);
            
        },
        allItemsCount() {
            let allcount = 0;

            this.selected_products.forEach( (product, index) => {
                
                this.download_centre_items.forEach( (item, index) => {
                    if( product[item] ) {
                        if(Array.isArray(product[item]) )
                           return allcount += product[item].length
                        //  if it's not an array, we only have one item.. (that's incorreclty formatted)
                        allcount++
                    }
                })
            })
            return allcount
        },
        selectedItemsCount() {
            let selectedCount = 0

            this.selected_products.forEach( (product, index) => {
                this.download_centre_items.forEach( (item, index) => {
                    if( product[item] && product.download_centre.includes(item) ) {
                        if(Array.isArray(product[item]) )
                           return selectedCount += product[item].length
                        //  if it's not an array, we only have one item.. (that's incorreclty formatted)
                        selectedCount++
                    }
                })
            })

            return selectedCount
        },  
        selectAll(event, value) {
            // @info 
            // this is the select All for the download list (items). 
            // Logic will be simialr to get the select all working for the products too. 
            // need to move it over to toggleSelectedProducts
            let state =  event.target.dataset.state;

            let disabledCount = 0;
            
            //  can we select all/any return nothing. 

            // loop though selected products and if they're not selected select them 
            this.selected_products.forEach( (product, index) => {
                if(product[value] === undefined || product[value].length == 0) {
                    disabledCount++
                    return 
                }
                // bail early if state is notselected and the value == true (already selected) 
                if(state == 'notselected' && product.download_centre[value] == true )
                    return

                // bail early if state is selected and the value == false (already deselected)
                if(state == 'selected' && product.download_centre[value] == false )
                    return 

                if( product.download_centre && product.download_centre[value] == false || product.download_centre[value] === undefined ) {
                    product.download_centre[value] = true
                    return 
                }
                
                if(product.download_centre && product.download_centre[value] == true ){
                    product.download_centre[value] = false
                    return 
                }
                
            })

            if(disabledCount === this.selected_products.length ) {
                return "can't actually toggled all items are disabled"
            }

            //  toggle the state of the button
            this.all_selected[value] = ( this.all_selected[value] === undefined ? true : !this.all_selected[value])
            event.target.dataset.state = ( event.target.dataset.state =='selected' ? 'notselected' : 'selected')
            
            
        },
        selectAllSubCategory(event) {
            
            let el = event.target
            let elData = el.dataset

            let category = elData.category
            let sub_category = elData.subcategory
            let selected = elData.selected

            let x = this;

            this.data[category][sub_category].forEach( function( item, key ) {
                x.toggleSelectedProduct(category, sub_category, key, item.slug, true, selected)
            })

            // let state = (elData.selected == '' ? true : '')

            // // are we all Seelcted?
            
            //     el.setAttribute('data-selected', state )
            

        },
        selectedProductCheck(slug, runningDelete = false ) {            
            let match = false 
            //  remove the product from the listed products, if it's selected
            this.selected_products.forEach( function( item, key ) {
                if ( item.slug === slug  ) 
                    match = true;
                    
            }) 

            return match
        },
        toggleSelectedProduct(cat, sub, prodIndex, slug, multiAdd = false, selected = false) {

            //  selected is if the button is selected.

            // console.log(cat, sub, prodIndex, slug, multiAdd,selected)
            
            let match = false
            match = this.selectedProductCheck(slug)
            if(match) {
                return this.selected_products = this.selected_products.filter(item => item.slug !== slug  )
            }
            // if(match && !multiAdd) {
            //     return this.selected_products = this.selected_products.filter( item => item.slug !== slug  )
            // }

            // if(match && multiAdd && !selected) {
            //     //  we need to check if its in 
            //     return 'dont add the item and bail, cause we already have it.'
            // }

            // if(multiAdd && selected ) {
            //     return this.selected_products = this.selected_products.filter( item => item.slug !== slug  )
            // }

            let clicked = '';
            this.data[this.selected_parent][sub].forEach((product, item) => {
                if (product.slug === slug)
                    clicked = product;
            })

            //  create an empty array 
            clicked['download_centre'] = []
            
            //  add the product to the listing
            return this.selected_products.push(
                clicked
            )
            
        },
        isMyProductInTheList(slug) {
            // This will check to see if my product is in the list
            let inTheList = false
            this.search_products.forEach( function( product, key) {
                if (product.slug == slug) {
                    inTheList = true;
                } 
            })
            return inTheList;
        },

        searchProducts(value) {
            let x0 = this


            //  always clear out the results. 
            this.search_products = []

            if( value.length < 3) {
                return 
            }

            Object.values(this.data[this.selected_parent]).forEach( function( products , key) {
                products.forEach(function( product, key) {
                    product.part_number.forEach(function (part_number, key) {
                       if( part_number.toUpperCase().match(new RegExp(value, 'g')) && !x0.isMyProductInTheList(product.slug) ) {
                        return x0.search_products.push(product)
                        }
                    })

                    if(
                        product.title.match(new RegExp(value, 'g')) ||
                        product.slug.match(new RegExp(value, 'g'))
                    )
                        return x0.search_products.push(product)

                })
                
            })
        },
        // downloadAll() {
        //     console.log('downlaoding all')

        //     let data = {
        //         products: this.selected_products,
        //         download_centre_items: this.download_centre_items
        //     }
        //     // fetch
        //     fetch('/download-centre/download-all', {
        //         method: 'POST',
        //         headers: {
        //             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     .then((response) => {
        //         console.log( response.blob() )
        //         response.blob()
        //     })
        //     .then( (data) => {
                
        //         // console.log(data)
        //         // let blob = new Blob([data], { type: "application/octetstream" }); 

        //         // console.log(blob)

        //         let a = document.createElement('a');
        //         a.setAttribute('download', '');
        //         a.href = data;
        //         // a.download = "test.xml";;
        //         document.body.appendChild(a);
        //         a.click();
        //         document.body.removeChild(a);
        //         // window.URL.removeObjectURL(a.href);
        //     })
        //     .catch( error => console.log(error) );


        // },
        fourMonthsOld(date) {
            if( ! date ) return 
            return (moment().diff( moment(date), 'months') <= 4 ? true : false)
        },
        title(str) {
            var i, frags = str.split('-');
            for (i=0; i<frags.length; i++) {
                frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
            }
            return frags.join(' ');
        },
        selectorGridSize() {
            return 'grid-cols-2 md:grid-cols-' + this.available_parents.length
        },
        getSelectedProducts() {
            return JSON.stringify(this.selected_products);
        },
        //  Custom 'getters'
        getSection(obj) {
            console.log(obj)
        }
    }
}

document.addEventListener('keydown', function( e ) {

    if( e.keycode === 13 ) {
        let form = document.getElementsByName('search');
        form.submit();
    }
})

/* Jonesco Flipper Box  */

let boxs = document.querySelectorAll('.jonesco-flip-box');
let manual = document.querySelectorAll('.jonesco-flip-manual');

document.querySelectorAll('.jonesco-flip-box').forEach( (el) => {
   el.addEventListener( 'click', toggleFlip);
})

document.querySelectorAll('.jonesco-flip-manual').forEach( (el) => {
    el.addEventListener( 'click', toggleFlip);
 })

function toggleFlip(e) {
   // Stops the card from flipping back around if the read more button is pushed.
   //console.log(e.target);
   if(e.target.classList.contains("read-more-modal"))
       return;
        
   this.classList.toggle('flipped');
}

function evenHeights(selector) {
	if(window.calculatingHeight == true)
		return;

	window.calculatingHeight = true;

    //console.log(this);
    //info This checks the selector, because normally it would be a node list (array) but because we are using the resize event, becomes an event itself rather than a node list.
    //info We run the if statement to make sure the els var is getting the correct property otherwise it would error out.
	let els = (selector instanceof Event ? manual : selector);

	let maxHeight = 0;

    // Removes the previous styles off each element in the loop
	els.forEach(el => el.removeAttribute('style') );

    // Calculates the greatest height from each element in the loop
	els.forEach(el => {
			maxHeight = maxHeight < el.offsetHeight + 20 ? el.offsetHeight : maxHeight;
	});

    // Sets the height for each element in the loop
	els.forEach(el => el.style.height = maxHeight + 'px');
    //console.log(els);

	window.calculatingHeight = false;

}

window.addEventListener('load', evenHeights.bind(boxs));
window.addEventListener('resize', evenHeights.bind(boxs));

/* Lottie */

let whereAmI = window.location.pathname
let whatTitleAmI = document.title

if (whatTitleAmI == "Home" || whatTitleAmI == "Accueil"){

} else 
{
    //Footer
var svgContainer = document.getElementById('svgContainer');
var animItem = lottie.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: true,
  path: '/assets/site/jonesco-fluid.json'
});

document.location.host;
}




window.addEventListener('load', (event) => {
  //console.log('page is fully loaded');
  //console.log(document.getElementById("svgContainer"));
  
});

// Disable right click on the pages

document.addEventListener('contextmenu', event => event.preventDefault());

window.onComplete = (event) => { 



    
//console.log("hi",document.getElementById("svgContainer").getElementsByTagName("path")[1]);
};
