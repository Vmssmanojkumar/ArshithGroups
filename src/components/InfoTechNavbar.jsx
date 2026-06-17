import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function InfoTechNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLinkClick = (hash) => {
    setIsOpen(false);
    if (location.pathname === '/infotech' && hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getHref = (hash) => {
    return location.pathname === '/infotech' ? hash : `/infotech${hash}`;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container">
          <Link to="/infotech" className="logo">
            Arshith&nbsp;<span className="logo-tech">Info-Tech</span><span className="logo-dot">.</span>
          </Link>
          <ul className={`nav-links ${isOpen ? 'nav-open' : ''}`}>
            <div className="drawer-brand">
              Arshith&nbsp;<span className="logo-tech">Info-Tech</span><span className="logo-dot">.</span>
            </div>
            <button className="drawer-close" aria-label="Close menu" onClick={() => setIsOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
            <li>
              <a href={getHref('#services')} onClick={() => handleLinkClick('#services')}>Services</a>
            </li>
            <li>
              <a href={getHref('#industries')} onClick={() => handleLinkClick('#industries')}>Industries</a>
            </li>
            <li>
              <a href={getHref('#insights')} onClick={() => handleLinkClick('#insights')}>Insights</a>
            </li>
            <li>
              <a href={getHref('#careers')} onClick={() => handleLinkClick('#careers')}>Careers</a>
            </li>
            <li>
              <Link to="/about-infotech">About Us</Link>
            </li>
            {/* Added a Link back to Arshith Group Main Site */}
            <li>
              <Link to="/" style={{ color: 'var(--primary)' }}>Arshith Group</Link>
            </li>
          </ul>
          <a href={getHref('#contact')} className="btn btn-primary nav-cta" onClick={() => handleLinkClick('#contact')}>
            Contact Us
          </a>
          <div className="menu-toggle" onClick={() => setIsOpen(true)}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {isOpen && <div id="menuOverlay" style={{ display: 'block', opacity: 1 }} onClick={() => setIsOpen(false)}></div>}
    </>
  );
}

export default InfoTechNavbar;
