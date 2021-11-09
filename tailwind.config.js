module.exports = {
    purge: {
      content: [
        './resources/**/*.antlers.html',
        './resources/**/*.blade.php',
        './content/**/*.md'
      ],
      options : {
        'safelist' : [
          'h-5', 'w-5', 'z-1',
          'ml-2', 'mr-2',
          'read-more-item',
          'custom-select',
          'triangle', 'bottomTriangle',
          'flag-icon',
          //  styles for the page dots
          'border', 'border-light-blue', 'bg-white', 'ml-0', 'mr-1', 'bottom-12', 'left-12', 'w-auto',
          // for the colour options
          // The below is for the product colour availablily section.
          // If you add a new set, you will need to add it to the safe list here.
          'border-2', 'border-transparent', 'hover:border-light-blue', 'colour-options-bg-gradient',
          // Actual colours
          'bg-orange', 'bg-green', 'bg-yellow',
          'from-black', 'from-red-500', 'from-green-500', 'from-yellow-500', 'from-blue-500', 'from-yellow',
          'to-black', 'to-red-500', 'to-green-500', 'to-yellow-500', 'to-yellow', 'to-blue-500', 'colour-options-bg-gradient', 'h-8', 'w-8', '-rotate-90'
        ]
      }
    },
    // important: true,
    theme: {
      extend: {
        container: {
          center: true,
        },
        colors: {
          'accent' : 'var(--accent-color)',
          'light-blue': '#2699D6',
          'light-grey' : '#e8e8e8',
          'light-red' : '#ffbd33',
          'light-yellow' : '#f9e17c',
          'light-green' : '#72f295',
          'enviro':'#f6c900',
          'commer':'#575756',
          'fire':'#e52329',
          'storag':'#04a64b',
          blue : {
            'DEFAULT' : '#2F2D7E'
          },
          'black' : {
            'DEFAULT' : '#000000'
          },
          grey: {
            'DEFAULT' : '#b2b2b2'
          },
          'orange' : {
            'DEFAULT' : '#f9a202'
          },
          'yellow' : {
            'DEFAULT' : '#F6C900'
          },
          'vacancy' : {
              'DEFAULT' : '#00A5DF'
          },
          'red' : {
            'DEFAULT' : '#E52329'
          },
          'green' : {
            'DEFAULT' : '#04A64B'
          },
        },
        fontFamily: {
          bold: ['Montserrat-Bold'],
          medium: ['Montserrat-Medium'],
          italic: ['Montserrat-Italic'],
          semibold: ['Montserrat-SemiBold'],
          sans: ['Montserrat']
          // sans: ['Montserrat', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', 'sans-serif', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
        },
        fontSize: {
          'xxs': '.65rem',
        },
        
        zIndex: {
          '2': '2',
          '3': '3',
          '4': '4',
          '249': '249',
          '250': '250',
          '300': '300',
          '350': '350',
        },
        height: {
          '1px' : '1px',
          '2px' : '2px',
          '6px' : '6px',
          'spacing' : "var(--spacing)"
        },
        minHeight:{
          '0': '0',
          '1/4': '25%',
          '1/2': '50%',
          '3/4': '75%',
          'full': '100%',
          '32': '8rem',
          '25vh': '25vh'
        },
        spacing: {
          '1/2': '50%',
          '1/3': '33.333333%',
          '2/3': '66.666667%',
          '1/4': '25%',
          '1/4.5': '22%',
          '1/4.1': '24%',
          '2/4': '50%',
          '3/4': '75%',
          '1/5': '20%',
          '2/5': '40%',
          '3/5': '60%',
          '4/5': '80%',
          '1/6': '16.666667%',
          '2/6': '33.333333%',
          '3/6': '50%',
          '4/6': '66.666667%',
          '5/6': '83.333333%',
          '1/8' : '12.5%',
          '3/8' : '37.5%',
          '5/8' : '62.5%',
          '1/12': '8.333333%',
          '2/12': '16.666667%',
          '3/12': '25%',
          '4/12': '33.333333%',
          '5/12': '41.666667%',
          '6/12': '50%',
          '7/12': '58.333333%',
          '8/12': '66.666667%',
          '9/12': '75%',
          '10/12': '83.333333%',
          '11/12': '91.666667%',
          'full': '100%',
          'screen-heading' : 'calc(100vh - var(--spacing))',
          '75-screen' : '75vh',
          '50-screen' : '50vh',
          '25-screen' : '25vh',
          'spacing' : 'var(--spacing)',
          'full-heading': 'calc(100% - var(--spacing))'

        },
        backgroundSize: {
          '200': "200%"
        },
        backgroundPosition: {
          '0' : '0%',
          '-100' : '-100%',
        },
        inset: {
          'spacing': "var(--spacing)",
        },
        minWidth: {
          "2-5": '2.5rem',
          "3-5": '3.5rem'
        },
        maxWidth: {
          "2-5": '2.5rem',
          "3-5": '3.5rem'
        }
      },
    },
    variants: {
      extend: {
        backgroundPosition: ['hover', 'focus'],
        transform: ['hover', 'focus'],
        translate: ['active', 'group-hover'],
        //opacity: ['disabled'],
        borderWidth: ['hover', 'focus'],
        textColor: ['disabled'],
        cursor: ['disabled']
      }
    },
    plugins: [
      require('tailwindcss-debug-screens'),
    ],
  }
