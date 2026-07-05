const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const typingText = document.getElementById('typing-text');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (typingText) {
  const phrases = [
    'Frontend engineer building thoughtful digital products.',
    'AI-focused developer crafting smart product experiences.',
    'Cloud-native engineer delivering reliable software solutions.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentPhrase = phrases[phraseIndex];
    typingText.textContent = currentPhrase.slice(0, charIndex);

    if (!isDeleting && charIndex < currentPhrase.length) {
      charIndex += 1;
      setTimeout(typeLoop, 70);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => {
        isDeleting = true;
        typeLoop();
      }, 1400);
    } else if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(typeLoop, 45);
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 300);
    }
  };

  typeLoop();
}

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:chandanrabat@gmail.com?subject=${subject}&body=${body}`;
    formMessage.textContent = 'Your email app should open with your message ready to send.';
    contactForm.reset();
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
