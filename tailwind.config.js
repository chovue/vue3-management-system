/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    boxShadow: {
      outbox:
        '12px 12px 24px rgba(0, 0, 0, 0.1), -12px -12px 24px rgba(255, 255, 255, 1);',
      innerbox:
        '0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px rgba(255, 255, 255, 0.8), inset 12px 12px 24px rgba(0, 0, 0, 0.1), inset -12px -12px 24px rgba(255, 255, 255, 1);',
    },
  },
};
export const plugins = [];
export const purge = ['./src/**/*.{vue,js,ts,jsx,tsx}'];
