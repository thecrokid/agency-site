# Portside website

A five-page static site: Home, Services, Portfolio, About, Contact. Plain HTML, CSS and a little JavaScript. No build step and no dependencies.

## Preview locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

## Add your past work, testimonials and team

Everything is in [`assets/content.js`](assets/content.js). The file explains the fields for each list. While a list is empty, the pages show a dashed placeholder slot. Add an entry and the slot is replaced automatically on every page that uses it. Put photos in `assets/people/`.

## Replace before launch

The placeholder company name, contact details and several statements are invented so the layout has real copy. Check each one:

- **Company name:** "Portside" appears in every `.html` file and in `README.md`. Find and replace it.
- **Email:** `hello@portside.example` appears in every `.html` file. The contact form also reads it from the `data-email` attribute in `contact.html`.
- **Prices:** the "From" prices on Home and Services (`$1,200/mo`, `$1,500/mo`, `$4,500`, `$250/mo`).
- **Terms and promises:** month to month with 30 days' notice, one-day handover, "we reply within one business day", the $1,500 minimum ad spend, half-and-half payment on website builds, and the account and domain ownership statements. Keep only what you actually do.
- **Contact form:** it opens the visitor's email app with the message filled in. To receive submissions without that step, point the form at a form service such as Formspree or Netlify Forms.

## Structure

```
index.html  services.html  portfolio.html  about.html  contact.html
assets/
  styles.css     design tokens at the top (colors, spacing, type)
  site.js        menu, work/testimonial/team rendering, contact form
  content.js     your projects, testimonials and team
  favicon.svg
```

## Design notes

- Palette: off-white `#EEF0EC`, ink `#10161A`, pine `#0F2A24`, one accent `#E5482A`.
- Type: Archivo (variable width) for headings and body, IBM Plex Mono for figures only. Loaded from Google Fonts.
- Layout is mobile-first and tested at 375px, 768px and desktop widths.
