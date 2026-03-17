/* ========================================
   VASTU CONSULTANCY - PREMIUM JAVASCRIPT
   Advanced Animations & Interactions
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initPageLoader();
  initCustomCursor();
  initSmoothScroll();
  initNavigation();
  initAnimations();
  initMagneticButtons();
  initGallery();
  initTestimonials();
  initContactForm();
  initPageTransitions();
});

/* ========================================
   PAGE LOADER
   ======================================== */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  
  window.addEventListener('load', () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
      }
    });
  });
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);
  
  // Mouse move handler
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    gsap.to(cursor, {
      x: x - 10,
      y: y - 10,
      duration: 0.15,
      ease: 'power2.out'
    });
    
    gsap.to(cursorDot, {
      x: x - 3,
      y: y - 3,
      duration: 0.08,
      ease: 'power2.out'
    });
  });
  
  const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .card, .gallery-item, .magnetic');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      gsap.to(cursor, { scale: 2.5, duration: 0.2 });
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    });
  });
}

/* ========================================
   SMOOTH SCROLL (Lenis)
   ======================================== */
/* ========================================
   SMOOTH SCROLL (Lenis + GSAP FIXED)
   ======================================== */
function initSmoothScroll() {
  if (typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: false,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Update ScrollTrigger on scroll
  if (typeof ScrollTrigger !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker instead of requestAnimationFrame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    // If GSAP not present, fallback RAF
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);
  
  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ========================================
   ANIMATIONS
   ======================================== */
function initAnimations() {
  if (typeof gsap === 'undefined') return;
  
  // Register ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.register({ gsap });
  }
  
  // Hero animations
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroDescription = document.querySelector('.hero-description');
  const heroButtons = document.querySelector('.hero-buttons');
  
  if (heroTitle && heroSubtitle) {
    const tl = gsap.timeline();
    
    tl.from(heroSubtitle, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    })
    .from(heroTitle, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from(heroDescription, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.7')
    .from(heroButtons, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');
  }
  
  // Section reveals
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Card stagger animations
  const cardContainers = document.querySelectorAll('.services-grid, .courses-grid, .features-grid');
  cardContainers.forEach(container => {
    gsap.from(container.children, {
      opacity: 0,
      y: 80,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Counter animations
  const counters = document.querySelectorAll('.counter-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    
    gsap.to(counter, {
      innerHTML: target,
      duration: 2,
      ease: 'power2.out',
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Timeline animations
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Gallery animations
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Testimonial animations
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Text stagger animations
  const staggerTexts = document.querySelectorAll('.stagger-text');
  staggerTexts.forEach(container => {
    const children = container.children;
    if (children.length > 0) {
      gsap.from(children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });
  
  // Parallax effects
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
    
    gsap.to(element, {
      y: (i, target) => ScrollTrigger.maxScroll(window) * speed * (i + 1) * 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  
  // Image reveal animations
  const imageReveals = document.querySelectorAll('.image-reveal');
  imageReveals.forEach(container => {
    const img = container.querySelector('img');
    if (img) {
      gsap.from(img, {
        scale: 1.3,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });
}

/* ========================================
   MAGNETIC BUTTONS
   ======================================== */
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}

/* ========================================
   GALLERY LIGHTBOX
   ======================================== */
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-close">×</div>
    <img src="" alt="">
  `;
  document.body.appendChild(lightbox);
  
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ========================================
   TESTIMONIALS CAROUSEL
   ======================================== */
function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial-slider');
  
  testimonials.forEach(slider => {
    const slides = slider.querySelectorAll('.testimonial-card');
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        gsap.to(slide, {
          opacity: i === index ? 1 : 0.3,
          scale: i === index ? 1 : 0.95,
          duration: 0.5,
          x: i === index ? 0 : (i < index ? -100 : 100)
        });
      });
    }
    
    // Auto advance
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);
    
    showSlide(0);
  });
}

/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
  const contactForm = document.querySelector('.contact-form form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
  
  // Form validation
  const inputs = contactForm.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validateField(input);
      }
    });
  });
  
  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
      isValid = false;
    } else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }
    
    if (isValid) {
      field.classList.remove('invalid');
      field.style.borderColor = 'var(--cream-dark)';
    } else {
      field.classList.add('invalid');
      field.style.borderColor = '#dc3545';
    }
    
    return isValid;
  }
}

/* ========================================
   PAGE TRANSITIONS
   ======================================== */
function initPageTransitions() {
  // Check if this is a multi-page site
  const currentPath = window.location.pathname;
  
  // Add exit animation on link clicks
  const navLinks = document.querySelectorAll('a[href^="/"]:not([href*="#"])');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');
      
      gsap.to(document.body, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          window.location.href = targetUrl;
        }
      });
    });
  });
  
  // Initial page entrance
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    delay: 0.5
  });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
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
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
   ======================================== */

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// Focus visible polyfill
document.querySelectorAll('a, button, [tabindex]').forEach(el => {
  el.addEventListener('focus', () => {
    el.classList.add('focus-visible');
  });
  
  el.addEventListener('blur', () => {
    el.classList.remove('focus-visible');
  });
});

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  gsap.globalTimeline.timeScale(0);
}

prefersReducedMotion.addEventListener('change', (e) => {
  gsap.globalTimeline.timeScale(e.matches ? 0 : 1);
});

// Intersection Observer for performance
const observerOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};

/* ========================================
   END OF SCRIPT
   ======================================== */
