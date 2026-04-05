/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'system-ui', 'sans-serif'],
        inter: ['Geist', 'system-ui', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'ui-monospace', 'monospace'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        'tight-extreme': '-0.04em',
        'tight-max': '-0.03em',
      },
      colors: {
        navy: {
          950: '#0B0F19',
        },
      },
      boxShadow: {
        'glow-indigo': '0 0 32px rgba(79, 70, 229, 0.65)',
        'glow-cyan': '0 0 32px rgba(34, 211, 238, 0.65)',
        'text-glow': '0 0 20px rgba(255, 255, 255, 0.15)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(79, 70, 229, 0.8)' },
        },
      },
    },
  },
}


