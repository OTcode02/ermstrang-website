# COMMIT-SHEET — Ermstrang Technologies (marketing site, register: **build**)

> Intake (autonomous, assumptions written down): product = een AI-assistent op maat die
> terugkerend werk overneemt · audience = Nederlandse zzp'ers en mkb'ers (5–50 mensen), geen
> technische lezer · surface = één marketingpagina (geen app, geen tweede scherm) · brand
> constraints = bestaand merkteken (vierkant, navy + één cyaan balk), slogan
> "Automatiseer het gedoe. Focus op je vak." · stack = statische HTML/CSS + ~2 kB vanilla JS,
> GitHub Pages (de klant koppelt zelf DNS) · brief-referentie = efficienter.nl, maar simpeler
> (één pagina, geen losse diensten- en sectorendropdowns).

## 1. Peak / Signature
**Het werkblad in de hero**: één echte werkstroom als technische tekening — een aanvraag loopt
door vijf stappen (mail → gegevens → offerte → factuur → opvolging). De drie saaie tussenstappen
zijn navy en krijgen één voor één een cyaan stempel + vinkje zodra ze in beeld komen; de eerste en
laatste stap (de klant, en jij) blijven wit met een zwaardere lijn. Wat de bezoeker aan een vriend
vertelt: "dat tekeningetje waarin het saaie werk zichzelf afvinkt en alleen jouw werk overblijft."
De tekening is dragend, niet decoratief: hij ís het productverhaal.

## 2. Color
`oklch(0.247 0.065 255)` **Ermstrang-navy** als inkt én als committed oppervlak (de
"waarom op maat"-band + footer, ~22% van de pagina). Veld: `oklch(0.975 0.005 248)` **papier** —
een koel bijna-wit met chroma 0,005 *naar de merk-hue*, dus niet het AI-cream (hue 40–100) en niet
lavendel. Accent `oklch(0.693 0.125 218)` **cyaan**, tier: committed, en **semantisch**: cyaan komt
alléén waar de assistent iets doet (stempel, vinkje, de actieve stap, de CTA). Nergens als versiering.
**Achtergrond-lichtheid als getal: doel mean L ≈ 0.82** (papier 0.975 met twee navy banden).
Waarom daar: dit verkoopt rust en overzicht aan iemand die 's avonds zijn administratie doet; een
donkere pagina zou de belofte "je hoeft er niet naar te kijken" tegenspreken. Het drama komt uit de
navy band en de tekening, niet uit een donkere pagina.

## 3. Type
display: **Archivo** (grotesk, engineered, variabele breedte — de tekeningentaal van het
merkteken) / text: **Source Sans 3** (humanist, open aperturen, echte cursief).
As: grotesk × humanist. Inter en Space Grotesk afgewezen als het AI-standaardpaar van 2024–26;
Hanken Grotesk (de referentie) afgewezen omdat we de referentie niet moeten kopiëren.

## 4. Grid break
De hero is een **7/5 asymmetrische split** en de werkstroom-tekening **loopt over de sectiegrens
heen**: de laatste stap en zijn bijschrift staan in de sectie eronder (negatieve marge), zodat de
tekening het einde van de hero visueel ontkent. Eén break, nergens anders herhaald.

## 5. Motion budget
1. **Hero-tekening**: stappen worden gestempeld, stagger 60 ms, one-time (IntersectionObserver).
2. **Sectie-openers, drie verschillende expressies** (geen uniforme fade-up): (a) de takenlijst
   tekent een hairline en rijst 6 px — de taken-sectie; (b) de verbindingslijn van "hoe het werkt"
   groeit links→rechts (`scaleX`, transform-origin left) en de nummers komen daarna — de
   stappen-sectie; (c) "voor wie" komt alleen uit een blur (`filter` + opacity, geen beweging).
3. **Slot-CTA**: het streepje onder "jij" groeit (`scaleX`) — één beweging, niets meer.
Niets anders scroll-getriggerd; geen parallax, geen scrub. Alles enhance-op-een-zichtbare-default
(leesbaar met JS uit). `prefers-reduced-motion` = alles staat er al, alleen opacity-wissel.

## 6. Reflex check
a) **1st-order** (wat een generieke AI voor "AI-automatisering voor zzp/mkb" maakt, en wat de
   lokale referentie efficienter.nl deels doet): donkere hero, paars-blauwe gradient-glow,
   robot- of AI-breinbeeld, drie identieke kaarten ("Slimmere workflows / Meer inzicht / Meer tijd"),
   een stat-rij ("40% tijdsbesparing"), Inter, en "Wij revolutioneren je administratie".
b) **2nd-order** (AI die dát vermijdt): crème editorial met serif-koppen, muted salie-accent,
   handgetekende doodles, "geen AI-hype"-copy, daglichtfoto van een lachende ondernemer achter
   een laptop.
c) **Onze afwijking**: een *verlichte werktekening*. Navy inkt op koel papier, de werkstroom als
   hero in plaats van een belofte over tijdswinst, cyaan uitsluitend waar de machine werkt, één
   gedrenkte navy band voor het "op maat"-argument, en **geen fotografie** — Ermstrang verkoopt een
   proces op maat, en een stockfoto van andermans bureau zou daar een leugen aan toevoegen.
   Van de referentie houden we de rust en de zichtbare werkwijze; we laten de donkere hero, de
   dropdown-navigatie en de 17.000 px lengte vallen.

## 7. House tells broken
1. **Near-black by default** → een verlichte pagina (L 0.975 veld, mean L ≈ 0.82); de diepte zit in
   de navy band en de tekening. (Dit project zou met een donkere hero de standaardroute opnieuw
   lopen.)
2. **Wordmark-as-hero** → het piekmoment is de werkstroom-tekening; de merknaam staat 28 px in de
   header en is nergens groter dan de h1.
3. **Glow as depth** → geen glow, geen bloom, geen schaduw-als-licht. Diepte = hairline (1px, laag
   contrast) + één vlakke band. (Bonus: geen scroll-instructie-footer, geen 01/05-teller, precies
   één kicker op de hele pagina.)
