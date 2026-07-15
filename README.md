# losec.io — AI Security Research Lab

Marketing site & research portal for **LoSec** — an AI-driven security research lab focused on
vulnerability discovery and 0-day research.

Built with **Nuxt** + **Tailwind CSS**, deployed on **Vercel**.

## Stack

- [Nuxt 3](https://nuxt.com) — Vue framework (SSR / static)
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling via `@nuxtjs/tailwindcss`
- Deployed on [Vercel](https://vercel.com) (zero-config Nuxt preset)

## Development

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run generate # static prerender
npm run preview  # preview the production build
```

## Structure

```
assets/css/      global styles, design tokens, keyframes
components/       UI components (Navbar, Hero, sections, Footer …)
pages/           routes: /, /blog, /blog/[slug], /contact, /member
content/         site data (vulnerabilities, blog posts, team, certs)
public/          static assets
```

## Links

- Site: https://losec.io
- X / Twitter: [@Losec_io](https://x.com/Losec_io)
- GitHub: [Losec-io](https://github.com/Losec-io)
- Contact: hi@losec.io · business@losec.io

## License

Source released under the MIT License — see [LICENSE](LICENSE).
Content and branding © 2026 LoSec.
