document.addEventListener('DOMContentLoaded', function() {
    // Initialize the testimonials carousel
    initTestimonials();
    
    // Initialize the booking form
    initBookingForm();
    
    // Initialize the date picker with min/max dates
    initDatePicker();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Add animation on scroll for elements with data-aos attribute
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Testimonials Carousel
function initTestimonials() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Navigation functions
    function goToSlide(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        updateDots(index);
        currentSlide = index;
    }
    
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Navigation event listeners
    document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    });
    
    document.querySelector('.testimonial-next')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 5000);
    });
}

// Booking Form
function initBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;
    
    const accommodationCards = document.querySelectorAll('.accommodation-card');
    const accommodationType = document.getElementById('accommodation-type');
    
    // Highlight selected accommodation card
    accommodationCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            accommodationCards.forEach(c => c.classList.remove('selected'));
            
            // Add active class to clicked card
            card.classList.add('selected');
            
            // Update the select element
            const type = card.getAttribute('data-type');
            accommodationType.value = type;
            
            // Scroll to form on mobile
            if (window.innerWidth < 992) {
                bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
    
    // Update card selection when select changes
    accommodationType.addEventListener('change', (e) => {
        const type = e.target.value;
        
        // Remove active class from all cards
        accommodationCards.forEach(c => c.classList.remove('selected'));
        
        // Add active class to matching card
        document.querySelector(`.accommodation-card[data-type="${type}"]`).classList.add('selected');
    });
    
    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!formValues['check-in'] || !formValues['check-out']) {
            showAlert('Please select both check-in and check-out dates.', 'error');
            return;
        }
        
        // Check if check-out is after check-in
        const checkInDate = new Date(formValues['check-in']);
        const checkOutDate = new Date(formValues['check-out']);
        
        if (checkOutDate <= checkInDate) {
            showAlert('Check-out date must be after check-in date.', 'error');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        showAlert('Your booking request has been received! We will contact you shortly to confirm your reservation.', 'success');
        
        // Reset form
        bookingForm.reset();
        
        // Scroll to top of form
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Show alert function
    function showAlert(message, type = 'info') {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `form-alert alert-${type}`;
        alert.textContent = message;
        
        // Insert alert before form
        bookingForm.parentNode.insertBefore(alert, bookingForm);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
}

// Initialize date picker with min/max dates
function initDatePicker() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (!checkInInput || !checkOutInput) return;
    
    // Set minimum date to today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    checkInInput.min = formatDate(today);
    checkOutInput.min = formatDate(tomorrow);
    
    // Set maximum date to 1 year from now
    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    checkInInput.max = formatDate(maxDate);
    checkOutInput.max = formatDate(maxDate);
    
    // Update check-out min date when check-in date changes
    checkInInput.addEventListener('change', () => {
        if (checkInInput.value) {
            const nextDay = new Date(checkInInput.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOutInput.min = formatDate(nextDay);
            
            // If current check-out is before new min date, update it
            if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
                checkOutInput.value = formatDate(nextDay);
            }
        }
    });
}

// Initialize Google Maps
function initMap() {
    const location = { lat: 0.3360, lng: 34.5530 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Add marker
    new google.maps.Marker({
        position: location,
        map: map,
        title: 'Ambururu Waterfalls',
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    
    // Add click event for directions
    document.getElementById('get-directions')?.addEventListener('click', () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, '_blank');
    });
}

// Load Google Maps API
function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Load Google Maps when the page loads
window.addEventListener('load', () => {
    if (document.getElementById('map')) {
        loadGoogleMaps();
    }
});

// Initialize weather widget
function initWeatherWidget() {
    const weatherWidget = document.getElementById('weather-widget');
    if (!weatherWidget) return;
    
    // This is a placeholder - in a real implementation, you would fetch weather data from a weather API
    // For example: OpenWeatherMap, WeatherAPI, or AccuWeather
    
    // Example weather data (replace with actual API call)
    const weatherData = {
        temperature: 24,
        feelsLike: 26,
        condition: 'Partly Cloudy',
        icon: 'cloud-sun',
        windSpeed: 12,
        humidity: 65,
        visibility: 10,
        forecast: [
            { day: 'Mon', temp: 24, icon: 'cloud-sun' },
            { day: 'Tue', temp: 25, icon: 'sun' },
            { day: 'Wed', temp: 23, icon: 'cloud-rain' }
        ]
    };
    
    // Update weather widget with data
    function updateWeatherUI(data) {
        document.getElementById('temperature').textContent = `${data.temperature}°C`;
        document.getElementById('feels-like').textContent = `Feels like: ${data.feelsLike}°C`;
        document.getElementById('weather-icon').className = `fas fa-${data.icon}`;
        document.getElementById('wind-speed').textContent = `${data.windSpeed} km/h`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('visibility').textContent = `${data.visibility} km`;
        document.getElementById('last-updated').textContent = 'Updated just now';
        
        // Update forecast
        const forecastContainer = document.getElementById('forecast-container');
        if (forecastContainer) {
            forecastContainer.innerHTML = data.forecast.map(day => `
                <div class="forecast-item">
                    <div class="forecast-day">${day.day}</div>
                    <i class="fas fa-${day.icon}"></i>
                    <div class="forecast-temp">${day.temp}°C</div>
                </div>
            `).join('');
        }
    }
    
    // Simulate loading
    setTimeout(() => updateWeatherUI(weatherData), 1000);
    
    // Refresh weather data
    document.getElementById('refresh-weather')?.addEventListener('click', () => {
        const refreshBtn = document.getElementById('refresh-weather');
        refreshBtn.classList.add('refreshing');
        
        // Simulate API call
        setTimeout(() => {
            updateWeatherUI(weatherData);
            refreshBtn.classList.remove('refreshing');
        }, 1000);
    });
}
