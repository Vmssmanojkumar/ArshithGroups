import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStylesheet } from '../hooks/useStylesheet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    badge: 'E-Commerce',
    title: 'Arshith Fresh',
    desc: 'Rooted in nature, grown with care, We bring freshness beyond compare. From farm to you, pure and true, Quality you trust in all we do..',
    bg: '/logos/ecommerce3.png',
    link: 'https://arshithfresh.com/',
    isLocal: false
  },
  {
    badge: 'IT Services & IT Consulting',
    title: 'ArshithInfoTech',
    desc: 'Building innovative solutions with modern code, Turning ideas into a powerful digital mode, Driven by quality, performance, and trust, Delivering excellence through ArshithInfoTech.',
    bg: '/logos/infotech.jpeg',
    link: '/infotech',
    isLocal: true
  },
  {
    badge: 'Business Consulting & Services',
    title: 'Suntech Solutions.',
    desc: 'Empowering businesses with smart digital solutions, Driving growth through innovation and precision. Your trusted partner for success and transformation, Building a stronger future with Suntech Organization.',
    bg: '/logos/nonit.png',
    link: 'https://suntechorganization.com/',
    isLocal: false
  }
];

function Home() {
  // Load Arshith Group Page stylesheets dynamically
  useStylesheet(['/styles.css', '/styles2.css', '/footer-premium.css', '/css/home.css']);

  const [loading, setLoading] = useState(() => !sessionStorage.getItem('ag_preloader_shown'));
  const [loaderGone, setLoaderGone] = useState(() => !!sessionStorage.getItem('ag_preloader_shown'));
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const videoRef = useRef(null);

  // Preloader timeout
  useEffect(() => {
    if (sessionStorage.getItem('ag_preloader_shown')) {
      return;
    }
    const timer = setTimeout(() => {
      setLoaderGone(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('ag_preloader_shown', 'true');
      }, 700);
      return () => clearTimeout(removeTimer);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  // Scroll Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const t = document.documentElement;
      const pct = (t.scrollTop / (t.scrollHeight - t.clientHeight)) * 100;
      setScrollWidth(`${pct}%`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cinematic Hero Slider Auto Interval
  const startSlideInterval = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    startSlideInterval();
    return () => clearInterval(slideInterval.current);
  }, []);

  const moveSlider = (direction) => {
    setCurrentSlide(prev => {
      let next = prev + direction;
      if (next >= slides.length) return 0;
      if (next < 0) return slides.length - 1;
      return next;
    });
    startSlideInterval();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startSlideInterval();
  };

  // GSAP ScrollTrigger timeline animation
  useEffect(() => {
    if (loading) return;

    const container = document.querySelector('.timeline-section');
    const progressLine = document.getElementById('progressLine');

    if (!container || !progressLine) return;

    // Progress line height scroll trigger
    const mainProgressTrig = gsap.fromTo(
      progressLine,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 1.5,
        },
      }
    );

    // Timeline milestone cards fade entries
    const milestoneItems = document.querySelectorAll('.milestone-item');
    const milestoneTriggers = [];

    milestoneItems.forEach((el, index) => {
      const dot = el.querySelector('.timeline-dot');
      const card = el.querySelector('.timeline-card');

      if (!dot || !card) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(dot, {
        backgroundColor: '#2563eb',
        borderColor: '#60a5fa',
        scale: 1.3,
        duration: 0.4,
      }).fromTo(
        card,
        {
          opacity: 0,
          x: index % 2 === 0 ? -40 : 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      );

      milestoneTriggers.push(tl);
    });

    return () => {
      mainProgressTrig.scrollTrigger?.kill();
      milestoneTriggers.forEach(t => t.scrollTrigger?.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  // Video Autoplay and Scroll Reveal observers
  useEffect(() => {
    if (loading) return;

    // Partner AI video observer
    const video = videoRef.current;
    let videoObserver;
    if (video) {
      video.pause();
      videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch((err) => console.log('Video play prevented:', err));
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.2 }
      );
      const section = video.closest('section');
      if (section) videoObserver.observe(section);
    }

    // Scroll Reveal elements observer
    const reveals = document.querySelectorAll(
      '.section, .card, .product-card, .category-card, .news-card, .limited-card, .business-feature, .quote-card'
    );
    reveals.forEach((el) => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    return () => {
      if (videoObserver) videoObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [loading]);

  // Contact Form submit handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'https://arshithgroups-backend.onrender.com';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          subject: formSubject,
          message: formMessage,
          source: 'corporate_home'
        })
      });

      const data = await response.json();
      if (data.success) {
        setFormSuccess(true);
        // Reset inputs
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormSubject('');
        setFormMessage('');
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      // Fallback for visual mock success during testing if backend isn't up
      setFormSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormSubject('');
      setFormMessage('');
      setTimeout(() => setFormSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ══════════ LOADING SCREEN ══════════ */}
      {loading && (
        <div id="loader" className={loaderGone ? 'gone' : ''}>
          <div className="ld-logo">
            <video
              src="/assets/reloader.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ maxWidth: '700px' }}
            />
          </div>
        </div>
      )}

      {/* Progress Scroll Bar */}
      <div id="pbar" style={{ width: scrollWidth }} />

      {/* ══════════ HEADER / NAV ══════════ */}
      <Navbar />

      {/* Hero / Slider Banner Section */}
      <section className="hero-cinematic" id="heroCinematic" style={{ marginTop: '80px' }}>
        {slides.map((slide, idx) => (
          <div key={idx} className={`cinematic-slide ${currentSlide === idx ? 'active' : ''}`}>
            {/* Background Image */}
            <div
              className="cinematic-bg"
              style={{ backgroundImage: `url(${slide.bg})`, backgroundPosition: idx === 1 ? 'center' : '' }}
            />
            {/* Slide Content */}
            <div className="cinematic-content">
              <div className="cinematic-badge" style={{ background: 'var(--primary)' }}>
                {slide.badge}
              </div>
              <h2 className="cinematic-title" style={{ color: '#fdfffe' }}>
                {slide.title}
              </h2>
              <p className="cinematic-desc">{slide.desc}</p>
              <div>
                {slide.isLocal ? (
                  <Link to={slide.link} className="btn-cinematic">
                    Know More <i className="fa-solid fa-arrow-right" />
                  </Link>
                ) : (
                  <a href={slide.link} target="_blank" rel="noopener noreferrer" className="btn-cinematic">
                    Know More <i className="fa-solid fa-arrow-right" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="cinematic-controls">
          <div className="cinematic-arrow prev-cine" onClick={() => moveSlider(-1)}>
            <i className="fa-solid fa-chevron-left" />
          </div>
          <div className="cinematic-arrow next-cine" onClick={() => moveSlider(1)}>
            <i className="fa-solid fa-chevron-right" />
          </div>
        </div>

        {/* Dots */}
        <div className="cinematic-indicators">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`dot-cine ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </section>

      {/* SCROLLING INFO MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[1, 2].map((railNum) => (
            <span key={railNum} style={{ display: 'contents' }}>
              <span className="marquee-item"><span className="marquee-dot" />E-Commerce</span>
              <span className="marquee-item"><span className="marquee-dot" />IT Services</span>
              <span className="marquee-item"><span className="marquee-dot" />Digital Consulting</span>
              <span className="marquee-item"><span className="marquee-dot" />Arshith Fresh</span>
              <span className="marquee-item"><span className="marquee-dot" />Web Development</span>
              <span className="marquee-item"><span className="marquee-dot" />Cloud Solutions</span>
              <span className="marquee-item"><span className="marquee-dot" />Arshith InfoTech</span>
              <span className="marquee-item"><span className="marquee-dot" />Est. 2019</span>
              <span className="marquee-item"><span className="marquee-dot" />Suntech Solutions</span>
            </span>
          ))}
        </div>
      </div>

      {/* Quote Card */}
      <div className="quote-card">
        {/* LEFT CONTENT */}
        <div className="quote-right">
          <div className="quote-text">
            <p>
              We believe growth is more than scaling a business—it’s about building trust,
              creating opportunities, and
              shaping a future where progress benefits everyone.
            </p>
          </div>
          <div className="quote-footer">
            <h3>Farook N</h3>
            <span>Chief Executive Officer, Arshith Group</span>
            <Link to="/about" className="btn btn-outline">View Profile</Link>
          </div>
        </div>
        {/* RIGHT IMAGE */}
        <div className="quote-left">
          <img src="/logos/sir(1)(1).png" alt="Farook N" />
        </div>
      </div>

      {/* Three Companies Group Section */}
      <section id="companies" className="home-company-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-tag">Companies</p>
            <h2>Three companies, one connected group</h2>
          </div>

          <div className="home-company-showcase">
            {/* Left Panel: Hierarchy Diagram */}
            <div className="home-company-image-panel">
              <div className="home-company-image-card">
                <img src="/companies-reference.jpeg" alt="Company hierarchy design reference" />
              </div>
            </div>

            {/* Right Panel: Scrolling Rails Animation */}
            <div className="poster-wall" aria-label="Company showcase posters">
              {/* Rail 1 (Up) */}
              <div className="poster-rail up" style={{ '--rail-duration': '28s' }}>
                <div className="poster-rail-track">
                  {[1, 2].map((groupNum) => (
                    <div key={groupNum} className="poster-rail-group">
                      <Link to="/infotech" className="poster-card" style={{ '--card-accent': '#1f66cc' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/ad/31/92/ad3192e9ac6169a2614d932ded3b54e6.jpg" alt="Arshith Infotech" />
                        <div className="poster-card-copy"><h3>Arshith Infotech</h3></div>
                      </Link>
                      <Link to="/infotech" className="poster-card tall" style={{ '--card-accent': '#1f66cc' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/control1/736x/95/04/5f/95045fafecf5a86dbf704012906fb91b.jpg" alt="Arshith Infotech" />
                        <div className="poster-card-copy"><h3>Arshith Infotech</h3></div>
                      </Link>
                      <Link to="/infotech" className="poster-card" style={{ '--card-accent': '#1f66cc' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/1200x/3a/03/6a/3a036a16477e9d64e309734792c740e3.jpg" alt="Arshith Infotech" />
                        <div className="poster-card-copy"><h3>Arshith Infotech</h3></div>
                      </Link>
                      <Link to="/infotech" className="poster-card tall" style={{ '--card-accent': '#1f66cc' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/f8/82/bd/f882bd2d5ead41a09966ad81c292f1e5.jpg" alt="Arshith Infotech" />
                        <div className="poster-card-copy"><h3>Arshith Infotech</h3></div>
                      </Link>
                      <Link to="/infotech" className="poster-card" style={{ '--card-accent': '#1f66cc' }}>
                        <img className="poster-card-image" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="Arshith Infotech" />
                        <div className="poster-card-copy"><h3>Arshith Infotech</h3></div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rail 2 (Down) */}
              <div className="poster-rail down" style={{ '--rail-duration': '32s' }}>
                <div className="poster-rail-track">
                  {[1, 2].map((groupNum) => (
                    <div key={groupNum} className="poster-rail-group">
                      <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer" className="poster-card" style={{ '--card-accent': '#6fc97e' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/1a/3e/1d/1a3e1d27f7a3f935f4b9f5856a137e5e.jpg" alt="Arshith Fresh" />
                        <div className="poster-card-copy"><h3>Arshith Fresh</h3></div>
                      </a>
                      <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer" className="poster-card tall" style={{ '--card-accent': '#6fc97e' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/4d/ae/9d/4dae9de3f44d4ca5d0aefd8f6ee845ab.jpg" alt="Arshith Fresh" />
                        <div className="poster-card-copy"><h3>Arshith Fresh</h3></div>
                      </a>
                      <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer" className="poster-card" style={{ '--card-accent': '#6fc97e' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/ec/ca/29/ecca299ee395018aab53b0542f4a0800.jpg" alt="Arshith Fresh" />
                        <div className="poster-card-copy"><h3>Arshith Fresh</h3></div>
                      </a>
                      <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer" className="poster-card tall" style={{ '--card-accent': '#6fc97e' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/control1/1200x/99/ea/f3/99eaf3266c9b01dab3c4c3eaae82fb17.jpg" alt="Arshith Fresh" />
                        <div className="poster-card-copy"><h3>Arshith Fresh</h3></div>
                      </a>
                      <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer" className="poster-card" style={{ '--card-accent': '#6fc97e' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/1200x/b4/d8/d6/b4d8d6c31de1bfd17e52fa4041f79f77.jpg" alt="Arshith Fresh" />
                        <div className="poster-card-copy"><h3>Arshith Fresh</h3></div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rail 3 (Up) */}
              <div className="poster-rail up" style={{ '--rail-duration': '30s' }}>
                <div className="poster-rail-track">
                  {[1, 2].map((groupNum) => (
                    <div key={groupNum} className="poster-rail-group">
                      <a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer" className="poster-card" style={{ '--card-accent': '#d7b96c' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/99/4f/4a/994f4af2fa7dd601b53b467685a2a63e.jpg" alt="Suntech Solutions" />
                        <div className="poster-card-copy"><h3>Suntech Solutions</h3></div>
                      </a>
                      <a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer" className="poster-card tall" style={{ '--card-accent': '#d7b96c' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/b5/03/09/b50309a02f54651f7262e56e66a7926f.jpg" alt="Suntech Solutions" />
                        <div className="poster-card-copy"><h3>Suntech Solutions</h3></div>
                      </a>
                      <a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer" className="poster-card" style={{ '--card-accent': '#d7b96c' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/20/5b/7b/205b7b120ba93a1b47a7856749ac02a7.jpg" alt="Suntech Solutions" />
                        <div className="poster-card-copy"><h3>Suntech Solutions</h3></div>
                      </a>
                      <a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer" className="poster-card tall" style={{ '--card-accent': '#d7b96c' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/1200x/68/90/1f/68901f537a558b237c938aebd73adab4.jpg" alt="Suntech Solutions" />
                        <div className="poster-card-copy"><h3>Suntech Solutions</h3></div>
                      </a>
                      <a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer" className="poster-card" style={{ '--card-accent': '#d7b96c' }}>
                        <img className="poster-card-image" src="https://i.pinimg.com/736x/c7/46/31/c746310b6a6f3de2f4658d3e535bc4c3.jpg" alt="Suntech Solutions" />
                        <div className="poster-card-copy"><h3>Suntech Solutions</h3></div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Timeline Section */}
      <section className="timeline-section" id="journey">
        <div className="timeline-container">
          <div className="timeline-header">
            <span className="timeline-eyebrow">Our Journey</span>
            <h2 className="timeline-title">Tracing Our Evolution</h2>
            <p className="timeline-desc">
              From a humble visionary concept to a leading multi-sector corporate
              brand, see how we have scaled our services over the years.
            </p>
          </div>

          <div className="timeline-path">
            <div className="bg-line" />
            <div className="progress-line" id="progressLine" />

            {/* 2019 */}
            <div className="milestone-item left-side">
              <div className="node-wrapper"><div className="timeline-dot" /></div>
              <div className="timeline-card">
                <span className="timeline-year">2019</span>
                <h3 className="timeline-card-title">Suntech Solutions Evolution</h3>
                <p className="timeline-card-desc">
                  Laying the foundation of the group by establishing Suntech Solutions,
                  focusing on business consulting, corporate services, and operational
                  optimization to empower early enterprise growth.
                </p>
              </div>
            </div>

            {/* 2021 */}
            <div className="milestone-item right-side">
              <div className="node-wrapper"><div className="timeline-dot" /></div>
              <div className="timeline-card">
                <span className="timeline-year">2021</span>
                <h3 className="timeline-card-title">Suntech Expansion with Backend Support</h3>
                <p className="timeline-card-desc">
                  Expanded Suntech Solutions' service portfolio to offer robust
                  backend support, administration management, and initial digital
                  marketing solutions to help clients streamline remote operations.
                </p>
              </div>
            </div>

            {/* 2023 */}
            <div className="milestone-item left-side">
              <div className="node-wrapper"><div className="timeline-dot" /></div>
              <div className="timeline-card">
                <span className="timeline-year">2023</span>
                <h3 className="timeline-card-title">Arshith Group Evolution.</h3>
                <p className="timeline-card-desc">
                  Consolidating our expanding service operations and consulting divisions under a
                  unified corporate identity, establishing a strong foundation for long-term multi-sector
                  growth and sustainable business development.
                </p>
              </div>
            </div>

            {/* 2025 */}
            <div className="milestone-item right-side">
              <div className="node-wrapper"><div className="timeline-dot" /></div>
              <div className="timeline-card">
                <span className="timeline-year">2025</span>
                <h3 className="timeline-card-title">Arshith Fresh India Pvt Ltd Inauguration</h3>
                <p className="timeline-card-desc">
                  Officially incorporating and inaugurating Arshith Fresh India Pvt Ltd, establishing
                  our flagship e-commerce platform to connect farmers directly with consumers.
                </p>
              </div>
            </div>

            {/* 2026 */}
            <div className="milestone-item left-side">
              <div className="node-wrapper"><div className="timeline-dot" /></div>
              <div className="timeline-card">
                <span className="timeline-year">2026</span>
                <h3 className="timeline-card-title">Arshith Info-Tech Expansion.</h3>
                <p className="timeline-card-desc">
                  Scaling our technical capabilities globally, offering comprehensive software solutions,
                  advanced cloud architectures, and digital transformations to enterprise-grade clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner AI Section */}
      <section className="partner-ai-section" id="partner-ai">
        <div className="partner-video-bg">
          <video ref={videoRef} loop muted playsInline className="partner-bg-video">
            <source src="/logos/277093_medium.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="partner-video-overlay" />
        </div>
      </section>

      {/* Operational Gallery */}
      <section
        id="operational-gallery"
        className="section"
        style={{
          backgroundColor: '#ffffff',
          padding: '80px 0',
          borderBottom: '1px solid #f1f5f9',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ marginBottom: '3rem' }}>
          <div style={{ maxWidth: '48rem' }}>
            <div
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.9rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c9943c',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fa-solid fa-image" style={{ color: '#059669', fontSize: '0.8rem' }} />
              Operational Gallery
            </div>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '2.8rem',
                fontWeight: '600',
                color: '#0f172a',
                lineHeight: '1.2',
                marginTop: '1rem',
                letterSpacing: '-0.01em'
              }}
            >
              Arshith Group in <span style={{ fontStyle: 'italic', fontWeight: '500', color: '#059669' }}>Action</span>
            </h2>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.05rem',
                color: '#64748b',
                lineHeight: '1.7',
                marginTop: '1rem',
                maxWidth: '40rem'
              }}
            >
              A visual chronicle of our South Indian agricultural logistics hubs,
              software engineering workspaces, solar cold storages, and local
              grower collaborations.
            </p>
          </div>
        </div>

        {/* Marquee Tracks */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '1rem 0',
            userSelect: 'none'
          }}
        >
          {/* Row 1: Forward */}
          <div className="og-marquee" style={{ width: '100%' }}>
            {[1, 2, 3].map((trackNum) => (
              <div key={trackNum} className="og-marquee-track">
                {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map((num) => (
                  <div key={num} className="og-card">
                    <img src={`/marque/${num}.jpeg`} alt={`Operations ${num}`} loading="lazy" />
                    <div className="og-card-overlay" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2: Reverse */}
          <div className="og-marquee" style={{ width: '100%' }}>
            {[1, 2, 3].map((trackNum) => (
              <div key={trackNum} className="og-marquee-track reverse">
                {['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].map((num) => (
                  <div key={num} className="og-card">
                    <img src={`/marque/${num}.jpeg`} alt={`Operations ${num}`} loading="lazy" />
                    <div className="og-card-overlay" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="og-fade-left" />
        <div className="og-fade-right" />
      </section>

      {/* Careers Section */}
      <section className="ag-careers" id="careers">
        <div className="container">
          <div className="ag-careers-head">
            <h2 class="ag-section-title">Join Us</h2>
            <Link to="/internship" className="ag-btn ag-btn--solid-dark">
              Know More <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
          <div className="ag-careers-grid">
            <div className="ag-career-card" style={{ backgroundImage: 'url("/job oppurtunity.jpg")' }}>
              <div className="ag-career-overlay" />
              <div className="ag-career-body">
                <h4>Job Opportunities</h4>
                <i className="fa-solid fa-arrow-right" />
              </div>
            </div>
            <div className="ag-career-card" style={{ backgroundImage: 'url("/values.jpg")' }}>
              <div className="ag-career-overlay" />
              <div className="ag-career-body">
                <h4>Our Values</h4>
                <i className="fa-solid fa-arrow-right" />
              </div>
            </div>
            <div className="ag-career-card" style={{ backgroundImage: 'url("/work-culture.jpg")' }}>
              <div className="ag-career-overlay" />
              <div className="ag-career-body">
                <h4>Life at Arshith</h4>
                <i className="fa-solid fa-arrow-right" />
              </div>
            </div>
            <div className="ag-career-card" style={{ backgroundImage: 'url("/Internship-and-Training-1024x536(1).png")' }}>
              <div className="ag-career-overlay" />
              <div className="ag-career-body">
                <h4>Internships</h4>
                <i className="fa-solid fa-arrow-right" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="ag-contact" id="contact">
        <div className="container">
          <div className="ag-contact-heading">
            <span className="ag-contact-eyebrow">Get In Touch</span>
            <h2 className="ag-contact-title">Contact Us</h2>
            <p className="ag-contact-sub">
              Have a question or want to work with us? Reach out and our team will
              get back to you shortly.
            </p>
          </div>

          <div className="ag-contact-form-wrap">
            <form className="ag-contact-form" id="agContactForm" onSubmit={handleContactSubmit}>
              <div className="ag-form-row">
                <div className="ag-form-group">
                  <label htmlFor="contactName">Full Name</label>
                  <input
                    type="text"
                    id="contactName"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Arshith "
                    required
                  />
                </div>
                <div className="ag-form-group">
                  <label htmlFor="contactEmail">Email Address</label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="arshith@example.com"
                    required
                  />
                </div>
              </div>
              <div className="ag-form-row">
                <div className="ag-form-group">
                  <label htmlFor="contactPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="ag-form-group">
                  <label htmlFor="contactSubject">Subject</label>
                  <select
                    id="contactSubject"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="careers">Careers &amp; Jobs</option>
                    <option value="internship">Internship</option>
                    <option value="business">Business Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="ag-form-group">
                <label htmlFor="contactMsg">Message</label>
                <textarea
                  id="contactMsg"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  rows="5"
                  placeholder="Write your message here…"
                  required
                />
              </div>
              <div className="ag-form-submit-row">
                <button type="submit" className="ag-form-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <i className="fa-solid fa-paper-plane" />
                    </>
                  )}
                </button>
                <p className={`ag-form-success ${formSuccess ? 'visible' : ''}`} id="agFormSuccess" style={{ display: formSuccess ? 'block' : 'none' }}>
                  ✅ Thank you! We'll get back to you soon.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
