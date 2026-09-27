/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        classic: {
          ivory: '#FAFAF9',
          cream: '#F4F4F0',
          border: '#E8E8E2',
          black: '#0A0B0D',
          charcoal: '#15171B',
          slate: '#24272E',
          burgundy: '#5B1527',
          wine: '#781D35',
          deepred: '#992443',
          crimson: '#BA2E53',
          bronze: '#785A44',
          warmgray: '#8C8C85'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        '3d-sm': '0 4px 12px -2px rgba(10, 11, 13, 0.08), 0 2px 6px -1px rgba(91, 21, 39, 0.06)',
        '3d-md': '0 10px 25px -3px rgba(10, 11, 13, 0.12), 0 4px 12px -2px rgba(91, 21, 39, 0.08)',
        '3d-lg': '0 20px 35px -5px rgba(10, 11, 13, 0.16), 0 8px 16px -3px rgba(91, 21, 39, 0.10)',
        'wine-glow': '0 0 25px rgba(120, 29, 53, 0.25)',
      }
    },
  },
  plugins: [],
}
