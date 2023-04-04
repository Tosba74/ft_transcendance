/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{tsx, ts}"],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fadeOut: 'fadeOut 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
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
      }),
    },
  },
  plugins: [],
}
