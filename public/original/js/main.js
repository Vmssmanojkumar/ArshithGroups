document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     PRELOADER
  ============================================================ */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 400);
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') {
      setTimeout(() => preloader.classList.add('hidden'), 400);
    }
  }

  /* Custom cursor disabled */

  /* ============================================================
     MOBILE DRAWER — SLIDE-IN
  ============================================================ */
  const menuToggle  = document.querySelector('.menu-toggle');
  const navLinks    = document.querySelector('.nav-links');
  const menuOverlay = document.getElementById('menuOverlay');
  const drawerClose = document.querySelector('.drawer-close');

  const openDrawer = () => {
    navLinks.classList.add('active');
    menuOverlay && menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    const icon = menuToggle?.querySelector('i');
    if (icon) { icon.classList.replace('fa-bars', 'fa-times'); }
  };

  const closeDrawer = () => {
    navLinks.classList.remove('active');
    menuOverlay && menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    const icon = menuToggle?.querySelector('i');
    if (icon) { icon.classList.replace('fa-times', 'fa-bars'); }
  };

  if (menuToggle) menuToggle.addEventListener('click', () => navLinks.classList.contains('active') ? closeDrawer() : openDrawer());
  if (menuOverlay) menuOverlay.addEventListener('click', closeDrawer);
  if (drawerClose)  drawerClose.addEventListener('click', closeDrawer);

  /* ============================================================
     SMOOTH SCROLLING (same-page anchor links)
  ============================================================ */
  const NAVBAR_HEIGHT = document.querySelector('.navbar')?.offsetHeight || 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;
      e.preventDefault();
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT - 12;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      closeDrawer(); // close mobile drawer if open
    });
  });

  /* ============================================================
     TYPEWRITER EFFECT
  ============================================================ */
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const words = JSON.parse(typewriterEl.getAttribute('data-words'));
    let wait = 3000, wordIndex = 0, txt = '', isDeleting = false;
    const type = () => {
      const current = wordIndex % words.length;
      const fullTxt  = words[current];
      txt = isDeleting ? fullTxt.substring(0, txt.length - 1) : fullTxt.substring(0, txt.length + 1);
      typewriterEl.innerHTML = txt;
      let typeSpeed = isDeleting ? 50 : 100;
      if (!isDeleting && txt === fullTxt) { typeSpeed = wait; isDeleting = true; }
      else if (isDeleting && txt === '')  { isDeleting = false; wordIndex++; typeSpeed = 500; }
      setTimeout(type, typeSpeed);
    };
    setTimeout(type, 1000);
  }

  /* ============================================================
     STICKY HEADER
  ============================================================ */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 6px -1px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)';
    });
  }

  /* ============================================================
     SCROLL SPY — ACTIVE NAV LINK
  ============================================================ */
  const spySections  = document.querySelectorAll('section[id]');
  const navAnchors   = document.querySelectorAll('.nav-links li a');

  if (spySections.length && navAnchors.length) {
    const spyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            const href = a.getAttribute('href');
            const isMatch = href === `#${id}` || href === `index.html#${id}`;
            a.classList.toggle('active', isMatch);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' });
    spySections.forEach(s => spyObserver.observe(s));
  }

  /* ============================================================
     BACK TO TOP BUTTON
  ============================================================ */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => backToTopBtn.classList.toggle('visible', window.scrollY > 400));
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ============================================================
     NUMBER COUNTER ANIMATION (Stats section)
  ============================================================ */
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const startCounters = () => {
    counters.forEach(counter => {
      counter.innerText = '0';
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count  = +counter.innerText;
        const inc    = target / speed;
        if (count < target) { counter.innerText = Math.ceil(count + inc); setTimeout(updateCount, 15); }
        else { counter.innerText = target; }
      };
      updateCount();
    });
  };

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) startCounters();
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* ============================================================
     SCROLL REVEAL ANIMATIONS — repeatable every scroll
  ============================================================ */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ============================================================
     HERO PARTICLES CANVAS
  ============================================================ */
  const canvas = document.getElementById('heroParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = 65;

    const resizeCanvas = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }

  /* ============================================================
     SERVICE CARD MODAL
  ============================================================ */
  const serviceModal = document.getElementById('serviceModal');
  const serviceData = {
    'digital-transformation': {
      icon: 'fa-laptop-code', title: 'Digital Transformation',
      desc: 'We partner with enterprises to reimagine their entire digital value chain — from customer-facing applications to back-office operations — using AI, analytics, and next-gen cloud platforms.',
      features: ['AI-powered process automation and intelligent workflows', 'Customer experience modernization across all digital touchpoints', 'Legacy system migration with zero business disruption', 'Data strategy and advanced analytics platforms', 'Change management and digital adoption programs']
    },
    'cloud-computing': {
      icon: 'fa-cloud', title: 'Cloud Computing',
      desc: 'From strategy to migration and ongoing optimization, we architect cloud environments that scale with your ambition — whether on AWS, Azure, Google Cloud, or a hybrid model.',
      features: ['Multi-cloud and hybrid cloud architecture design', 'Secure, zero-downtime cloud migration programs', 'Cloud-native application development and modernization', 'FinOps: continuous cost optimization and governance', '24/7 managed cloud operations and monitoring']
    },
    'engineering-rd': {
      icon: 'fa-cogs', title: 'Engineering & R&D',
      desc: 'We accelerate your product development lifecycle through engineering excellence — combining deep domain expertise with cutting-edge automation, IoT, and platform engineering.',
      features: ['Product engineering from prototype to global scale', 'IoT platform design and connected device ecosystems', 'Embedded systems and firmware engineering', 'Test automation and quality engineering', 'Agile R&D labs and innovation sprints']
    },
    'enterprise-software': {
      icon: 'fa-cubes', title: 'Enterprise Software',
      desc: 'Our portfolio of enterprise-grade software products and custom solutions covers everything from intelligent automation to next-gen customer experience platforms.',
      features: ['Custom ERP and CRM platform development', 'DevSecOps toolchain integration and automation', 'Intelligent document processing and workflow automation', 'API-first microservices architecture', 'SaaS product development and productization']
    },
    'infrastructure-mgmt': {
      icon: 'fa-network-wired', title: 'Infrastructure Management',
      desc: 'We manage complex, mission-critical IT environments with precision — delivering reliability, security, and operational excellence across your entire infrastructure estate.',
      features: ['End-to-end data center management and optimization', 'Zero-trust cybersecurity architecture and SOC operations', 'Network infrastructure design and SD-WAN deployment', 'Disaster recovery and business continuity planning', 'Compliance management: ISO 27001, SOC2, GDPR']
    }
  };

  if (serviceModal) {
    const modalIcon     = serviceModal.querySelector('.modal-icon i');
    const modalTitle    = serviceModal.querySelector('.modal-box h2');
    const modalDesc     = serviceModal.querySelector('.modal-desc');
    const modalFeatures = serviceModal.querySelector('.modal-features');

    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => {
        const data = serviceData[card.getAttribute('data-modal')];
        if (!data) return;
        modalIcon.className     = `fas ${data.icon}`;
        modalTitle.textContent  = data.title;
        modalDesc.textContent   = data.desc;
        modalFeatures.innerHTML = data.features.map(f => `<li><i class="fas fa-check-circle"></i>${f}</li>`).join('');
        serviceModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => { serviceModal.classList.remove('open'); document.body.style.overflow = ''; };
    serviceModal.querySelector('.modal-close').addEventListener('click', closeModal);
    serviceModal.addEventListener('click', e => { if (e.target === serviceModal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  /* ============================================================
     CONTACT FORM SUBMISSION
  ============================================================ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit-btn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => { contactForm.style.display = 'none'; formSuccess.style.display = 'block'; }, 1500);
    });
  }

  /* ============================================================
     FLOATING CTA — collapse near footer
  ============================================================ */
  const floatingBtn = document.getElementById('floatingCtaBtn');
  if (floatingBtn) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY + window.innerHeight;
      floatingBtn.classList.toggle('collapsed', scrolled > document.documentElement.scrollHeight - 400);
    });
  }

  /* ============================================================
     COOKIE CONSENT BANNER
  ============================================================ */
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 1800);
    document.getElementById('cookieAccept')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('visible');
    });
    document.getElementById('cookieDecline')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('visible');
    });
  }

});
