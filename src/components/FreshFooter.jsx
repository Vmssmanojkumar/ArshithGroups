import { useEffect, useState } from 'react';

function FreshFooter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="fresh-footer">
      {/* Top Silhouette Image */}
      <div className="fresh-footer-top">
        <img src="/assets/images/footertop.webp" alt="Arshith Fresh Silhouette" className="fresh-footer-silhouette" />
      </div>

      <div className="fresh-footer-main">
        <div className="fresh-footer-container">
          {/* Column 1: Brand Info */}
          <div className="fresh-footer-col brand-col">
            <div className="fresh-footer-logo-wrap">
              <img src="/assets/images/footerlogo.png" alt="Arshith Logo" className="fresh-footer-logo" />
            </div>
            <p className="fresh-footer-office">
              <strong>Corporate Office</strong> — Bengaluru, Karnataka, India - 560076
            </p>
            <div className="fresh-newsletter-section">
              <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
              <form onSubmit={handleSubscribe} className="fresh-newsletter-form">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </form>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="fresh-footer-col links-col">
            <h4>SERVICES +</h4>
            <ul>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">About Us</a></li>
              <li><a href="https://arshithfresh.com/pages/internship-details" target="_blank" rel="noopener noreferrer">Careers</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Shop All</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Blog</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Franchise</a></li>
              <li><a href="https://suntechorganization.com/" target="_blank" rel="noopener noreferrer">Suntech Solutions</a></li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="fresh-footer-col links-col">
            <h4>POLICIES +</h4>
            <ul>
              <li><a href="https://arshithfresh.com/pages/contact" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Shipping Info</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Returns &amp; Refunds</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Track Your Order</a></li>
              <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Help & Contact */}
          <div className="fresh-footer-col contact-col">
            <h4>NEED HELP?</h4>
            <ul className="fresh-contact-list">
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>Bengaluru, Karnataka, India - 560076</span>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+918618471424">+91 8618471424</a>
              </li>
              <li>
                <i className="fa-regular fa-envelope"></i>
                <a href="mailto:support@arshithfresh.com">support@arshithfresh.com</a>
              </li>
            </ul>
            <div className="fresh-social-links">
              <a href="https://www.linkedin.com/in/farook-n-2bb2b5344/" target="_blank" rel="noopener noreferrer" className="social-circle">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer" className="social-circle">
                <i className="fa-solid fa-globe"></i>
              </a>
              <a href="https://www.linkedin.com/in/pallavi-n-4578033ab/" target="_blank" rel="noopener noreferrer" className="social-circle">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://www.linkedin.com/company/arshith-fresh-india-pvt-ltd/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-circle">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com/@arshithfresh?si=ZjvzneHlriAxv322" target="_blank" rel="noopener noreferrer" className="social-circle">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="fresh-footer-bottom">
          <div className="fresh-footer-bottom-container">
            <p>&copy; 2025 Arshith Fresh India Pvt.Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918618471424"
        target="_blank"
        rel="noopener noreferrer"
        className="fresh-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </footer>
  );
}

export default FreshFooter;
