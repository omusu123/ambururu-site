# Ambururu Waterfalls Website

A modern, responsive website for Ambururu Waterfalls in Siaya, Kenya. This website showcases the beauty of the waterfalls, provides information for visitors, and allows online booking for accommodations.

## Features

- 🌍 Responsive design that works on all devices
- 📱 Progressive Web App (PWA) support
- 📅 Interactive booking system
- 🌦️ Weather widget
- 🗺️ Interactive map with directions
- 📸 Photo gallery with lightbox
- 🌙 Dark mode support
- 📝 Contact form
- 📱 Offline functionality

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Maps API key
- (Optional) Weather API key (OpenWeatherMap or similar)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ambururu-site.git
   cd ambururu-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your API keys:
   ```
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   WEATHER_API_KEY=your_weather_api_key
   ```

4. **Configure the website**
   Update the following files with your information:
   - `js/config.js` - Update API endpoints and default settings
   - `manifest.json` - Update app name, description, and icons
   - `index.html` - Update meta tags and other site-specific information

5. **Build the project**
   ```bash
   npm run build
   ```

6. **Run the development server**
   ```bash
   npm start
   ```
   The website will be available at `http://localhost:3000`

## Deployment

### Netlify
1. Push your code to a GitHub repository
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in "Site settings" > "Build & deploy" > "Environment"
7. Click "Deploy site"

### Vercel
1. Push your code to a GitHub repository
2. Log in to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your repository
5. Configure the project:
   - Framework: Next.js (or your chosen framework)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables
7. Click "Deploy"

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key | Yes |
| `WEATHER_API_KEY` | OpenWeatherMap API key | No |

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## Folder Structure

```
ambururu-site/
├── css/                  # CSS files
│   ├── styles.css        # Main styles
│   └── responsive.css    # Responsive styles
├── js/                   # JavaScript files
│   ├── config.js         # Configuration
│   ├── booking.js        # Booking system
│   └── main.js           # Main JavaScript
├── images/               # Images
│   ├── gallery/          # Gallery images
│   ├── icons/            # App icons
│   └── screenshots/      # Screenshots for PWA
├── index.html            # Main HTML file
├── offline.html          # Offline fallback page
├── manifest.json         # Web App Manifest
├── service-worker.js     # Service Worker
├── robots.txt            # SEO configuration
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
- [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/) for the image gallery

## Contact

For any inquiries, please contact us at [contact@ambururu.com](mailto:contact@ambururu.com) or call +254 720 215 511.
