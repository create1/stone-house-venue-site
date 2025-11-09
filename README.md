# Stone House Event Venue Website

A modern, responsive website for Stone House - a historic event venue in Nevada City, California.

## Overview

This website showcases Stone House's unique event spaces, services, and upcoming public events. Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy maintenance.

## Features

- **Responsive Design**: Fully responsive layout that works beautifully on all devices
- **Modern UI/UX**: Clean, elegant design with smooth animations and transitions
- **Multiple Pages**:
  - Home page with hero section and overview
  - Spaces page showcasing all venue areas
  - Private Events page for weddings and celebrations
  - Public Events page with upcoming shows
  - Contact page with booking form
- **Interactive Elements**:
  - Mobile-friendly navigation
  - Image gallery with lightbox
  - Smooth scroll animations
  - Form validation
  - Back to top button
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Fast loading with optimized assets

## Project Structure

```
Stone House Venue Site/
├── index.html              # Homepage
├── pages/
│   ├── spaces.html         # Venue spaces
│   ├── private-events.html # Private events
│   ├── public-events.html  # Public events
│   └── contact.html        # Contact & booking
├── src/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images/             # Image assets (to be added)
├── scraped/                # Original scraped content
└── README.md               # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. Clone or download this repository to your local machine

2. Navigate to the project directory:
   ```bash
   cd "Stone House Venue Site"
   ```

3. Open the website:

   **Option A: Direct file opening (simple)**
   - Open `index.html` in your web browser

   **Option B: Using a local server (recommended)**

   With Python 3:
   ```bash
   python -m http.server 8000
   ```
   Then visit: http://localhost:8000

   With Node.js (using npx):
   ```bash
   npx serve
   ```

   With VS Code:
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

## Customization

### Adding Your Own Images

Replace the Unsplash placeholder images with actual Stone House photos:

1. Add your images to the `src/images/` folder
2. Update the `src` attributes in the HTML files
3. Recommended image sizes:
   - Hero images: 1920x1080px
   - Space cards: 800x600px
   - Gallery images: 600x600px
   - Event cards: 800x500px

### Color Scheme

The color scheme can be customized in `src/css/styles.css` by modifying the CSS variables:

```css
:root {
  --color-primary: #1a3a2e;    /* Dark green */
  --color-secondary: #c9a961;  /* Gold */
  --color-accent: #8b7355;     /* Brown */
  --color-dark: #0f1a16;       /* Almost black */
  --color-light: #f5f5f0;      /* Off-white */
  --color-cream: #faf8f3;      /* Cream */
}
```

### Typography

Fonts can be changed by updating the Google Fonts link in the HTML `<head>` and the CSS variables:

```css
:root {
  --font-primary: 'Playfair Display', serif;
  --font-secondary: 'Lora', serif;
  --font-body: 'Open Sans', sans-serif;
  --font-heading: 'Montserrat', sans-serif;
}
```

## Content Updates

### Updating Event Listings

Edit `pages/public-events.html` to add/remove events:

```html
<div class="card reveal">
  <img src="path-to-image.jpg" alt="Event" class="card-img">
  <div class="card-content">
    <p class="small-caps" style="color: var(--color-secondary);">Date</p>
    <h3 class="card-title">Event Title</h3>
    <p class="card-text">Event description...</p>
    <a href="ticket-link" class="btn btn-primary mt-md">Get Tickets</a>
  </div>
</div>
```

### Updating Contact Information

Contact details are in the footer of each page. Update in all files or consider creating a footer component for easier maintenance.

## Features Breakdown

### Navigation
- Fixed navbar with smooth scroll
- Mobile hamburger menu
- Active page highlighting
- Transparent to solid transition on scroll

### Forms
- Contact form with validation
- Event inquiry form with multiple fields
- Newsletter signup
- Client-side validation

### Animations
- Fade-in on scroll
- Slide-in effects
- Hover transitions
- Parallax hero images

### Gallery
- Clickable images
- Full-screen lightbox
- Keyboard navigation (arrow keys, Escape)
- Mobile-friendly

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization Tips

1. **Images**:
   - Compress images before uploading
   - Use WebP format for better compression
   - Implement lazy loading for below-the-fold images

2. **CSS**:
   - Minify CSS for production
   - Consider critical CSS for above-the-fold content

3. **JavaScript**:
   - Minify JS for production
   - Consider code splitting for larger applications

4. **Caching**:
   - Set up proper cache headers on your server
   - Use a CDN for static assets

## Deployment

### Deploying to Netlify

1. Create a free account at [Netlify](https://www.netlify.com/)
2. Drag and drop the project folder onto Netlify
3. Your site will be live in seconds!

### Deploying to GitHub Pages

1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings > Pages
4. Select your branch and save
5. Your site will be available at `https://yourusername.github.io/repository-name/`

### Deploying to a Traditional Host

1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in the root directory
3. Set up proper file permissions (644 for files, 755 for directories)

## Form Integration

The contact form currently uses client-side validation only. To make it functional:

### Option 1: Email Service (FormSubmit, Formspree)

Add to your form:
```html
<form action="https://formsubmit.co/your@email.com" method="POST">
  <!-- form fields -->
</form>
```

### Option 2: Custom Backend

Implement a server-side handler:
- PHP script
- Node.js with Express
- Python with Flask/Django
- Netlify Functions (serverless)

### Option 3: Third-party Booking System

Integrate with existing booking platforms:
- HoneyBook (currently used by Stone House)
- Eventbrite for public events
- Custom booking API

## Accessibility

The website follows WCAG 2.1 guidelines:
- Semantic HTML
- Proper heading hierarchy
- Alt text for images (add descriptive alt text when adding real images)
- Keyboard navigation support
- ARIA labels where appropriate
- Sufficient color contrast

## Future Enhancements

Consider adding:
- [ ] Blog section for events and news
- [ ] Online booking system integration
- [ ] Virtual venue tour (360° photos)
- [ ] Customer testimonial slider
- [ ] Instagram feed integration
- [ ] Event calendar with filtering
- [ ] Menu/catering showcase
- [ ] Photo gallery with categories
- [ ] Email newsletter integration
- [ ] Analytics integration (Google Analytics)
- [ ] Live chat support
- [ ] Multilingual support

## Maintenance

### Regular Updates
- Update event listings weekly
- Refresh testimonials quarterly
- Update photos seasonally
- Check and fix broken links monthly
- Update copyright year annually

### Content Strategy
- Add blog posts about events
- Share customer stories
- Showcase seasonal decorations
- Post vendor spotlights
- Share planning tips

## Support & Resources

### Fonts
- [Google Fonts](https://fonts.google.com/)

### Icons
- [Font Awesome](https://fontawesome.com/)

### Images
- [Unsplash](https://unsplash.com/) - Free high-quality images
- [Pexels](https://www.pexels.com/) - Free stock photos

### Tools
- [TinyPNG](https://tinypng.com/) - Image compression
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance testing

## Contact

For questions or support regarding this website:

**Stone House**
- Address: 107 Sacramento Street, Nevada City, CA 95959
- Phone: (530) 265-5050
- Email: bookings@stonehouse.io
- Website: www.stonehouse.io

## License

This website is proprietary and confidential. All rights reserved.

---

Built with care for Stone House, Nevada City's premier historic event venue.
