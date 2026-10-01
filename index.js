const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const faqItems = document.querySelectorAll('.faq-item');
const revealItems = document.querySelectorAll('[data-reveal]');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const yearEl = document.querySelector('#year');

const whatsappButton = document.createElement('a');
whatsappButton.href = 'https://wa.me/2347062051220?text=Hello%20EflatTech%20Studio%2C%20I%20want%20to%20chat%20with%20you.';
whatsappButton.className = 'whatsapp-float';
whatsappButton.target = '_blank';
whatsappButton.rel = 'noopener noreferrer';
whatsappButton.setAttribute('aria-label', 'Chat on WhatsApp');
whatsappButton.setAttribute('title', 'Chat on WhatsApp');
whatsappButton.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="26" height="26" />';
document.body.appendChild(whatsappButton);

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');

  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
      const faqButton = faq.querySelector('.faq-question');
      if (faqButton) faqButton.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');

    if (!nameInput || !emailInput || !messageInput) {
      return;
    }

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      if (formStatus) {
        formStatus.textContent = 'Please fill in all required fields before submitting.';
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = `Thanks, ${nameInput.value.trim()}! Your inquiry was sent successfully.`;
    }

    contactForm.reset();
  });
}
