# DESIGN.md — Ermstrang Technologies

Vastgelegd systeem zoals het is gebouwd (register: build). Elke latere wijziging hoort binnen deze
besluiten te blijven; wijkt iets af, dan is dat een bewuste breuk en geen drift.

## Kleur — de tokens (assets/css/style.css, `:root`)

| token | OKLCH | sRGB | waar |
|---|---|---|---|
| `--paper` | `oklch(0.975 0.005 248)` | `#F4F7FA` | het veld; de pagina is licht, niet donker |
| `--surface` | `oklch(1 0 0)` | `#FFFFFF` | het werkblad, de tabelband, de contactkaart |
| `--navy` | `oklch(0.247 0.065 255)` | `#08213F` | inkt én gedrenkte band + footer-inkt |
| `--navy-700` | `oklch(0.289 0.069 253)` | `#0E2C4C` | hover op navy |
| `--navy-500` | `oklch(0.402 0.093 251)` | `#1B4A78` | secundaire lijnen, ghost-knop |
| `--cyan` | `oklch(0.693 0.125 218)` | `#00AED0` | **alleen** waar de assistent werkt: stempel, vinkje, cta op navy, markering |
| `--cyan-ink` | `oklch(0.516 0.093 219)` | `#00748C` | cyaan als tekst of lijn op licht |
| `--muted` | `oklch(0.453 0.040 251)` | `#46586C` | lopende tekst naast koppen |
| `--hairline` | `oklch(0.913 0.013 252)` | `#DCE3EB` | 1px structuur (geen schaduwen) |

Regel: **cyaan betekent "dit deed de assistent"**. Gebruik het nooit als versiering of als
merkkleur-accent op een knop die niets met automatiseren te maken heeft.

Gemeten contrast (WCAG, op `--paper`): navy 15,0:1 · muted 6,8:1 · cyan-ink 5,0:1 · cyaan op navy
6,1:1 · wit op navy 16,2:1. Lopende tekst zit overal ≥ 4,5:1.

Getal dat het ontwerp stuurt: **mean linear L ≈ 0,81** op de volledige pagina (gemeten op de
full-page renders in `design/shots/`), 11% donkere pixels. Doel was ≥ 0,70: dit is een verlichte
pagina en dat is een ontwerpbesluit, geen toeval. Voeg je een sectie toe, houd de verhouding
licht/donker ongeveer gelijk: één navy band per schermhoogte, niet meer.

## Type

- display: **Archivo** (600/700/800), zelf gehost — koppen, knoppen, labels, cijfers.
- text: **Source Sans 3** (400/600), zelf gehost — lopende tekst.
- As: grotesk × humanist. Inter en Space Grotesk zijn bewust niet gebruikt.

Schaal (clamp): `--step--1` … `--step-5`; h1 = `--step-5` (38 px mobiel → 73,6 px op 1440),
h2 = `--step-3`, h3 = `--step-2`. Koppen: `letter-spacing:-.032em`, `line-height:1.04`,
`text-wrap:balance`. Lopende tekst max ~60-68ch.

Vijf kleine-caps-labels op de pagina (`step__who`, `stamp`, `thead th`, `how__in b` + de oude
footerkoppen) waren een slopscan-warn; de footerkoppen zijn naar zinscase gezet, de overige vier
horen bij de technische tekenstijl van het werkblad en de tabel en zijn bewust gehouden.

## Merkteken

Het merkteken is een **bol van puntjes** in de merktint `#1B4A78`, geplaatst met de gulden hoek
(zonnebloemraster): 61 punten van 4,7 eenheden op een straal van 46 in een veld van 128. Eén puntje
— rechtsboven — is cyaan. Semantiek: het netwerk doet het werk, één stap is die van de assistent.
`assets/img/mark-dots.svg` is de canon en is volledig vector (losse cirkels). Onder 32 px gebruik je
`favicon-dots.svg`: 13 grotere punten, anders loopt het dicht bij 16 px.

Bewerkbare tekst hoort bij het systeem: `logo-liggend-bewerkbaar.svg` (+ donkere variant),
`logo-staand-bewerkbaar.svg` en `assets/brand/ermstrang-logo-bewerkbaar.pptx`. De SVG's hebben
`textLength` op de twee naamdelen (Ermstrang 324, Technologies 378 bij 64 px en -1,6 px tracking,
gemeten in de echte Archivo), zodat de naam niet uit zijn kader loopt op een computer zonder dat
lettertype. Het PPTX is de route voor Canva en PowerPoint: daar blijven de tekstvakken tekst.

## Componenten

- `.board` (het werkblad) — de signatuur. Witte kaart, 1px hairline, stappen als rijen met tijd in
  tabulaire cijfers. `margin-bottom:-7.5rem` laat hem over de sectiegrens lopen; de sectie eronder
  heeft `border-top` + extra `padding-top`, zodat de hairline achter het werkblad doorloopt.
- `.tasks` — echte tabel (geen kaartjes). Op mobiel worden de kolommen rijen.
- `.how` — drie stappen met een verbindingslijn die bij het scrollen van links naar rechts groeit.
- `.who` — twee rijen, elk anders opgebouwd (lijst vs. definitielijst).
- `.navy` — de enige gedrenkte band; korrel (SVG-turbulentie) op 3,5% via `::after`.
- `.btn` / `.btn--ghost` — één gevulde en één omrande knop. Allebei echt zichtbaar als knop.

## Beweging

Twee families (budget was ≤3):

1. **Werkblad stempelt** — de drie geautomatiseerde stappen krijgen één voor één hun cyaan vinkje,
   stagger 60 ms, eenmalig (IntersectionObserver op `.board`, drempel 0,35).
2. **Sectie-openers, drie verschillende expressies** — (a) tabelrijen rijzen 6 px met 45 ms stagger,
   (b) de verbindingslijn groeit `scaleX` 0→1 in 640 ms, (c) "voor wie" komt uit `filter:blur(6px)`
   zonder beweging. Geen vierde familie.

Duur: hover 160 ms, knop 140 ms, openers 520 ms (bewust boven 300 ms: dit zijn verklarende
reeksen, geen reacties op input). Alleen `transform`, `opacity` en `filter`. De startwaarde hangt
aan `html.js`, gezet door een inline scriptje; zonder JS staat alles er (gecontroleerd: 9/9 rijen
zichtbaar). `prefers-reduced-motion` zet alles meteen neer (gecontroleerd).

## Gecontroleerd, met cijfers

| check | uitkomst |
|---|---|
| horizontale overflow | 0 px op 1440, 768 en 390 |
| CLS | 0,0000 |
| LCP | ~112 ms lokaal |
| zonder JS | alle inhoud zichtbaar, h1 leesbaar |
| reduced motion | geen verborgen elementen, geen beweging |
| slopscan | 0 fails, 0 warns |
| paginahoogte | 4.810 px op 1440 (de referentie is 17.648 px) |

## Bekende zwakke plekken

- Het merkteken uit de eerste ronde (vierkant met drie balken) is vervangen. De oude bestanden staan
  nog in `~/Documents/Ermstrang*`; die horen niet meer gebruikt te worden.
- De LinkedIn-omslag houdt zijn inhoud expres binnen het midden: merkteken en naam beginnen op
  420 px (de profielfoto komt tot ~393 px over de banner heen) en de hele compositie staat in de
  middelste helft van de breedte. Op mobiel snijdt LinkedIn de zijkanten weg; gecontroleerd met een
  midden-60%- en midden-50%-uitsnede (`design/shots/check-banner.png`). Gebruik die marge ook bij
  een latere nieuwe omslag.
- `privacy.html` is inhoudelijk geschreven maar nog niet juridisch nagekeken en mist de
  bedrijfsgegevens (staan als commentaar in de HTML en als TODO in README.md).
