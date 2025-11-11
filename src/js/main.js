// ===================================
// Stone House - Main JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // ===================================
  // Mobile Navigation Toggle
  // ===================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');

      // Animate hamburger icon
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // ===================================
  // Sticky Navigation on Scroll
  // ===================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===================================
  // Smooth Scrolling for Anchor Links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offset = 80; // Account for fixed navbar
        const targetPosition = target.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===================================
  // Scroll Reveal Animation
  // ===================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };

  if (revealElements.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
  }

  // ===================================
  // Image Gallery Lightbox
  // ===================================
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length > 0) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-img" src="" alt="">
        <button class="lightbox-prev">&#10094;</button>
        <button class="lightbox-next">&#10095;</button>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox styles
    const lightboxStyles = document.createElement('style');
    lightboxStyles.innerHTML = `
      .lightbox {
        display: none;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.95);
        justify-content: center;
        align-items: center;
      }
      .lightbox.active {
        display: flex;
      }
      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
      }
      .lightbox-img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
      }
      .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
      }
      .lightbox-close:hover {
        color: var(--color-secondary);
      }
      .lightbox-prev,
      .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(255,255,255,0.2);
        color: white;
        border: none;
        font-size: 30px;
        padding: 10px 15px;
        cursor: pointer;
        transition: 0.3s;
      }
      .lightbox-prev:hover,
      .lightbox-next:hover {
        background-color: rgba(255,255,255,0.4);
      }
      .lightbox-prev {
        left: -50px;
      }
      .lightbox-next {
        right: -50px;
      }
      @media (max-width: 768px) {
        .lightbox-prev { left: 10px; }
        .lightbox-next { right: 10px; }
      }
    `;
    document.head.appendChild(lightboxStyles);

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    const showImage = (index) => {
      const lightboxImg = lightbox.querySelector('.lightbox-img');
      lightboxImg.src = images[index];
      currentImageIndex = index;
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        lightbox.classList.add('active');
        showImage(index);
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      showImage(currentImageIndex);
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % images.length;
      showImage(currentImageIndex);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          lightbox.classList.remove('active');
          document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft') {
          currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
          showImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          showImage(currentImageIndex);
        }
      }
    });
  }

  // ===================================
  // Form Validation & Submission
  // ===================================
  const contactForms = document.querySelectorAll('.contact-form');

  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        // Here you would typically send the form data to a server
        // For now, just show a success message
        alert('Thank you for your inquiry! We will be in touch soon.');
        form.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });

  // ===================================
  // Lazy Loading Images
  // ===================================
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // ===================================
  // Parallax Effect for Hero Images
  // ===================================
  const heroSections = document.querySelectorAll('.hero');

  window.addEventListener('scroll', () => {
    heroSections.forEach(hero => {
      const heroHeight = hero.offsetHeight;
      const scrolled = window.pageYOffset;
      const heroOffset = hero.offsetTop;

      if (scrolled < heroOffset + heroHeight && scrolled > heroOffset - window.innerHeight) {
        const parallaxSpeed = 0.5;
        const yPos = (scrolled - heroOffset) * parallaxSpeed;
        const heroBg = hero.querySelector('.hero-bg');
        if (heroBg) {
          heroBg.style.transform = `translateY(${yPos}px)`;
        }
      }
    });
  });

  // ===================================
  // Counter Animation
  // ===================================
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        animateCounter(entry.target);
        entry.target.classList.add('animated');
      }
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));

  // ===================================
  // Back to Top Button
  // ===================================
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '&uarr;';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  const backToTopStyles = document.createElement('style');
  backToTopStyles.innerHTML = `
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background-color: var(--color-secondary);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    .back-to-top:hover {
      background-color: var(--color-gold);
      transform: translateY(-5px);
    }
  `;
  document.head.appendChild(backToTopStyles);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===================================
  // Space Carousels
  // ===================================
  const spaceCarousels = document.querySelectorAll('.space-carousel');

  spaceCarousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = carousel.querySelector('.carousel-btn-prev');
    const nextButton = carousel.querySelector('.carousel-btn-next');
    const dotsNav = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    // Create dots
    if (dotsNav) {
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dotsNav.appendChild(dot);
      });
    }

    const dots = Array.from(dotsNav?.children || []);

    const updateCarousel = (index) => {
      // Update active states for opacity-based carousel
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentIndex = index;
    };

    // Next button
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        updateCarousel(nextIndex);
      });
    }

    // Previous button
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
      });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateCarousel(index);
      });
    });

    // Auto-advance carousel every 5 seconds
    setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      updateCarousel(nextIndex);
    }, 5000);
  });

  // ===================================
  // Randomize Gallery Images
  // ===================================
  const allImages = [
    // Weddings
    'weddings/Wedding Shoot 1.webp',
    'weddings/Wedding Shoot 3.webp',
    'weddings/Wedding Shoot 4.webp',
    'weddings/Wedding Shoot 5.webp',
    'weddings/Wedding Shoot 6.webp',
    'weddings/Wedding Shoot 7.webp',
    'weddings/Wedding Shoot 8.webp',
    'weddings/Wedding Shoot 9.webp',
    'weddings/Wedding Shoot 10.webp',
    'weddings/Wedding Shoot 11.webp',
    'weddings/Wedding Shoot 12.webp',
    'weddings/Wedding Shoot 13.webp',
    'weddings/Wedding Shoot 14.webp',
    'weddings/Wedding Shoot 15.webp',
    'weddings/Wedding Shoot 16.webp',
    'weddings/Wedding Shoot 17.webp',
    'weddings/Wedding Shoot 18.webp',
    'weddings/Wedding Shoot 19.webp',
    'weddings/Wedding Shoot 20.webp',
    'weddings/Wedding Shoot 21.webp',
    'weddings/Wedding Shoot 22.webp',
    'weddings/Wedding Shoot 23.webp',
    'weddings/Wedding Party.webp',
    'weddings/Wedding Venue.webp',
    'weddings/Wedding Venue2.webp',
    'weddings/Wedding Venue3.webp',
    'weddings/Wedding Venue4.webp',
    'weddings/Wedding Venue5.webp',
    'weddings/Sophie+Nic-6657.webp',
    'weddings/Sophie+Nic--34.webp',
    'weddings/S&J-0024.webp',
    'weddings/S&J-0026.webp',
    'weddings/Nevada City WeddingsScreenshot 2023-12-26 at 5.37.55 PM.webp',
    'weddings/Nevada City WeddingsScreenshot 2023-12-26 at 5.42.52 PM.webp',
    'weddings/Nevada City WeddingsScreenshot 2023-12-26 at 5.44.52 PM.webp',
    'weddings/Nevada City WeddingsScreenshot 2023-12-26 at 5.45.19 PM.webp',
    'weddings/Screenshot 2025-11-08 at 3.47.43 PM.webp',
    'weddings/Wedding Venue Rental Nevada County.webp',
    'weddings/lounge2.webp',
    // Spaces
    'Spaces/Greathall/GreatHallWeb.webp',
    'Spaces/Greathall/Wedding Dinning Room.webp',
    'Spaces/Showroom/Screenshot 2025-11-08 at 5.52.02 PM.webp',
    'Spaces/Showroom/Screenshot 2025-11-08 at 5.56.52 PM.webp',
    'Spaces/Courtyard/CourtyardEvents.webp',
    'Spaces/Cavern/Cavern.webp',
    'Spaces/Cavern/Cavern2.webp',
    'Spaces/Cavern/Cavern3.webp',
    'Spaces/Cavern/Cavern4.webp',
    'Spaces/Lounge/Lounge.webp',
    'Spaces/Palour/Parlor.webp',
    'Spaces/Palour/Venue Rental Nevada City_05.webp',
    'Spaces/Penthouse/Apartment.webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(1)-2.webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(3)-2.webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(6).webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(7).webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(9) (1).webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(12).webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(13).webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(14).webp',
    'Spaces/Penthouse/Stone+House+-+APT+Suite+(15).webp',
    // Social
    'Social/BestSocialEventVenue.webp',
    'Social/Birthday event space.webp',
    'Social/SocialEventSpace.webp',
    'Social/SocailEventVenueSpace.webp',
    'Social/5V7A7840.webp',
    // Nonprofit
    'Non Profit/Wild and scenic.webp',
    'Non Profit/NonProfitAwarenessVenue.webp',
    'Non Profit/NonProfitEventVenue.webp',
    'Non Profit/NonProfitEventVenue2.webp',
    'Non Profit/NonProfitEventVenue3.webp',
    'Non Profit/NonProfitEventVenue4.webp',
    'Non Profit/NonprofitEventVenue5.webp',
    'Non Profit/NonProfit.webp',
    'Non Profit/Nonprofit dinner venue.webp',
    // Other
    '_DSC7541.webp'
  ];

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Find all galleries and randomize their images
  const galleries = document.querySelectorAll('.gallery');

  galleries.forEach(gallery => {
    const galleryItems = gallery.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
      // Shuffle all available images
      const shuffledImages = shuffleArray(allImages);

      // Determine path prefix based on current page
      const pathPrefix = window.location.pathname.includes('/pages/') ? '../src/images/' : 'src/images/';

      // Update each gallery item with a random image
      galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img && shuffledImages[index]) {
          img.src = pathPrefix + shuffledImages[index];
          // Update alt text based on image name
          const imageName = shuffledImages[index].split('/').pop().replace('.webp', '').replace(/[_-]/g, ' ');
          img.alt = imageName;
        }
      });
    }
  });

  console.log('Stone House website initialized successfully!');
});
