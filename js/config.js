// Google Maps API Configuration
const CONFIG = {
    GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with your actual API key
};

// Weather API Configuration (optional)
const WEATHER_CONFIG = {
    API_KEY: 'YOUR_WEATHER_API_KEY', // From OpenWeatherMap or similar
    LOCATION: 'Siaya,KE',
    UNITS: 'metric'
};

// Export configurations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, WEATHER_CONFIG };
}
