import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name, e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  return (
    <header className={`ag-header ${isScrolled ? 'ag-header--scrolled' : ''}`} id="agHeader">
      <nav className="ag-nav container">
        <Link to="/" className="ag-logo">
          <img src="/logos/LOGO-removebg-preview.png" alt="Arshith Logo" className="ag-logo-img" />
        </Link>
        <ul className={`ag-nav-links ${isMobileOpen ? 'ag-nav-open' : ''}`} id="agNavLinks">
          <li className="ag-nav-item">
            <Link to="/about">About Us</Link>
          </li>
          <li className={`ag-nav-item ag-has-drop ${activeDropdown === 'businesses' ? 'ag-drop-open' : ''}`}>
            <a href="#" onClick={(e) => toggleDropdown('businesses', e)}>
              Businesses <i className="fa-solid fa-chevron-down ag-caret"></i>
            </a>
            <div className="ag-dropdown">
              <Link to="/infotech">IT Services &amp; IT Consulting</Link>
              <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">E-Commerce</a>
              <a href="https://seller.arshithfresh.com/" target="_blank" rel="noopener noreferrer">Multi sellers</a>
              <a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer">Business Consulting &amp; Services</a>
              <a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer">Digital Marketing</a>
            </div>
          </li>
          <li className={`ag-nav-item ag-has-drop ${activeDropdown === 'news' ? 'ag-drop-open' : ''}`}>
            <a href="#" onClick={(e) => toggleDropdown('news', e)}>
              News <i className="fa-solid fa-chevron-down ag-caret"></i>
            </a>
            <div className="ag-dropdown">
              <Link to="/latest-news">Latest News</Link>
            </div>
          </li>
          <li className={`ag-nav-item ag-has-drop ${activeDropdown === 'careers' ? 'ag-drop-open' : ''}`}>
            <a href="#" onClick={(e) => toggleDropdown('careers', e)}>
              Careers <i className="fa-solid fa-chevron-down ag-caret"></i>
            </a>
            <div className="ag-dropdown">
              <Link to="/internship">Internship</Link>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeuJ0Gypsx9tuPK9jHDwNQchAXFtykeKWD7NPBb_VxilLdYwA/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer">Technical Confirmation</a>
              <a href="https://quizzory.in/id/69f06408b86cdfe2ea25b728" target="_blank" rel="noopener noreferrer">Online Assessment</a>
            </div>
          </li>
          <li className="ag-nav-item">
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
        <div className="ag-nav-right">
          <button 
            className={`ag-hamburger ${isMobileOpen ? 'ag-ham-open' : ''}`} 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
