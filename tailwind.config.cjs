const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  mode: 'jit',
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      colors: {
        ...colors,
      }
    },
    screens: {
      'sm': '500px',
      'md': '800px',
      'lg': '1200px',
      'xl': '1600px',
      '2xl': '2000px',
      '3xl': '2800px',
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
  daisyui: {
    themes: [
      {
        'quotes': {                          /* your theme name */
          'primary': '#a991f7',           /* Primary color */
          'primary-focus': '#8462f4',     /* Primary color - focused */
          'primary-content': '#ffffff',   /* Foreground content color to use on primary color */

          'secondary': '#f6d860',         /* Secondary color */
          'secondary-focus': '#f3cc30',   /* Secondary color - focused */
          'secondary-content': '#ffffff', /* Foreground content color to use on secondary color */

          'accent': '#37cdbe',            /* Accent color */
          'accent-focus': '#2aa79b',      /* Accent color - focused */
          'accent-content': '#ffffff',    /* Foreground content color to use on accent color */

          'neutral': '#3d4451',           /* Neutral color */
          'neutral-focus': '#2a2e37',     /* Neutral color - focused */
          'neutral-content': '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100': '#112233',          /* Base color of page, used for blank backgrounds */
          'base-200': '#051122',          /* Base color, a little darker */
          'base-300': '#020511',          /* Base color, even more darker */
          'base-content': '#cfeff7',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        },
      },
      'dark',
      'forest',
      'aqua',
      'fantasy',
      'luxury',
      'CMYK'
    ],
  }
}