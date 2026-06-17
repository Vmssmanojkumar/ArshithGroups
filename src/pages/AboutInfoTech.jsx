import { useState, useEffect } from 'react';
import { useStylesheet } from '../hooks/useStylesheet';
import InfoTechNavbar from '../components/InfoTechNavbar';
import InfoTechFooter from '../components/InfoTechFooter';

function AboutInfoTech() {
  // Load InfoTech stylesheets dynamically
  useStylesheet(['/css/style.css', '/footer-premium.css']);

  const [loading, setLoading] = useState(() => !sessionStorage.getItem('ag_preloader_shown'));
  const [preloaderHidden, setPreloaderHidden] = useState(() => !!sessionStorage.getItem('ag_preloader_shown'));

  // Preloader timeout
  useEffect(() => {
    if (sessionStorage.getItem('ag_preloader_shown')) {
      return;
    }
    const timer = setTimeout(() => {
      setPreloaderHidden(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('ag_preloader_shown', 'true');
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Stats Counters Observer
  useEffect(() => {
    if (loading) return;

    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    let observer;

    const startCounters = () => {
      counters.forEach((counter) => {
        counter.innerText = '0';
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;
          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startCounters();
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [loading]);

  // Scroll Reveals Observer
  useEffect(() => {
    if (loading) return;

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      if (observer) observer.disconnect();
    };
  }, [loading]);

  return (
    <>
      {/* Preloader */}
      {loading && (
        <div id="preloader" className={preloaderHidden ? 'hidden' : ''}>
          <div className="preloader-logo">
            Arshith&nbsp;<span className="logo-tech">Info-Tech</span><span class="logo-dot">.</span>
          </div>
          <div className="preloader-spinner" />
        </div>
      )}

      {/* Navbar */}
      <InfoTechNavbar />

      {/* Premium Hero Section */}
      <header className="about-hero">
        <div className="about-hero-overlay" />
        <div className="container text-center reveal-up">
          <h1 className="about-hero-title">
            Redefining the <br />
            <span className="text-primary">Digital Landscape</span>
          </h1>
          <p className="about-hero-subtitle">
            We are a collective of engineers, designers, and strategists driven by a singular purpose: to supercharge global progress through innovative technology.
          </p>
        </div>
      </header>

      {/* Global Footprint Stats */}
      <section className="stats about-stats">
        <div className="container reveal-up">
          <div className="stat-item">
            <h4><span className="counter" data-target="20">0</span>+</h4>
            <p>Global Professionals</p>
          </div>
          <div className="stat-item">
            <h4><span className="counter" data-target="500">0</span>+</h4>
            <p>Successful Projects</p>
          </div>
          <div className="stat-item">
            <h4 className="counter" data-target="8">0</h4>
            <p>Years of Innovation</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container">
          <div className="about-grid align-center">
            <div className="about-content reveal-left">
              <h4 className="section-badge">Our Purpose</h4>
              <h2 className="section-title">Built on Belief. Driven by Engineering.</h2>
              <p className="about-desc">
                At Info-tech, we believe that technology is the ultimate equalizer. Our mission is to democratize advanced capabilities — from AI to Cloud to Quantum Computing — for enterprises of all sizes.
              </p>
              <p className="about-desc">
                We don't just act as vendors; we act as transformation partners. By deeply understanding your business context, we engineer solutions that not only solve today's problems but anticipate tomorrow's challenges.
              </p>
              <div className="mission-vision-cards mt-4">
                <div className="mv-card">
                  <i className="fas fa-eye text-primary" />
                  <h4>Our Vision</h4>
                  <p>To be the world's most trusted partner in navigating the digital age.</p>
                </div>
                <div className="mv-card">
                  <i className="fas fa-bullseye text-primary" />
                  <h4>Our Mission</h4>
                  <p>To deliver scalable, secure, and innovative engineering solutions that drive measurable growth.</p>
                </div>
              </div>
            </div>
            <div className="about-image reveal-right">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Team collaborating"
                className="rounded-image shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart (Core Values) */}
      <section className="section-padding bg-alt">
        <div className="container">
          <div className="text-center reveal-up">
            <h4 className="section-badge">Our DNA</h4>
            <h2 className="section-title">What Sets Us Apart</h2>
            <p className="section-subtitle">The principles that guide our culture, our code, and our client relationships.</p>
          </div>

          <div className="why-grid mt-5">
            <div className="why-card reveal-up delay-100">
              <div className="why-icon"><i className="fas fa-handshake" /></div>
              <h3>Client-Centricity</h3>
              <p>We treat your business as our own. Our success metrics are tied directly to your business outcomes, ensuring complete alignment from day one.</p>
            </div>
            <div className="why-card reveal-up delay-200">
              <div className="why-icon"><i className="fas fa-lightbulb" /></div>
              <h3>Relentless Innovation</h3>
              <p>We invest heavily in our R&D labs, constantly exploring emerging tech like Generative AI to ensure our clients always have a competitive edge.</p>
            </div>
            <div className="why-card reveal-up delay-300">
              <div className="why-icon"><i className="fas fa-shield-check" /></div>
              <h3>Security First</h3>
              <p>In a world of increasing cyber threats, we embed zero-trust security protocols into the foundation of every digital product we engineer.</p>
            </div>
            <div className="why-card reveal-up delay-400">
              <div className="why-icon"><i className="fas fa-globe-americas" /></div>
              <h3>Global Diversity</h3>
              <p>Innovation thrives on diverse perspectives. Our global workforce spans dozens of cultures, bringing rich, varied problem-solving approaches to the table.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey (Timeline) */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center reveal-up">
            <h4 className="section-badge">Our Journey</h4>
            <h2 className="section-title">A Legacy of Innovation</h2>
            <p className="section-subtitle">Tracing our path from a small engineering startup to a global IT powerhouse.</p>
          </div>

          <div className="timeline mt-5">
            <div className="timeline-item reveal-left">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3>2018</h3>
                <h4>The Beginning</h4>
                <p>Info-tech was founded in a small garage with a team of 5 visionary engineers focused on providing basic networking solutions to local businesses.</p>
              </div>
            </div>
            <div className="timeline-item reveal-right delay-100">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3>2021</h3>
                <h4>Global Expansion</h4>
                <p>Opened our first international offices in London and New York, pivoting to enterprise software development and early cloud architectures.</p>
              </div>
            </div>
            <div className="timeline-item reveal-left delay-200">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3>2023</h3>
                <h4>The Cloud Era</h4>
                <p>Launched our dedicated Cloud Engineering practice, becoming a premier partner for major providers and helping Fortune 500s migrate securely.</p>
              </div>
            </div>
            <div className="timeline-item reveal-right delay-300">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3>2025</h3>
                <h4>AI & Beyond</h4>
                <p>Established the InfoAI™ Innovation Lab, integrating generative AI into our core service offerings to drive unprecedented efficiency for our clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-alt">
        <div className="container">
          <div className="text-center reveal-up">
            <h4 className="section-badge">Leadership</h4>
            <h2 className="section-title">Meet Our Executive Team</h2>
            <p className="section-subtitle">Guided by industry veterans who are passionate about technology and human potential.</p>
          </div>

          <div className="team-grid mt-5">
            <div className="team-card reveal-up delay-100">
              <div className="team-img" style={{ backgroundImage: 'url("/assets/images/ceo.png")' }} />
              <div className="team-info">
                <h3>Farook N</h3>
                <p className="team-role">Chief Executive Officer</p>
                <div className="team-social">
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
            </div>
            <div className="team-card reveal-up delay-200">
              <div className="team-img" style={{ backgroundImage: 'url("/assets/images/md.png")' }} />
              <div className="team-info">
                <h3>Pallavi N</h3>
                <p className="team-role">Managing Director</p>
                <div className="team-social">
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="section-padding">
        <div className="container text-center reveal-up">
          <h2 className="section-title">Awards & Recognition</h2>
          <p className="section-subtitle">Excellence validated by global industry leaders.</p>

          <div className="awards-grid mt-4">
            <div className="award-item">
              <i className="fas fa-trophy" />
              <h4>Top IT Service Provider 2025</h4>
              <p>Global Tech Review</p>
            </div>
            <div className="award-item">
              <i className="fas fa-medal" />
              <h4>Best Cloud Migration Partner</h4>
              <p>Cloud Excellence Awards</p>
            </div>
            <div className="award-item">
              <i className="fas fa-award" />
              <h4>Leader in Generative AI Solutions</h4>
              <p>Gartner Magic Quadrant 2026</p>
            </div>
            <div className="award-item">
              <i className="fas fa-star" />
              <h4>Top 100 Places to Work</h4>
              <p>Fortune Magazine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container text-center reveal-up">
          <h2>Ready to Transform Your Business?</h2>
          <p>Join hundreds of global enterprises that trust Info-tech to drive their digital future.</p>
          <a href="/infotech#contact" className="btn cta-btn mt-4" style={{ fontSize: '1.1rem', padding: '15px 35px' }}>
            Start Your Journey Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <InfoTechFooter />
    </>
  );
}

export default AboutInfoTech;
