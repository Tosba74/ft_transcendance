/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{tsx, ts}", "./src/assets/*.ts"],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fadeOut: 'fadeOut 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideInChat: 'slideInChat 0.5s ease-in-out',
        slideOutChat: 'slideOutChat 0.5s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: theme('opacity.100') },
          '100%': { opacity: theme('opacity.0') },
        },
        fadeIn: {
          '0%': { opacity: theme('opacity.0') },
          '100%': { opacity: theme('opacity.100') },
        },
        slideInChat: {
          '0%': {
            opacity: theme('opacity.0'),
            transform: 'translateX(100vh)'
          },
          '1%': { opacity: theme('opacity.100') },
          '100%': {
            opacity: theme('opacity.100'),
            transform: 'translateX(0)'
          },
        },
        slideOutChat: {
          '0%': {
            opacity: theme('opacity.100'),
            transform: 'translateX(0)'
          },
          '1%': { opacity: theme('opacity.100') },
          '100%': {
            opacity: theme('opacity.0'),
            transform: 'translateX(100vh)'
          },
        },
      }),
    },
  },
  plugins: [],
}
