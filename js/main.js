/* ===================================================
   ukigumo wedding — Main JavaScript with Premium Animations
   Navigation, Scroll Reveal, Text Animation, Parallax,
   Clip-path Reveal, Lazy Image Loading, Tab Switching
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // NAVIGATION & SCROLL
  // ========================

  // Navigation hamburger toggle with overflow lock
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.nav__menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking on links
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Nav: hide on scroll down, show on scroll up
  if (nav) {
    let navLastY = window.scrollY;
    let navTicking = false;

    function updateNavTheme() {
      // Auto dark/light nav theme based on overlapping section
      var navH = nav.offsetHeight;
      var darkSections = document.querySelectorAll('[data-nav-dark]');
      var overDark = false;
      darkSections.forEach(function(sec) {
        var rect = sec.getBoundingClientRect();
        if (rect.top < navH && rect.bottom > 0) {
          overDark = true;
        }
      });
      if (overDark) {
        nav.classList.add('nav--light');
      } else {
        nav.classList.remove('nav--light');
      }
    }

    // Run theme check on page load
    updateNavTheme();

    window.addEventListener('scroll', function() {
      if (!navTicking) {
        requestAnimationFrame(function() {
          var currentY = window.scrollY;
          var delta = currentY - navLastY;

          if (currentY <= 10) {
            // At top: fully transparent, always visible
            nav.classList.remove('nav--hidden');
            nav.classList.remove('nav--scroll');
          } else if (delta > 5) {
            // Scrolling down: hide
            nav.classList.add('nav--hidden');
          } else if (delta < -3) {
            // Scrolling up: show with subtle backdrop
            nav.classList.remove('nav--hidden');
            nav.classList.add('nav--scroll');
          }

          updateNavTheme();

          navLastY = currentY;
          navTicking = false;
        });
        navTicking = true;
      }
    }, { passive: true });
  }

  // ========================
  // SCROLL REVEAL (existing)
  // ========================

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========================
  // ABOUT SECTION — no scroll animation (always visible)
  // ========================

  // ========================
  // HERO TAGLINE ANIMATION
  // ========================

  const heroTagline = document.querySelector('.hero__tagline');
  if (heroTagline) {
    const lines = heroTagline.querySelectorAll('.line');
    heroTagline.classList.add('animate');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('show');
      }, 600 + i * 400);
    });
  }

  // ========================
  // Q&A ACCORDION
  // ========================

  document.querySelectorAll('.qa-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.qa-item');
      if (!item) return;

      const wasActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.qa-item').forEach(q => q.classList.remove('active'));

      // Toggle current item if it wasn't active
      if (!wasActive) item.classList.add('active');
    });
  });

  // ========================
  // GALLERY FILTER
  // ========================

  const filterBtns = document.querySelectorAll('.gallery-filter__btn');
  const galleryItems = document.querySelectorAll('.gallery-grid__item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.location === filter) {
            item.style.display = '';
            setTimeout(() => item.style.opacity = '1', 50);
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 400);
          }
        });
      });
    });
  }

  // ========================
  // GALLERY TAB SWITCHING
  // ========================

  const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
  if (galleryTabBtns.length > 0) {
    galleryTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;

        // Update active button
        galleryTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle sections
        const photoSection = document.querySelector('.gallery-photo-section');
        const filmSection = document.querySelector('.gallery-film-section');

        if (tabName === 'photo' && photoSection && filmSection) {
          photoSection.style.display = '';
          filmSection.style.display = 'none';
          photoSection.style.opacity = '0';
          setTimeout(() => photoSection.style.opacity = '1', 50);
        } else if (tabName === 'film' && photoSection && filmSection) {
          filmSection.style.display = '';
          photoSection.style.display = 'none';
          filmSection.style.opacity = '0';
          setTimeout(() => filmSection.style.opacity = '1', 50);
        }
      });
    });
  }

  // ========================
  // TAB SWITCHING
  // ========================

  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;

        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show/hide tab content
        const allPanels = document.querySelectorAll('.tab-content');
        allPanels.forEach(panel => {
          if (panel.dataset.tab === tabName) {
            panel.style.display = '';
            setTimeout(() => panel.style.opacity = '1', 50);
          } else {
            panel.style.opacity = '0';
            setTimeout(() => panel.style.display = 'none', 400);
          }
        });
      });
    });
  }

  // ========================
  // CLIP-PATH REVEAL ANIMATION
  // ========================

  const clipRevealElements = document.querySelectorAll('.clip-reveal');
  const clipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        clipObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  clipRevealElements.forEach(el => clipObserver.observe(el));

  // ========================
  // LAZY IMAGE LOADING WITH REVEAL
  // ========================

  const lazyImages = document.querySelectorAll('.lazy-reveal');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        lazyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  lazyImages.forEach(img => lazyObserver.observe(img));

  // ========================
  // STAGGER CHILDREN ANIMATION
  // ========================

  const staggerContainers = document.querySelectorAll('.stagger-children');
  staggerContainers.forEach(container => {
    const children = container.querySelectorAll(':scope > *');
    children.forEach((child, index) => {
      child.style.setProperty('--stagger-index', index);
      child.classList.add('stagger-item');
    });

    // Trigger animation when container comes into view
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    staggerObserver.observe(container);
  });

  // ========================
  // PARALLAX EFFECT
  // ========================

  // Parallax effect — apply only to images inside .parallax containers
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const img = el.querySelector('img');
        if (!img) return;
        const yTranslate = rect.top * 0.15;
        img.style.transform = `scale(1.05) translateY(${yTranslate}px)`;
      });
    });
  }

  // ========================
  // SMOOTH ANCHOR LINK SCROLL
  // ========================

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================
  // SMOOTH PAGE TRANSITIONS
  // ========================

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });

  // ========================
  // FADE IN ON PAGE LOAD
  // ========================

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
