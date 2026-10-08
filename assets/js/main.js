/* Ermstrang: beweging en kleine verbeteringen.
   Twee scroll-families (COMMIT-SHEET §5): (1) de stappen in het werkblad worden gestempeld,
   (2) drie verschillende sectie-openers (rijzen / lijn groeit / uit blur).
   Zonder JS staat alles er al: de startwaarde hangt aan de klasse .js op <html>, die alleen
   door een inline scriptje in de <head> wordt gezet. Faalt JS, dan valt de pagina terug op
   volledig zichtbare inhoud. */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Jaartal in de footer
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealAll = () => {
    document.querySelectorAll('[data-arm]').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.step--auto').forEach(el => el.classList.add('in-stamp'));
  };

  // Geen IntersectionObserver of liever geen beweging → alles meteen zichtbaar.
  if (!('IntersectionObserver' in window) || reduce.matches) {
    root.classList.remove('js');
    revealAll();
    if (reduce.matches) return;
  }
  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('in');
      obs.unobserve(el);
      // stagger binnen dezelfde groep (tabelrijen), max 50ms per item
      const group = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.hasAttribute('data-arm')) : [];
      const i = group.indexOf(el);
      if (group.length > 1 && i > 0) el.style.transitionDelay = Math.min(i * 45, 225) + 'ms';
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

  document.querySelectorAll('[data-arm]').forEach(el => io.observe(el));

  // Familie 1: het werkblad stempelt de geautomatiseerde stappen af, één voor één.
  const board = document.querySelector('.board');
  if (board) {
    const steps = Array.from(board.querySelectorAll('.step--auto'));
    const stampIo = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        steps.forEach((step, i) => {
          window.setTimeout(() => step.classList.add('in-stamp'), 260 + i * 60);
        });
        obs.disconnect();
      });
    }, { threshold: 0.35 });
    stampIo.observe(board);
  }

  // Vangnet: als er na 3s nog iets onzichtbaar is (scriptfout, IO die niet vuurt), tonen we het.
  window.setTimeout(() => {
    document.querySelectorAll('[data-arm]:not(.in)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in');
    });
  }, 3000);

  reduce.addEventListener?.('change', e => { if (e.matches) revealAll(); });
})();
