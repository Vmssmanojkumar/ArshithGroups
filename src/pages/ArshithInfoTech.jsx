import { useState, useEffect } from 'react';
import { useStylesheet } from '../hooks/useStylesheet';
import Footer from '../components/Footer';

function ArshithInfoTech() {
  // Load ArshithInfoTech page specific styles
  useStylesheet(['/css/arshithinfotech.css', '/footer-premium.css']);

  const [menuActive, setMenuActive] = useState(false);

  // Scroll to Top helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuActive(false);
  };

  return (
    <div className="arshith-it-body">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
            <img src="/logos/main_logo.png" alt="Arshith Fresh Logo" style={{ height: '50px' }} />
          </div>
          <div className={`nav-links ${menuActive ? 'active' : ''}`}>
            <ul className="nav-list">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
              <li><a href="#internship" onClick={(e) => { e.preventDefault(); scrollToSection('internship'); }}>Internship</a></li>
              <li><a href="#collaboration" onClick={(e) => { e.preventDefault(); scrollToSection('collaboration'); }}>Collaboration</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            </ul>
          </div>
          <div className="hamburger" onClick={() => setMenuActive(!menuActive)}>
            <i className={`fas ${menuActive ? 'fa-times' : 'fa-bars'}`} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <video autoPlay muted loop playsInline className="bg-video">
            <source src="/logos/mp_.mp4" type="video/mp4" />
          </video>
          <div style={{ fontWeight: 'bold', fontSize: 'clamp(32px, 5vw, 50px)', lineHeight: '1.2', marginBottom: '20px' }}>
            Empowering Businesses with Smart Digital Solutions
          </div>
          <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', maxWidth: '800px', margin: '0 auto 30px' }}>
            We provide innovative software solutions, IT services, and digital strategies to help businesses grow in the modern world.
            From development to deployment, we ensure quality, performance, and reliability. Your success is our mission.
          </p>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="btn btn-primary">Get Started</a>
        </div>
      </header>

      {/* Our Services (Short Overview) */}
      <section id="services-overview" className="section light-bg">
        <div className="container text-center">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">
            We deliver a wide range of services designed to meet business and technology needs efficiently.
          </p>

          <div className="service-list-simple">
            <div className="service-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')" }}>
              <h3>Software Development</h3>
            </div>

            <div className="service-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555949963-aa79dcee981c')" }}>
              <h3>IT &amp; Non-IT Services</h3>
            </div>

            <div className="service-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')" }}>
              <h3>Digital Marketing</h3>
            </div>

            <div className="service-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692')" }}>
              <h3>Backend Support</h3>
            </div>

            <div className="service-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')" }}>
              <h3>E-Commerce Solutions</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services (Card Section) */}
      <section id="services" className="section section1">
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>Our Expertise</h2>

          <div className="services-column">
            {/* CARD 1 */}
            <div className="service-card">
              <div className="card-text">
                <div className="icon"><i className="fas fa-code" /></div>
                <h3>Software Development</h3>
                <p>We design and develop high-quality applications including web, mobile, and enterprise solutions.</p>
              </div>
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="Software Development" />
              </div>
            </div>

            {/* CARD 2 */}
            <div className="service-card">
              <div className="card-text">
                <div className="icon"><i className="fas fa-users-cog" /></div>
                <h3>IT &amp; Non-IT Services</h3>
                <p>We provide staffing, support, and consulting services across industries.</p>
              </div>
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="IT Services" />
              </div>
            </div>

            {/* CARD 3 */}
            <div className="service-card">
              <div className="card-text">
                <div className="icon"><i className="fas fa-bullhorn" /></div>
                <h3>Digital Marketing</h3>
                <p>SEO, social media marketing, and branding strategies for business growth.</p>
              </div>
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1557838923-2985c318be48" alt="Digital Marketing" />
              </div>
            </div>

            {/* CARD 4 */}
            <div className="service-card">
              <div className="card-text">
                <div className="icon"><i className="fas fa-server" /></div>
                <h3>Backend Support</h3>
                <p>Strong backend systems, APIs, and database management services.</p>
              </div>
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31" alt="Backend Support" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section id="projects" class="projects-section">
        <div className="container">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">
            We have successfully developed modern and responsive websites tailored to different business needs.
            Our projects focus on performance, user experience, and clean design.
          </p>

          <div className="projects-grid">
            <div className="project-card">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Business Website" />
              <div className="project-content">
                <h3>Business Website</h3>
                <p>Modern corporate website with responsive UI.</p>
              </div>
            </div>

            <div className="project-card">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="E-Commerce Platform" />
              <div className="project-content">
                <h3>E-Commerce Platform</h3>
                <p>Online store with cart and payment system.</p>
              </div>
            </div>

            <div className="project-card">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31" alt="Dashboard System" />
              <div className="project-content">
                <h3>Dashboard System</h3>
                <p>Admin dashboard with analytics and control panel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="section">
        <div className="container about-container">
          <div className="about-content">
            <h2 className="section-title" style={{ textAlign: 'left' }}>About Us</h2>
            <ul className="custom-list">
              <li><i className="fas fa-check-circle" /> Arshith Fresh India Pvt Ltd is a growing software and service-based company</li>
              <li><i className="fas fa-check-circle" /> We focus on delivering high-quality digital solutions</li>
              <li><i className="fas fa-check-circle" /> Our team is dedicated to innovation and excellence</li>
              <li><i className="fas fa-check-circle" /> We support businesses with end-to-end services</li>
              <li><i className="fas fa-check-circle" /> Customer satisfaction is our top priority</li>
            </ul>
          </div>
          <div className="about-image">
            <div className="placeholder-graphic" />
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section id="internship" className="section light-bg">
        <div className="container text-center">
          <h2 className="section-title">Internship Opportunities</h2>
          <p className="section-subtitle">
            We provide internship programs for students and fresh graduates to gain real-time industry experience.
            Interns will work on live projects, learn modern technologies, and improve their technical and professional skills.
          </p>
          <div className="highlights">
            <div className="highlight-item">
              <i className="fas fa-laptop-code" />
              <h4>Real-time project exposure</h4>
            </div>
            <div className="highlight-item">
              <i className="fas fa-user-tie" />
              <h4>Guidance from experienced mentors</h4>
            </div>
            <div className="highlight-item">
              <i className="fas fa-certificate" />
              <h4>Certificate after completion</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaboration" className="section">
        <div className="container text-center">
          <h2 className="section-title">Our Collaborations</h2>
          <p className="section-subtitle">We collaborate with leading companies and organizations to deliver quality services and innovative solutions.</p>

          <div className="logo-slider">
            <div className="logo-track">
              <div className="collab-logo">Company A</div>
              <div className="collab-logo">Company B</div>
              <div className="collab-logo">Company C</div>
              <div className="collab-logo">Company D</div>
              <div className="collab-logo">Company E</div>
              {/* Duplicate for infinite scroll */}
              <div className="collab-logo">Company A</div>
              <div className="collab-logo">Company B</div>
              <div className="collab-logo">Company C</div>
              <div className="collab-logo">Company D</div>
              <div className="collab-logo">Company E</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section light-bg">
        <div className="container text-center">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-building" />
              <h4>Address</h4>
              <p>Arshith Fresh India Pvt Ltd<br />Andhra Pradesh, India</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone-alt" />
              <h4>Phone</h4>
              <p>+91 8618471424</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope" />
              <h4>Email</h4>
              <p>info@arshithgroup.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

export default ArshithInfoTech;
