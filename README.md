# Cambium Foundation — cambiumfoundation.org

The official website of the **Cambium Foundation**, a 501(c)(3) nonprofit (EIN 82-1308200)
that funds microloans for entrepreneurs in underserved communities, distributed through
partners like [Kiva.org](https://www.kiva.org).

## Stack

A fast, fully static single-page site. No build step, no framework, no server.

```
index.html            # the site
assets/css/styles.css # design system (organic / editorial theme)
assets/js/main.js      # nav, scroll reveals, letters carousel, lightbox
images/                # real borrower & program photography
CNAME                  # custom domain (cambiumfoundation.org)
```

## Local preview

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Hosting

Served via **GitHub Pages** from the `main` branch (root). The `CNAME` file binds the
custom domain `cambiumfoundation.org`. DNS A/AAAA records point at GitHub Pages IPs and a
`www` CNAME points at the Pages host.

## Notes

- The hero loan figure shows a static `21,000+`; `main.js` will replace it with a live
  count if Kiva's public API responds over HTTPS.
- Donations route to PayPal (hosted button `S72BB5NV48EEC`).
