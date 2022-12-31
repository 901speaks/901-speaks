// eslint-disable-next-line
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    plugin(function ({ addVariant }) {
      addVariant(
        'mobile-only',
        "@media screen and (max-width: theme('screens.sm'))"
      )
    }),
  ],
  daisyui: {
    themes: [
      {
        night: {
          // eslint-disable-next-line
          ...require('daisyui/src/colors/themes')['[data-theme=night]'],
          primary: '#102750',
          secondary: '#F6B067',
        },
      },
    ],
  },
}
