# Ermstrang Technologies — website

Statische site (een pagina + privacyverklaring). Geen build, geen dependencies: de map kan zo op
GitHub Pages.

```
index.html          de landingspagina
privacy.html        privacyverklaring (nog juridisch na te kijken)
brand/index.html    merkblad: kleuren, typografie, logo's, downloads
design/             COMMIT-SHEET.md + DESIGN.md (ontwerpbesluiten), mockup, screenshots
assets/css          style.css (tokens + componenten)
assets/js           main.js (~2 kB, geen dependencies)
assets/fonts        Archivo + Source Sans 3 (zelf gehost, geen Google-request)
assets/img          logo, favicon, og-image
assets/brand        kant-en-klare maten voor LinkedIn en social
```

## Online zetten (GitHub Pages)

1. Maak een bestand `CNAME` met daarin je domein (bijv. `ermstrang.nl`).
2. Repo -> Settings -> Pages -> Source: `Deploy from a branch`, branch `main`, map `/ (root)`.
3. DNS bij je provider:
   - `A`-records voor het root-domein naar `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `CNAME` voor `www` naar `OTcode02.github.io`
4. "Enforce HTTPS" aanzetten zodra het certificaat er is.
5. Gebruik je een ander domein dan `ermstrang.nl`, vervang het dan in `index.html`, `privacy.html`,
   `robots.txt` en `sitemap.xml`.

## Nog te vullen (staat ook als commentaar in de HTML)

- [ ] e-mailadres: nu `info@ermstrang.nl`
- [ ] telefoonnummer, vestigingsadres, KvK-nummer, btw-id
- [ ] privacyverklaring juridisch laten nakijken
- [ ] bevestigen of de prijsalinea ("vaste opstartprijs en een vast bedrag per maand") zo mag blijven
