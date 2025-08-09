// Hide intro animation overlay after animation ends
  document.getElementById('intro-text').addEventListener('animationend', () => {
    const overlay = document.getElementById('intro-overlay');
    overlay.style.display = 'none';
  });

  // Mobile menu toggle with ARIA updates
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      navMenu.style.display = 'none';
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close mobile menu when clicking outside (only on mobile)
  document.addEventListener('click', (event) => {
    if (window.innerWidth > 900) return;
    if (navMenu.style.display === 'flex' &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)) {
      navMenu.style.display = 'none';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scrolling and close menu on nav click (mobile)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 900) {
          navMenu.style.display = 'none';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Contact form submission with validation and mailto fallback
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill all fields before submitting.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:chinmayrgejji733@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
    alert('Thank you! Your message is ready to send via your email client.');
  });

  // Intersection Observer for achievements fade-in
  const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');  // Animate in
    } else {
      entry.target.classList.remove('visible');  // Animate out (reverse)
    }
  });
}, { threshold: 0.1 });

// Observe all achievement items
document.querySelectorAll('.timeline .item').forEach(item => {
  observer.observe(item);
});

// Always scroll to top on page refresh/load
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
