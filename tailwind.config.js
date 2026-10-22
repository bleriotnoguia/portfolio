/** @type {import('tailwindcss').Config} */

// Colors are defined as RGB channels in app/globals.css so that light and
// dark themes share the same class names and opacity modifiers still work.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: token("paper"),
        surface: token("surface"),
        sunken: token("sunken"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        signal: token("signal"),
        "on-signal": token("on-signal"),
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "75rem",
      },
      // Article styles follow the theme tokens, so dark mode needs no prose-invert.
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--ink) / 0.86)",
            "--tw-prose-headings": "rgb(var(--ink))",
            "--tw-prose-lead": "rgb(var(--muted))",
            "--tw-prose-links": "rgb(var(--ink))",
            "--tw-prose-bold": "rgb(var(--ink))",
            "--tw-prose-counters": "rgb(var(--muted))",
            "--tw-prose-bullets": "rgb(var(--muted))",
            "--tw-prose-hr": "rgb(var(--line))",
            "--tw-prose-quotes": "rgb(var(--ink))",
            "--tw-prose-quote-borders": "rgb(var(--signal))",
            "--tw-prose-captions": "rgb(var(--muted))",
            "--tw-prose-code": "rgb(var(--ink))",
            "--tw-prose-pre-code": "rgb(var(--ink))",
            "--tw-prose-pre-bg": "rgb(var(--sunken))",
            "--tw-prose-th-borders": "rgb(var(--line))",
            "--tw-prose-td-borders": "rgb(var(--line))",
            maxWidth: "68ch",
            "h2, h3": {
              fontStretch: "112%",
              letterSpacing: "-0.02em",
            },
            a: {
              textUnderlineOffset: "4px",
              textDecorationThickness: "2px",
              textDecorationColor: "rgb(var(--ink) / 0.3)",
            },
            "a:hover": {
              textDecorationColor: "rgb(var(--ink))",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            ":not(pre) > code": {
              backgroundColor: "rgb(var(--sunken))",
              borderRadius: "0.375rem",
              padding: "0.15em 0.4em",
              fontWeight: "500",
            },
            pre: {
              border: "1px solid rgb(var(--line))",
              borderRadius: "1rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
