/* Ermstrang: beweging en interactie, geen dependencies.
   Zonder JS staat alle inhoud er (de .js-klasse op <html> zet de startwaarden).
   Interactie (demo-tabs, akkoord-knoppen, klantkaart, rekenhulp) werkt ook bij
   prefers-reduced-motion; alleen de beweging valt dan weg. */
(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const eur = n => '€ ' + Math.round(n).toLocaleString('nl-NL');

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- demo: tabs ---------- */
  const tabs = $$('.demo__tab');
  const side = $$('.app__side li[data-for]');
  const show = id => {
    tabs.forEach(t => {
      const on = t.getAttribute('aria-controls') === 'scr-' + id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    $$('.scr').forEach(s => s.classList.toggle('is-on', s.id === 'scr-' + id));
    side.forEach(li => li.classList.toggle('is-on', li.dataset.for === id));
  };
  if (tabs.length) {
    show('overzicht');
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t.getAttribute('aria-controls').slice(4)));
      t.addEventListener('keydown', e => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const n = tabs[(i + d + tabs.length) % tabs.length];
        n.focus(); n.click();
      });
    });
  }

  /* ---------- demo: akkoord geven ---------- */
  const wacht = $('[data-kpi="wacht"]');
  const taken = $('[data-kpi="taken"]');
  const badge = $('[data-badge]');
  $$('[data-approve]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('[data-ask]');
    if (!card || card.classList.contains('is-done')) return;
    card.classList.add('is-done');
    const left = Math.max(0, Number(wacht.textContent) - 1);
    wacht.textContent = String(left);
    taken.textContent = String(Number(taken.textContent) + 1);
    if (badge) { badge.textContent = String(left); if (!left) badge.hidden = true; }
    window.setTimeout(() => {
      card.hidden = true;
      if (!left) $('.asks__done').hidden = false;
    }, reduce.matches ? 0 : 260);
  }));

  /* ---------- demo: klantkaart ---------- */
  const clients = [
    { name: 'Banketbakkerij Veldkamp', who: 'Lotte Veldkamp, eigenaar', last: 'Vandaag, mail over de nieuwe koelcel', next: 'Offerte nalezen en versturen', deal: '30 dagen betaaltermijn', auto: 'Automatisch bijgewerkt uit de mail van 08:02' },
    { name: 'Pension Wadzicht', who: 'Wouter Hilbrink, beheerder', last: 'Gisteren, offerte warmtepomp verstuurd', next: 'Jouw akkoord op de prijs (boven € 2.500)', deal: 'Onderhoudscontract tot 2028', auto: 'Herinnering voor de open factuur verstuurd om 08:11' },
    { name: 'Groothandel Terlouw', who: 'Freek Terlouw, inkoop', last: 'Vorige week, koeling magazijn opgeleverd', next: 'Kortingsverzoek 12% beoordelen', deal: 'Vaste klant sinds 2021, levering altijd op vrijdag', auto: 'Omzet dit jaar bijgewerkt uit de boekhouding' },
    { name: 'Praktijk Bosrand', who: 'Nadia el Amrani, praktijkhouder', last: 'Vanochtend, aanvraag via de website', next: 'Meetafspraak inplannen (2 opties gemaild)', deal: 'Nieuw, 3 behandelruimtes', auto: 'Toegevoegd uit het contactformulier om 08:15' }
  ];
  const rows = $$('.crm__table tbody tr');
  const card = $('.card360');
  const pick = row => {
    const c = clients[Number(row.dataset.client)];
    rows.forEach(r => r.classList.toggle('is-on', r === row));
    Object.keys(c).forEach(k => { const f = $(`[data-f="${k}"]`, card); if (f) f.textContent = c[k]; });
  };
  rows.forEach(r => {
    r.addEventListener('click', () => pick(r));
    r.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(r); } });
  });

  /* ---------- rekenhulp ---------- */
  const uren = $('#c-uren'), tarief = $('#c-tarief');
  const calc = () => {
    const u = Number(uren.value), t = Number(tarief.value);
    const terug = u * 0.5 * 4.33;           // helft automatiseerbaar, 4,33 weken per maand
    const waarde = terug * t;
    $('#o-uren').textContent = u + ' uur';
    $('#o-tarief').textContent = eur(t);
    $('#r-uren').textContent = Math.round(terug) + ' uur';
    $('#r-jaar').textContent = Math.round(terug * 12) + ' uur';
    $('#r-waarde').textContent = eur(waarde);
  };
  if (uren && tarief) { uren.addEventListener('input', calc); tarief.addEventListener('input', calc); calc(); }

  /* ---------- sticky knop op mobiel: weg zodra het formulier in beeld is ---------- */
  // Verborgen zolang de hero-knoppen of het formulier zelf in beeld zijn.
  const dock = $('.dock'), start = $('#start'), heroCta = $('.hero__actions');
  if (dock && start && 'IntersectionObserver' in window) {
    const seen = new Set();
    dock.classList.add('is-hidden');
    const dio = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));
      dock.classList.toggle('is-hidden', seen.size > 0);
    }, { threshold: 0.05 });
    dio.observe(start);
    if (heroCta) dio.observe(heroCta);
  }

  /* ---------- beweging ---------- */
  const revealAll = () => {
    $$('[data-arm]').forEach(el => el.classList.add('in'));
    $$('.feed li').forEach(li => li.classList.add('in'));
    $$('.step--auto').forEach(el => el.classList.add('in-stamp'));
  };
  if (!('IntersectionObserver' in window) || reduce.matches) {
    revealAll();
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('in');
      obs.unobserve(el);
      const group = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-arm')) : [];
      const i = group.indexOf(el);
      if (group.length > 1 && i > 0) el.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
  $$('[data-arm]').forEach(el => io.observe(el));

  // Hero: activiteitenregels komen één voor één binnen, de teller telt mee.
  $$('.feed li').forEach((li, i) => window.setTimeout(() => li.classList.add('in'), 350 + i * 380));
  const counter = $('[data-count]');
  if (counter) {
    const target = Number(counter.dataset.count), t0 = performance.now() + 350, dur = 1500;
    const fmt = m => Math.floor(m / 60) + ' u ' + String(m % 60).padStart(2, '0') + ' min';
    const tick = now => {
      const p = Math.min(1, Math.max(0, (now - t0) / dur));
      counter.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Vangnet: na 3s alles in beeld tonen, ook als een observer niet vuurde.
  window.setTimeout(() => {
    $$('[data-arm]:not(.in)').forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in'); });
  }, 3000);

  reduce.addEventListener?.('change', e => { if (e.matches) revealAll(); });
})();
