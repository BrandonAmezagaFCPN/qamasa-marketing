// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});

// Cierra el menú móvil al hacer clic en un link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

// ===== HEADER SHADOW ON SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(61,36,24,0.08)' : 'none';
});

// ===== SCROLL REVEAL ANIMATION =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    // Acordeón exclusivo: cierra los demás antes de abrir el actual
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));

    if (!isOpen) item.classList.add('is-open');
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const nombre = data.get('nombre');
  const negocio = data.get('negocio');
  const telefono = data.get('telefono');
  const servicio = data.get('servicio');
  const mensaje = data.get('mensaje');

  // TODO: Reemplaza esto por tu integración real (Formspree, backend propio, etc.)
  // Por ahora, redirige el mensaje a WhatsApp con los datos ya escritos.
  const texto = `Hola QAMASA, soy ${nombre} de "${negocio}". Tel: ${telefono}. Me interesa: ${servicio || 'no especificado'}. ${mensaje ? 'Detalle: ' + mensaje : ''}`;
  const whatsappURL = `https://wa.me/59163207606?text=${encodeURIComponent(texto)}`;

  formNote.textContent = 'Abriendo WhatsApp para confirmar tu reunión...';
  window.open(whatsappURL, '_blank');
  form.reset();
});