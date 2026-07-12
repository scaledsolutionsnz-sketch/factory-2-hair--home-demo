// Factory 2 Hair & Home — interactions

// Welcome chooser overlay — first visit per session only
(function () {
  const welcome = document.getElementById('welcome');
  if (!welcome) return;
  if (sessionStorage.getItem('f2_welcomed')) { welcome.remove(); return; }
  document.documentElement.classList.add('welcome-open');

  const close = (target) => {
    sessionStorage.setItem('f2_welcomed', '1');
    welcome.classList.add('done');
    document.documentElement.classList.remove('welcome-open');
    setTimeout(() => welcome.remove(), 700);
    if (target && target !== 'dismiss') {
      const el = document.getElementById(target);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
    }
  };

  welcome.querySelectorAll('[data-go]').forEach((b) =>
    b.addEventListener('click', () => close(b.getAttribute('data-go'))));
  welcome.addEventListener('click', (e) => { if (e.target === welcome) close('dismiss'); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('welcome')) close('dismiss');
  });
})();

// nav scrolled state
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));
}

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// year
document.querySelectorAll('[data-year]').forEach((el) => el.textContent = new Date().getFullYear());
