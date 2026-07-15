/** @type {import('tailwindcss').Config} */

// Colors are sourced from CSS custom properties (space-separated RGB channels
// defined in assets/css/tailwind.css) so Tailwind opacity modifiers still work
// e.g. `text-acid/60`, `bg-ink/80`.
const c = (v) => `rgb(var(${v}) / <alpha-value>)`

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: c('--c-ink'),            // page canvas
        panel: c('--c-panel'),        // section panel
        surface: c('--c-surface'),    // card
        raised: c('--c-raised'),      // raised card / hover
        line: c('--c-line'),          // hairline border
        'line-strong': c('--c-line-strong'),
        fg: c('--c-fg'),              // primary text
        muted: c('--c-muted'),        // secondary text
        faint: c('--c-faint'),        // muted text
        haze: c('--c-haze'),          // mono metadata
        acid: {
          DEFAULT: c('--c-acid'),     // the ONE accent — lock/found
          dim: c('--c-acid-dim'),
        },
        ember: {
          DEFAULT: c('--c-ember'),    // counter-accent — live/heat
          dim: c('--c-ember-dim'),
        },
        success: c('--c-success'),
        // functional severity ramp (the only place chroma multiplies)
        critical: c('--c-critical'),
        high: c('--c-high'),
        medium: c('--c-medium'),
        info: c('--c-info'),
        low: c('--c-acid'),
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        kicker: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'mono-xs': ['0.75rem', { lineHeight: '1.5' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      maxWidth: {
        prose: '68ch',
        shell: '78rem',
      },
      borderRadius: {
        xs: '3px',
      },
      boxShadow: {
        // pixel-hard shadow for terminal / catalog surfaces
        hud: '4px 4px 0 0 rgb(var(--c-line-strong))',
        'hud-lg': '6px 6px 0 0 rgb(var(--c-line-strong))',
      },
      transitionTimingFunction: {
        'ease-out-hud': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'ease-in-hud': 'cubic-bezier(0.5, 0, 0.75, 0)',
        'ease-io-hud': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        scanbeam: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(1100%)', opacity: '0' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        emberpulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        gridpan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '64px 64px' },
        },
      },
      animation: {
        scanbeam: 'scanbeam 2.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        cursor: 'blink 1s step-end infinite',
        ember: 'emberpulse 1.6s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
