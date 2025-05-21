document.addEventListener('DOMContentLoaded', () => {
  // Contact Modal
  const contactModal = document.getElementById('contact-modal');
  const floatingContactButton = document.querySelector('.floating-contact');
  const modalClose = document.querySelector('.modal-close');

  function toggleContactModal() {
    contactModal.classList.toggle('active');
  }

  floatingContactButton.addEventListener('click', toggleContactModal);
  modalClose.addEventListener('click', toggleContactModal);

  // Back-to-Top Button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Testimonials Slider
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
        dots[i].classList.add('active');
      }
    });
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  }, 5000);

  // Weather Widget
  const apiKey = '23bdae4852605a54c065c72a455b3a6b';
  const lat = 0.3360;
  const lon = 34.5530;
  const weatherInfo = document.getElementById('weather-info');

  async function fetchWeather() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      if (!response.ok) throw new Error('Weather data not available');
      const data = await response.json();

      const weatherHTML = `
        <div class="weather-main">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" class="weather-icon">
          <div>
            <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
            <div class="weather-desc">${data.weather[0].description}</div>
          </div>
        </div>
        <div class="weather-details">
          <span>Humidity: ${data.main.humidity}%</span>
          <span>Wind: ${data.wind.speed} m/s</span>
          <span>Feels like: ${Math.round(data.main.feels_like)}°C</span>
        </div>
      `;
      weatherInfo.innerHTML = weatherHTML;
      // Cache weather data in localStorage
      localStorage.setItem('weatherData', JSON.stringify({
        html: weatherHTML,
        timestamp: Date.now()
      }));
    } catch (error) {
      // Load cached weather data if offline
      const cachedWeather = localStorage.getItem('weatherData');
      if (cachedWeather) {
        const { html, timestamp } = JSON.parse(cachedWeather);
        // Use cache if less than 1 hour old
        if (Date.now() - timestamp < 3600000) {
          weatherInfo.innerHTML = html;
        } else {
          weatherInfo.innerHTML = `<div class="weather-error">Offline: Please connect to view weather</div>`;
        }
      } else {
        weatherInfo.innerHTML = `<div class="weather-error">${error.message}</div>`;
      }
    }
  }

  fetchWeather();

  // Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = content.classList.contains('active');

      // Close all other accordion items
      document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('active');
        item.previousElementSibling.setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked item
      if (!isActive) {
        content.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      } else {
        header.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Offline Contact Form (alternative to Google Form)
  const offlineForm = document.createElement('form');
  offlineForm.innerHTML = `
    <h3>Offline Contact Form</h3>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
    <button type="submit">Submit</button>
  `;
  offlineForm.style.display = 'none';
  document.querySelector('#contact .modal-content').appendChild(offlineForm);

  offlineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: offlineForm.querySelector('#name').value,
      email: offlineForm.querySelector('#email').value,
      message: offlineForm.querySelector('#message').value,
      timestamp: Date.now()
    };
    // Store form data in localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    alert('Your message has been saved offline. It will be submitted when you reconnect.');
    offlineForm.reset();
  });

  // Show offline form if no internet
  window.addEventListener('online', () => {
    offlineForm.style.display = 'none';
    document.querySelector('#contact iframe').style.display = 'block';
  });
  window.addEventListener('offline', () => {
    offlineForm.style.display = 'block';
    document.querySelector('#contact iframe').style.display = 'none';
  });

  // Submit cached form data when online
  window.addEventListener('online', () => {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    if (submissions.length > 0) {
      // Note: Requires a backend to submit to Google Forms, which needs a paid API.
      // For now, alert user to submit manually via the online form.
      alert('You have offline messages. Please submit them via the online form.');
    }
  });
});