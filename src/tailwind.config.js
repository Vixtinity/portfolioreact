/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'blue-dark': '#1E3A8A',      // Azul oscuro
          'coral-light': '#FCA5A5',    // Coral suave
          'coral-dark': '#FB7185',     // Rojo coral intenso
          'gray-light': '#F3F4F6',     // Blanco grisáceo claro
        },
      },
    },
    plugins: [],
  }
  