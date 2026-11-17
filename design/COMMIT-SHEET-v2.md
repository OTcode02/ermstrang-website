# COMMIT-SHEET v2: Ermstrang Technologies, "tekenklaar" (branch `redesign-tekenklaar`)

> Brief: grote aanpassing. Inspiratie: efficienter.nl (klikbare demo van het systeem, CRM- en
> dashboardvoorbeelden), w3s.nl (grote, zelfverzekerde typografie, donkere band met één felle
> accentkleur, afgeronde blokken), innovaware.nl (kleine UI-illustraties per oplossing, vinkjes onder
> de hero, rustig licht veld). Doel: een bezoeker moet na één keer scrollen willen tekenen.
> Register: **build**. Tokens uit v1 blijven (navy, papier, cyaan, Archivo + Source Sans 3).

## 1. Peak
**De klikbare demo**: een echt werkend voorbeeld-systeem voor "Van Dam Installatietechniek" met
vier schermen (Overzicht, Klanten/CRM, Offertes, Inbox). De bezoeker keurt een offerte goed, ziet
de teller oplopen, opent een klantkaart. Wat hij een collega vertelt: "je kon gewoon klikken in
het systeem dat ze voor je bouwen."

## 2. Color
Zelfde palet als v1. Verschil: navy wordt een **dragend oppervlak** (demo-band, vertrouwen,
slot-CTA), cyaan blijft semantisch (alles wat het systeem doet + de primaire knop op navy).
Doel mean L ≈ 0.70 (meer navy dan v1, 0.82). Geen paars, geen gradient-tekst.

## 3. Type
Archivo (display, 800 voor de hero) + Source Sans 3. Hero mag groter dan v1 (tot ~5.4rem),
dat is de w3s-les: één zin die de pagina draagt.

## 4. Grid break
De demo-app loopt aan de onderkant **over de grens van de navy band** de lichte sectie in
(negatieve marge), zoals v1's werkblad, maar nu met het hele product.

## 5. Motion budget (3 families)
1. Hero-paneel: activiteitenregels komen één voor één binnen, teller telt op (één keer).
2. Sectie-openers: rijzen (6px) voor kaarten, blur-in voor de tijdscan-balken die daarna groeien.
3. Rekenhulp: getallen tellen mee met de schuifjes (direct, geen scroll-trigger).
Reduced motion: alles staat er direct.

## 6. Reflex check
a) Generiek: donkere AI-hero met glow, robotbeeld, drie identieke kaarten, stat-rij.
b) Tweede orde: crème editorial met serif.
c) Wij: licht veld, echte producttaal (schermen die je kunt aanklikken), prijzen open op tafel,
   en een rekenhulp die de beslissing voor de bezoeker uitrekent.

## 7. Conversie-ontwerp (waarom iemand tekent)
- Prijs zichtbaar (Startpakket, Basis, Pro) met wat erin zit, excl. btw, maandelijks opzegbaar.
- Risico weg: 14 dagen tevredenheidsgarantie op het Startpakket, vaste prijs, data blijft van jou.
- Snelheid concreet: voorstel binnen 2 werkdagen, live binnen 10 werkdagen.
- Eén actie overal: "Plan je gratis tijdscan" (30 minuten). Sticky op mobiel.
- Geen verzonnen klantlogo's, reviews of aantallen: de site staat nog aan het begin.
