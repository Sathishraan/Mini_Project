module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as necessary
    "./public/index.html"         // Include HTML files if you use Tailwind classes there
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#7fa862', // You can name it anything you want
      },
    },
  },
  plugins: [],
};
