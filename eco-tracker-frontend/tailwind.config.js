/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend:{
    animation: {
      'typewriter': "typewriter 2s steps(11) forwards",
      'caret': 'typewriter 2s steps(11) forwards, blink 1s steps(11) infinite 2s',
      'spin-slow': 'spin 3s linear infinite',
      'fade-in': 'fadeIn 2s ease-out',
      'bounce-slow': 'bounce 2s infinite'
    },
    keyframes: {
      typewriter: {
        to: {
          left: "100%"
        }
      },
      blink: {
        '0%': {
          opacity: '0',
        },
        '0.1%': {
          opacity: '1',
        },
        '50%': {
          opacity: '1',
        },
        '50.1%': {
          opacity: '0',
        },
        '100%': {
          opacity: '0',
        },
      },
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      bounce: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-1rem)' }
      }
    },
      fontFamily: {
        'rouge': "Rouge Script",
        'rochester': "Rochester",
        'playfair-display': "Playfair Display"
      },
    },
  },
      

  plugins: [],
}

