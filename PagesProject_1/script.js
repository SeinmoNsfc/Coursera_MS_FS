const navToggle = document.getElementById('nav-toggle');
const navList = document.querySelector('nav ul');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navList.classList.toggle('show');
});

// Smooth scrolling + chiusura menu mobile
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });

    // Chiudi menu mobile
    if (navList.classList.contains('show')) {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});

// Filter projects (opzionale)
function filterProjects(category) {
  const projects = document.querySelectorAll('#projects article');
  projects.forEach(project => {
    project.style.display = project.classList.contains(category) || category === 'all'
      ? 'block'
      : 'none';
  });
}

// Lightbox
const images = document.querySelectorAll('#projects img');
images.forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.innerHTML = `
      <div class="modal-content">
        <img src="${img.src}" alt="${img.alt}" />
        <span class="close-btn">&times;</span>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
  });
});

// Contact form validation
const form = document.querySelector('form');
form?.addEventListener('submit', e => {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    e.preventDefault();
    alert('Please fill in all fields.');
    return;
  }

  if (!emailRegex.test(email)) {
    e.preventDefault();
    alert('Please enter a valid email address.');
  }
});

// Real-time input feedback
['name', 'email', 'message'].forEach(id => {
  const input = document.getElementById(id);
  input?.addEventListener('input', () => {
    input.style.borderColor = input.value.trim() ? '#2a2a72' : '#ccc';
  });
});
