# Cambium Foundation — cambiumfoundation.org

The official website of the **Cambium Foundation**, a 501(c)(3) nonprofit
(EIN 82-1308200) that funds microloans for entrepreneurs in underserved
communities worldwide.

Live at **https://www.cambiumfoundation.org/**

## Stack

A fast, fully static single-page site. No build step, no framework, no server.

```
index.html             # the site
assets/css/styles.css  # design system (organic / editorial theme)
assets/js/main.js       # nav, scroll reveals, letters carousel, lightbox
images/                 # real borrower & program photography
CNAME                   # custom domain (www.cambiumfoundation.org)
```

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Hosting

Served via **GitHub Pages** from the `main` branch (root). The `CNAME` file binds
the custom domain. DNS is configured so the apex `A` records point at GitHub Pages
and `www` is a `CNAME` to the Pages host, with `www.cambiumfoundation.org` as the
canonical address. HTTPS is provided by an auto-renewing certificate (managed by
GitHub Pages, no maintenance required).

## Notes

- Impact figures (microloans funded, lives touched, countries) are static values in
  `index.html` — update them there when the numbers change.
- Donations route to PayPal (hosted button `S72BB5NV48EEC`).
