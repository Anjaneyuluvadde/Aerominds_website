document.addEventListener('DOMContentLoaded', () => {
  // --- Global Logo Logic ---
  const LOGO_CONFIG = {
    header: 'assets/images/Logo.png',
    footer: 'assets/images/Logo.png',
    favicon: 'assets/images/logo_header_transparent.png'
  };

  const headerLogoImg = document.querySelector('.navbar .brand img');
  if (headerLogoImg) headerLogoImg.src = LOGO_CONFIG.header;

  const footerLogoImg = document.querySelector('footer .footer-col img');
  if (footerLogoImg) footerLogoImg.src = LOGO_CONFIG.footer;

  // Mobile Nav Toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Sticky Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for Scroll Animations
  const animationSelectors = [
    '.fade-in', '.scale-in', '.slide-left', '.slide-right', '.reveal-clip',
    '.flip-card-left', '.flip-card-right', '.slide-snap-left', '.slide-snap-right',
    '.scale-pop', '.card-expand-glow', '.pivot-in', '.hero-badge-assembly',
    '.hero-title-assembly', '.hero-subtext-assembly', '.hero-buttons-assembly',
    '.card-rising-tilt', '.counter-pop', '.scan-grid-card',
    '.scanner-sweep', '.layer-bg-offset', '.layer-fg-offset', '.assemble-top-left',
    '.assemble-top-right', '.assemble-bottom-center', '.cable-path-line', '.form-tilt-3d',
    '.diagonal-reveal', '.timeline-progress-line', '.circle-mask-reveal',
    '.bento-assemble', '.holographic-reveal', '.phone-slide-in',
    '.card-rise-3d', '.split-reveal', '.zigzag-cards', '.timeline-journey',
    '.aerial-scan', '.showroom-carousel', '.mechanical-assembly', '.stacked-layers',
    '.radar-pulse', '.floating-glass', '.logo-orbit', '.accordion-cascade',
    '.blueprint-form', '.mist-reveal'
  ].join(', ');

  const animateElements = document.querySelectorAll(animationSelectors);

  // Immediately animate hero elements on load to prevent any observer latency or rendering bugs
  const heroAssembly = document.querySelectorAll('.hero-badge-assembly, .hero-title-assembly, .hero-subtext-assembly, .hero-buttons-assembly');
  heroAssembly.forEach(el => el.classList.add('appear'));

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before entering viewport
    threshold: 0.05
  };

  function animateCountUp(el) {
    const originalText = el.innerText.trim();
    const match = originalText.match(/^([^\d]*?)(\d+[\.\d]*)([^\d]*)$/);
    if (!match) return;

    const prefix = match[1];
    const numberVal = parseFloat(match[2]);
    const suffix = match[3];

    let start = 0;
    const duration = 1200; // 1.2 seconds duration
    const startTime = performance.now();

    el.dataset.counted = "true";

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);

      const currentVal = Math.floor(easeProgress * numberVal);
      el.innerText = `${prefix}${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerText = originalText;
      }
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');

        // If the element has a count-up trigger or contains one
        if (entry.target.classList.contains('counter-pop')) {
          const heading = entry.target.querySelector('h2');
          if (heading && !heading.dataset.counted) {
            animateCountUp(heading);
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // Dedicated observer for Section 1 (Our Core Expertise) to ensure the timeline journey
  // animation only triggers when the user actually scrolls down from the Hero section.
  const s1Element = document.querySelector('.organic-growth');
  if (s1Element) {
    const triggerS1Appear = () => {
      s1Element.classList.add('appear');
      const svg = s1Element.parentElement.querySelector('.bento-timeline-svg');
      if (svg) svg.classList.add('appear');
    };

    // Trigger animation immediately when mouse pointer enters the section
    s1Element.addEventListener('mouseenter', triggerS1Appear, { once: true });

    const s1Observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerS1Appear();
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -150px 0px', // Requires 150px entrance to prevent triggering on page load
      threshold: 0.1
    });
    s1Observer.observe(s1Element);
  }

  // Handle Image Loading States
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      const parent = img.parentElement;
      if (parent && (parent.classList.contains('icon-box') || parent.classList.contains('card-img') || parent.classList.contains('course-card'))) {
        parent.classList.add('loading-bg');
      }

      img.addEventListener('load', () => {
        const parent = img.parentElement;
        if (parent) parent.classList.remove('loading-bg');
        img.classList.remove('loading-bg');
      });
    }
  });

  // --- Hero Slider Logic ---
  const heroData = [
    {
      title: "Remote Pilot Training (RPTO)",
      subtext: "DGCA-approved drone pilot training programs with certification in collaboration with SynchroServe RPTO",
      primaryBtnText: "Enroll Now",
      secondaryBtnText: "Explore Courses"
    },
    {
      title: "Agriculture Drone Services",
      subtext: "Boost your crop yields with precision spraying, multispectral monitoring, and smart farming data solutions.",
      primaryBtnText: "Book Service",
      secondaryBtnText: "View Solutions"
    },
    {
      title: "Drone Repair & Maintenance",
      subtext: "Comprehensive repair, servicing, and preventive maintenance contracts to keep your fleet flying safely.",
      primaryBtnText: "Get Support",
      secondaryBtnText: "Check Coverages"
    },
    {
      title: "Drone-Based Survey & Mapping",
      subtext: "High-precision aerial surveys and 3D terrain modeling for infrastructure, construction, and planning.",
      primaryBtnText: "Request Survey",
      secondaryBtnText: "See Details"
    },
    {
      title: "Drone Sales & Consultation",
      subtext: "End-to-end support for procurement, compliance, component setup, and operational guidance.",
      primaryBtnText: "Consult Now",
      secondaryBtnText: "View Catalog"
    },
    {
      title: "Drone-Assisted Cable Deployment",
      subtext: "Building-to-building pilot rope deployment for faster, safer, and cheaper fiber optic installation.",
      primaryBtnText: "Request Deployment",
      secondaryBtnText: "Learn More"
    }
  ];

  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.slider-nav .slider-dot');

  const hTitle = document.getElementById('hero-title');
  const hSubtext = document.getElementById('hero-subtext');
  const textContainer = document.getElementById('hero-text-container');
  const primaryBtn = document.getElementById('hero-btn-primary');
  const secondaryBtn = document.getElementById('hero-btn-secondary');

  function updateSlider(index) {
    if (slides.length === 0) return;

    // Toggle active slide
    slides.forEach((sl, i) => sl.classList.toggle('active-slide', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

    if (!textContainer) return;

    // Fade out text
    textContainer.style.opacity = 0;
    textContainer.style.transform = 'translateY(15px)';

    setTimeout(() => {
      const data = heroData[index];
      if (hTitle) hTitle.innerHTML = data.title;
      if (hSubtext) hSubtext.innerHTML = data.subtext;
      if (primaryBtn) primaryBtn.innerHTML = data.primaryBtnText;
      if (secondaryBtn) secondaryBtn.innerHTML = data.secondaryBtnText;

      // Dynamic redirection targets for hero buttons
      const routes = [
        "training.html",
        "spraying.html",
        "repair.html",
        "mapping.html",
        "sales.html",
        "cable.html"
      ];
      if (primaryBtn) primaryBtn.href = routes[index];
      if (secondaryBtn) secondaryBtn.href = routes[index];

      // Fade in text
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';
    }, 300);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      currentSlide = parseInt(e.target.dataset.index);
      updateSlider(currentSlide);
      resetSlideTimer();
    });
  });

  let slideInterval;
  function startSlideTimer() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % heroData.length;
      updateSlider(currentSlide);
    }, 6000);
  }

  function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
  }

  if (dots.length > 0) {
    startSlideTimer();
    updateSlider(0); // Initial state sync
  }

  // --- Legal Page Tab System Logic ---
  const mainTabs = document.querySelectorAll('.tab-btn');
  if (mainTabs.length > 0) {
    mainTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        // Switch Tab Buttons
        mainTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Switch Active Content Wrappers
        document.querySelectorAll('.legal-content-wrapper').forEach(wrapper => {
          wrapper.classList.remove('active-content');
        });
        const targetWrapper = document.getElementById(targetId);
        if (targetWrapper) {
          targetWrapper.classList.add('active-content');
          const tabAnimElements = targetWrapper.querySelectorAll('.slide-snap-left, .slide-snap-right');
          tabAnimElements.forEach(el => {
            el.classList.remove('appear');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('appear');
          });
        }
      });
    });
  }

  // --- FAQ Accordion Cascade Logic ---
  const faqHeaders = document.querySelectorAll('.cascade-faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const panel = item.querySelector('.cascade-faq-panel');
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.cascade-faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.cascade-faq-panel').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
});
