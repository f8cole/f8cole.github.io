(() => {
  const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
  const nav = document.querySelector('.nav'), t = document.querySelector('.nav-toggle');
  if (t) {
    t.addEventListener('click', () => { const o = nav.classList.toggle('open'); t.setAttribute('aria-expanded', o); });
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); }));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); t.focus(); } });
  }
  const onScroll = () => nav && nav.classList.toggle('scrolled', scrollY > 8);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  // Pre-select brand/creator in the form from CTA links
  document.querySelectorAll('[data-type]').forEach(a => a.addEventListener('click', () => {
    const r = document.querySelector(`input[name="type"][value="${a.dataset.type}"]`); if (r) r.checked = true;
  }));

  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); }
  else {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el, i) => { el.style.setProperty('--d', `${(i % 4) * 70}ms`); io.observe(el); });
  }

  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const subject = `${f.get('type')} inquiry from ${f.get('name')}${f.get('company') ? ' (' + f.get('company') + ')' : ''}`;
    const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('company') || ''}\n${f.get('email')}`;
    location.href = `mailto:cole@f8enterprises.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
