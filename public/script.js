
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          window.location.href = '/thanks.html';
        } else {
          return response.json().then(data => {
            throw new Error(data.error || 'There was an error sending your message.');
          });
        }
      })
      .catch(err => {
        if (formMessage) {
          formMessage.textContent = err.message || 'Submission failed';
          formMessage.style.color = 'red';
        }
        console.error('Submission failed', err);
      });
    });
  }
});

// Animate more elements when they appear in the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.1
});

// Select more types of elements for animation
document.querySelectorAll(
  'section, .experience-entry, .bubble, .bubble-container span, .profile-intro, .profile-image, header, .message-card, form, .nav-container, .experience-wrapper'
).forEach(el => {
  el.classList.add('animate-hidden');
  observer.observe(el);
});

// Fade and slide in sections on load
window.addEventListener('load', () => {
  const fadeIns = document.querySelectorAll(
    'section, .profile-intro, .profile-image, .experience-entry, .bubble-container, header, .message-card, form'
  );
  fadeIns.forEach((el, i) => {
    el.animate([
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      duration: 600 + i * 100,
      easing: 'ease-out',
      fill: 'forwards'
    });
  });
});