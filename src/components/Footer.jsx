import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="ag-footer" id="footer">
      <div className="container ag-footer-inner">
        <div className="ag-footer-brand">
          <Link to="/">
            <img src="/logos/LOGO-removebg-preview.png" alt="Arshith Group Logo" className="ag-footer-logo-img" />
          </Link>
          <p>
            Arshith Group is committed to innovation, sustainability, and
            excellence across multiple industries including E-Commerce,
            Technology, and Digital Services. We empower communities and deliver
            trusted solutions.
          </p>
          <div className="ag-footer-social">
            <a href="https://www.linkedin.com/in/farook-n-2bb2b5344/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.linkedin.com/company/arshith-fresh-india-pvt-ltd/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.linkedin.com/in/pallavi-n-4578033ab/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.linkedin.com/company/suntech-it-solution/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/npallavi_arshith?igsh=MXVxeWViejE3eHJsdg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://youtube.com/@vamikadurbar?si=mvXxo3HM8Qe4liD9" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            <a href="https://youtube.com/@arshithfresh?si=ZjvzneHlriAxv322" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div className="ag-footer-cols">
          <div className="ag-footer-col">
            <h5>About Us</h5>
            <ul>
              <li><Link to="/about">About Arshith Group</Link></li>
              <li><Link to="/about">CEO Office</Link></li>
              <li><Link to="/about">Leadership</Link></li>
              <li><Link to="/about">Our Journey</Link></li>
              <li><Link to="/about">Awards</Link></li>
            </ul>
          </div>
          <div className="ag-footer-col">
            <h5>Businesses</h5>
            <ul>
              <li><Link to="/infotech">IT Services &amp; Consulting</Link></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">E-Commerce</a></li>
              <li><a href="https://seller.arshithfresh.com/" target="_blank" rel="noopener noreferrer">Multi sellers</a></li>
              <li><a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer">Software Development</a></li>
            </ul>
          </div>
          <div className="ag-footer-col">
            <h5>Connect</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/latest-news">News</Link></li>
              <li><Link to="/infotech">Business</Link></li>
              <li><Link to="/internship">Careers</Link></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="ag-footer-col">
            <h5>Need Help?</h5>
            <ul style={{ gap: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <i className="fa-solid fa-location-dot" style={{ marginTop: '4px', color: 'transparent', WebkitTextStroke: '1.5px #555' }}></i>
                <span style={{ fontSize: '0.88rem', color: '#666' }}>Bengaluru, Karnataka, India - 560076</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-phone" style={{ color: 'transparent', WebkitTextStroke: '1.5px #555' }}></i>
                <span style={{ fontSize: '0.88rem', color: '#666' }}>+91 8618471424</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-regular fa-envelope" style={{ color: '#555' }}></i>
                <span style={{ fontSize: '0.88rem', color: '#666' }}>info@arshithgroup.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="footer_bg">
        <div className="footer_bg_one">
          <div className="car-logo">Let's start with Arshith<span>.</span></div>
        </div>
        <div className="footer_bg_two">
          <div className="cyclist-logo">Others</div>
        </div>
      </div>

      <div className="ag-footer-bottom">
        <div className="container ag-footer-bottom-inner">
          <p>&copy; 2026 Arshith Group. All rights reserved.</p>
          <div className="ag-footer-legal">
            <a href="#">Legal Disclaimer</a>
            <a href="#">Privacy Notice</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Cookie Policy</a>
          </div>
          {showBackTop && (
            <button className="ag-back-top" onClick={scrollToTop} aria-label="Back to top">
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
