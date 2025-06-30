// Mobile Navigation
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Toggle mobile menu
function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('active');
  
  // Toggle body scroll when menu is open
  if (!isExpanded) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
}

// Close menu when clicking outside
function handleClickOutside(event) {
  if (navLinks.classList.contains('active') && 
      !event.target.closest('.nav-links') && 
      !event.target.closest('.menu-toggle')) {
    closeMenu();
  }
}

// Close menu when clicking on a nav link
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('active');
  body.style.overflow = '';
}

// Event Listeners
menuToggle.addEventListener('click', toggleMenu);
document.addEventListener('click', handleClickOutside);

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove('resize-animation-stopper');
  }, 400);
  
  // Close menu if window is resized to desktop
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
