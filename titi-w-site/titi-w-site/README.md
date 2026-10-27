# Titi W Attorneys website

A static landing page. The contact form builds a WhatsApp message from the visitor's details and
opens WhatsApp so they can send it to the firm. There is no server or database to maintain.

```
public/            the website (this is what Cloudflare serves)
  index.html
  css/styles.css
  js/main.js       menu, pop-ups, articles, WhatsApp form
  images/
  _headers         security headers
```

## Put it on GitHub

Create an empty repository on github.com, then in this folder:

```
git init
git add .
git commit -m "Titi W Attorneys website"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main
```

## Deploy on Cloudflare Pages

1. Cloudflare dashboard, Workers & Pages, Create, Pages, Connect to Git.
2. Pick the repository.
3. Build settings: framework preset None, build command empty, build output directory `public`.
4. Save and Deploy. The site goes live on a `.pages.dev` address. Every push to GitHub redeploys it.
5. For the firm's own domain: Pages project, Custom domains, Set up a domain.

## Things you may want to change

- WhatsApp number: `WA_NUMBER` at the top of `public/js/main.js`, and the `wa.me` links in `public/index.html`.
- Service and article text: `SERVICES` and `ARTICLES` in `public/js/main.js`.
- Pictures: replace the files in `public/images/`, keeping the same names.

## Before going live

- The footer links for Privacy Policy, Terms of Use and Disclaimer still point to `#`. Add those pages.
- Have the Director check the three article texts and the wording of every service.
