import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function InfoTechFooter() {
  const [showBackTop, setShowBackTop] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Back to top scroll handler
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    // Cookie consent timer
    if (!localStorage.getItem('cookieConsent')) {
      const timer = setTimeout(() => setShowCookieBanner(true), 1800);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timer);
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCookieConsent = (status) => {
    localStorage.setItem('cookieConsent', status);
    setShowCookieBanner(false);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-newsletter">
          <div className="container">
            <div className="newsletter-content">
              <div className="newsletter-text">
                <h3>Stay Ahead in Tech</h3>
                <p>Get the latest insights on AI, Cloud, and Digital Transformation delivered to your inbox.</p>
              </div>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your business email" required />
                <button type="submit" className="btn btn-primary">Subscribe <i className="fas fa-arrow-right"></i></button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/infotech" className="logo footer-logo">
                Arshith&nbsp;<span className="logo-tech">Info-Tech</span><span className="logo-dot">.</span>
              </Link>
              <p className="footer-about">Pioneering the future of digital services and consulting. We empower forward-thinking enterprises across 40+ countries to reimagine their business for the digital age.</p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Twitter" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" aria-label="YouTube" class="social-icon"><i class="fab fa-youtube"></i></a>
                <a href="#" aria-label="Instagram" class="social-icon"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Capabilities</h4>
              <ul>
                <li><a href="#services"><i className="fas fa-angle-right"></i> Cloud Migration</a></li>
                <li><a href="#services"><i class="fas fa-angle-right"></i> Applied AI &amp; Data</a></li>
                <li><a href="#services"><i class="fas fa-angle-right"></i> Cybersecurity</a></li>
                <li><a href="#services"><i class="fas fa-angle-right"></i> Digital Engineering</a></li>
                <li><a href="#services"><i class="fas fa-angle-right"></i> Enterprise Software</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Organization</h4>
              <ul>
                <li><Link to="/about-infotech"><i className="fas fa-angle-right"></i> About Us</Link></li>
                <li><a href="#careers"><i className="fas fa-angle-right"></i> Careers</a></li>
                <li><a href="#footer"><i className="fas fa-angle-right"></i> Investor Relations</a></li>
                <li><a href="#footer"><i className="fas fa-angle-right"></i> Global Newsroom</a></li>
                <li><a href="#footer"><i className="fas fa-angle-right"></i> Sustainability</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contact Us</h4>
              <ul className="footer-contact-minimal">
                <li><i className="fas fa-map-marker-alt"></i> Bengaluru, Karnataka, India - 560076</li>
                <li><i class="fas fa-phone-alt"></i> +91 8618471424</li>
                <li><i class="fas fa-envelope"></i> support@arshith-infotech.com</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-flex">
              <p>&copy; 2026 Arshith Info-Tech. All rights reserved.</p>
              <div className="legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Preferences</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <button 
        id="backToTop" 
        className={showBackTop ? 'visible' : ''} 
        onClick={scrollToTop} 
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      {/* Cookie Consent Banner */}
      <div 
        id="cookieBanner" 
        className={showCookieBanner ? 'visible' : ''} 
        role="alertdialog" 
        aria-label="Cookie consent"
      >
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <p>We use cookies to enhance your experience and analyze site performance. See our <a href="#">Privacy Policy</a>.</p>
        </div>
        <div className="cookie-actions">
          <button className="cookie-accept" id="cookieAccept" onClick={() => handleCookieConsent('accepted')}>Accept All</button>
          <button className="cookie-decline" id="cookieDecline" onClick={() => handleCookieConsent('declined')}>Decline</button>
        </div>
      </div>
    </>
  );
}

export default InfoTechFooter;
