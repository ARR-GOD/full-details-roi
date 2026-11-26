/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Every color resolves to a CSS variable set per skin in index.css
        // ([data-skin="internal"] / [data-skin="partner"]). Component classes
        // never change between skins — only what these variables point to.
        canvas: 'var(--canvas)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        muted2: 'var(--muted2)',
        muted3: 'var(--muted3)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-soft': 'var(--accent-soft)',
        'accent-softer': 'var(--accent-softer)',
        // Text-safe variants: on a light background `accent` itself may not
        // have enough contrast (the partner skin's accent is a light mint),
        // so any *text* that used to read "accent" reads one of these instead.
        'accent-text': 'var(--accent-text)', // accent-colored text on a plain/light bg
        onaccent: 'var(--onaccent)', // text sitting on a solid `bg-accent` fill
        green: {
          band: 'var(--green-band)',
          border: 'var(--green-border)',
        },
        input: 'var(--input-bg)',
        highlight: 'var(--highlight)',
        'highlight-soft': 'var(--highlight-soft)',
        zebra: 'var(--zebra)',
        total: 'var(--total)',
        'total-sel': 'var(--total-sel)',
        panel: 'var(--panel)',
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        btn: 'var(--radius-btn)',
        field: 'var(--radius-field)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      transitionTimingFunction: {
        'ease-out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
