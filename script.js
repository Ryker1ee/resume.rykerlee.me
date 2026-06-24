// Animate elements as they enter the viewport
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

document.querySelectorAll(
  'section, .experience-entry, .bubble, .bubble-container span, .profile-intro, .profile-image, header, .message-card, .nav-container, .experience-wrapper'
).forEach(el => {
  el.classList.add('animate-hidden');
  observer.observe(el);
});

// Fade and slide in sections on load
window.addEventListener('load', () => {
  const fadeIns = document.querySelectorAll(
    'section, .profile-intro, .profile-image, .experience-entry, .bubble-container, header, .message-card'
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
