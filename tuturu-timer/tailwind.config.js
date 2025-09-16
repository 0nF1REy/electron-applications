/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        digital: ['VT323', 'monospace']
      },
      colors: {
        'fallout-green': '#28f700',
        'fallout-green-dark': '#072600',
        amber: '#FFBF00',
        'amber-dark': '#382800',
        'industrial-dark': '#212121',
        'industrial-medium': '#323232'
      },
      backgroundImage: {
        'background-normal': "url('./src/assets/images/background-normal.jpg')",
        'background-edit': "url('./src/assets/images/background-edit.jpg')"
      },
      textShadow: {
        glow: '0 0 5px currentColor, 0 0 10px currentColor'
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      )
    })
  ]
}
