import { useState } from 'react';
import { Link } from 'react-router-dom';

function FreshNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeRightDropdown, setActiveRightDropdown] = useState(null);

  const toggleDropdown = (name, e) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === name ? null : name);
    setActiveRightDropdown(null);
  };

  const toggleRightDropdown = (name, e) => {
    e.preventDefault();
    setActiveRightDropdown(activeRightDropdown === name ? null : name);
    setActiveDropdown(null);
  };

  return (
    <div className="fresh-nav-wrapper">
      {/* Announcement Bar */}
      <div className="fresh-announcement-bar">
        <span>🚚 Free shipping on all orders ₹1000 & above! | Limited time festive deal 🎉</span>
      </div>

      {/* Main Header */}
      <header className="fresh-header">
        <div className="fresh-container">
          {/* Mobile Hamburger (Only visible on mobile) */}
          <button 
            className={`fresh-hamburger ${isMobileOpen ? 'active' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Left Navigation Links */}
          <nav className={`fresh-nav-left ${isMobileOpen ? 'active' : ''}`}>
            <ul className="fresh-nav-list">
              <li>
                <Link to="/" className="fresh-nav-link">Home</Link>
              </li>
              <li className={`fresh-nav-dropdown-wrap ${activeDropdown === 'collections' ? 'open' : ''}`}>
                <a href="#" className="fresh-nav-link" onClick={(e) => toggleDropdown('collections', e)}>
                  Collections <i className="fa-solid fa-chevron-down fresh-caret"></i>
                </a>
                <ul className="fresh-dropdown-menu">
                  <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Groceries</a></li>
                  <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Spices &amp; Masalas</a></li>
                  <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">Honey &amp; Wellness</a></li>
                  <li><a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">All Products</a></li>
                </ul>
              </li>
              <li>
                <a href="https://seller.arshithfresh.com/" target="_blank" rel="noopener noreferrer" className="fresh-nav-link">
                  Become a Seller
                </a>
              </li>
              <li className={`fresh-nav-dropdown-wrap ${activeDropdown === 'careers' ? 'open' : ''}`}>
                <a href="#" className="fresh-nav-link" onClick={(e) => toggleDropdown('careers', e)}>
                  Careers <i className="fa-solid fa-chevron-down fresh-caret"></i>
                </a>
                <ul className="fresh-dropdown-menu">
                  <li><Link to="/internship">Internship</Link></li>
                  <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSeuJ0Gypsx9tuPK9jHDwNQchAXFtykeKWD7NPBb_VxilLdYwA/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer">Technical Confirmation</a></li>
                  <li><a href="https://quizzory.in/id/69f06408b86cdfe2ea25b728" target="_blank" rel="noopener noreferrer">Online Assessment</a></li>
                </ul>
              </li>
            </ul>
          </nav>

          {/* Centered Logo */}
          <div className="fresh-logo-container">
            <a href="https://arshithfresh.com/" target="_blank" rel="noopener noreferrer">
              <img src="/logos/arshithtm-removebg-preview.png" alt="ARSHiTH Logo" className="fresh-logo" />
            </a>
          </div>

          {/* Right Icons */}
          <div className="fresh-icons-right">
            <div className="fresh-right-dropdown-wrap">
              <a href="#" className="fresh-icon-btn" aria-label="Search" onClick={(e) => toggleRightDropdown('search', e)}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
              {activeRightDropdown === 'search' && (
                <div className="fresh-right-dropdown-menu">
                  <div className="fresh-search-box">
                    <input type="text" placeholder="Search products..." autoFocus />
                    <button><i className="fa-solid fa-search"></i></button>
                  </div>
                </div>
              )}
            </div>

            <div className="fresh-right-dropdown-wrap">
              <a href="#" className="fresh-icon-btn" aria-label="Account" onClick={(e) => toggleRightDropdown('account', e)}>
                <i className="fa-regular fa-user"></i>
              </a>
              {activeRightDropdown === 'account' && (
                <div className="fresh-right-dropdown-menu account-menu">
                  <p>Welcome to Arshith Fresh!</p>
                  <a href="#" className="fresh-btn-sm">Sign In</a>
                  <a href="#" className="fresh-link-sm">Create an Account</a>
                </div>
              )}
            </div>

            <div className="fresh-right-dropdown-wrap">
              <a href="#" className="fresh-icon-btn" aria-label="Cart" onClick={(e) => toggleRightDropdown('cart', e)}>
                <i className="fa-solid fa-bag-shopping"></i>
              </a>
              {activeRightDropdown === 'cart' && (
                <div className="fresh-right-dropdown-menu cart-menu">
                  <p>Your cart is currently empty.</p>
                  <a href="#" className="fresh-btn-sm outline">Start Shopping</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default FreshNavbar;
