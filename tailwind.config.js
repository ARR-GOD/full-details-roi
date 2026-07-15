/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Loyoly design tokens
        canvas: '#F5F4F0',
        ink: '#2B251F',
        muted: '#52473C',
        muted2: '#776A58',
        muted3: '#9E8E71',
        accent: '#2965FE',
        'accent-hover': '#1F52D8',
        'accent-soft': '#B3C8FF',
        'accent-softer': '#E4EFFF',
        green: {
          band: '#D9EAD3',
          border: '#C9DCC0',
        },
        input: '#FFF2CC',
        highlight: '#FEC229',
        'highlight-soft': '#FFE57E',
        zebra: '#FBFAF6',
        total: '#EEEDE6',
        panel: '#2B251F',
        border: {
          DEFAULT: '#DCD9CC',
          subtle: '#EEEDE6',
          strong: '#C6C0AB',
        },
      },
      fontFamily: {
        display: ['Lexend', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1px',
        btn: '10px',
        field: '12px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        'ease-out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
