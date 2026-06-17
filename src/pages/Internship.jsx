import { useState, useEffect } from 'react';
import { useStylesheet } from '../hooks/useStylesheet';
import FreshNavbar from '../components/FreshNavbar';
import FreshFooter from '../components/FreshFooter';

function Internship() {
  // Add Internship specific styles dynamically
  useStylesheet([
    '/styles.css',
    '/styles2.css',
    '/footer-premium.css',
    '/css/internship.css?v=3'
  ]);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submit handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      // Reset form
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormSubject('');
      setFormMsg('');
      // Hide success message after 5 seconds
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1200);
  };

  // Scroll Reveal Animation
  useEffect(() => {
    const reveals = document.querySelectorAll(
      '.section, .card, .product-card, .category-card, .news-card, .limited-card, .business-feature, .quote-card'
    );
    reveals.forEach((el) => el.classList.add('reveal'));

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll(); // trigger immediately

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('load', revealOnScroll);
    };
  }, []);

  return (
    <>
      <FreshNavbar />

      <div className="mncfix">
        {/* HERO */}
        <section className="mncfix-hero" style={{ marginTop: '0px' }}>
          <div className="container">
            <div className="mncfix-badge">
              <span className="dot"></span> Front-End Developer Internship Program
            </div>
            <h1>Industry-Ready Front-End Internship</h1>
            <p>This internship is designed to train you like an MNC front-end team member. You won’t just learn theory — you will build real interfaces, responsive layouts, and production-ready UI components that strengthen your portfolio.</p>
            <div className="special-side-button">
              {/* UNIQUE APPLY BUTTON */}
              <a href="https://arshithfresh.com/pages/internship-details" className="mncfix-apply-btn"> Apply Now → </a>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="section">
          <div className="container">
            <div className="head">
              <h2>Internship overview</h2>
              <p>A practical, mentor-guided program focused on real-world front-end development, not classroom-style learning.</p>
            </div>
            <div className="mncfix-grid">
              <div className="mncfix-card">
                <div className="mncfix-ico">01</div>
                <h3>Who can apply</h3>
                <p>Freshers, final-year students, career switchers, and self-taught developers who want strong front-end fundamentals and real project exposure.</p>
              </div>
              <div className="mncfix-card">
                <div className="mncfix-ico">02</div>
                <h3>How it works</h3>
                <p>Step-by-step learning with tasks, UI challenges, reviews, and guidance. You’ll build layouts, components, and complete pages just like in a real company.</p>
              </div>
              <div className="mncfix-card">
                <div className="mncfix-ico">03</div>
                <h3>Learning approach</h3>
                <p>Focus on hands-on practice, clean code, responsiveness, and professional UI standards used by MNC-level development teams.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU GAIN */}
        <section className="section">
          <div className="container">
            <div className="head">
              <h2>What you will gain</h2>
              <p>Skills, confidence, and portfolio strength that directly help in job interviews.</p>
            </div>
            <div className="mncfix-grid">
              <div className="mncfix-card">
                <div className="mncfix-ico">UI</div>
                <h3>Strong UI skills</h3>
                <p>Learn to build clean, modern, responsive interfaces using HTML, CSS, and JavaScript, following real industry patterns.</p>
              </div>
              <div className="mncfix-card">
                <div className="mncfix-ico">PR</div>
                <h3>Real projects</h3>
                <p>Work on real-world pages and components that you can confidently add to your resume and portfolio.</p>
              </div>
              <div className="mncfix-card">
                <div className="mncfix-ico">JR</div>
                <h3>Job readiness</h3>
                <p>Understand how front-end developers work in companies — structure, responsiveness, best practices, and problem-solving mindset.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="section">
          <div className="container">
            <div className="head">
              <h2>Internship benefits</h2>
              <p>More than learning — this internship helps you move closer to employment.</p>
            </div>
            <div className="mncfix-grid">
              <div className="mncfix-card">
                <div className="mncfix-ico">✔</div>
                <h3>Completion certificate</h3>
                <p>Receive an internship certificate that validates your practical experience and learning outcomes.</p>
              </div>
              <div className="mncfix-card">
                <div className="mncfix-ico">👨‍💻</div>
                <h3>Mentorship support</h3>
                <p>Get guidance, feedback, and corrections to improve your code quality and professional standards.</p>
              </div>
              <div className="mncfix-card">
                <div className="mncfix-ico">🚀</div>
                <h3>Career advantage</h3>
                <p>High-performing interns may get priority consideration for future opportunities or referrals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DURATION */}
        <section className="section">
          <div className="container">
            <div className="head">
              <h2>Internship duration</h2>
              <p>Choose the plan that fits your learning speed and goals. Please note that these internships are paid programs offered by our company and are designed to provide practical learning experience, real-time project exposure, and portfolio development.</p>
            </div>

            <div className="mncfix-grid">
              <div className="mncfix-card" style={{ alignSelf: 'center' }}>
                <div className="mncfix-ico">3 Months</div>
                <h3>Most Popular – Paid Program</h3>
                <p>In this program, students will work on multiple UI components, receive reviews, and build responsive pages while gaining deeper practical experience. This program focuses on real-time project experience and advanced practical learning.<br /></p>
                <strong>
                  Work on real-time projects<br />
                  Build multiple responsive pages<br />
                  Portfolio development<br />
                  Practical implementation and workflows<br />
                  <h3>Note:</h3>

                  No Placement Included <br />

                  <strong>
                    <h3>Registration Fee Only: ₹1,250</h3>
                  </strong>
                </strong>
              </div>

              <div className="mncfix-card">
                <div className="mncfix-ico">6 Months</div>
                <h3>Advanced – Paid Program </h3>
                <p>This program is designed for undergraduate students, including both Degree and B.Tech students, with a primary focus on 3rd Year B.Tech pursuing students.</p>
                <strong>
                  real-time project development<br />
                  Industry-standard advanced training<br />
                  High-level practical exposure<br />
                  Team collaboration &amp; workflow<br />
                  Portfolio + project deployment
                </strong>
                <br />
                <h3>Placement Opportunity:</h3>
                Only students who have successfully completed this 6-month internship program in our companies will be eligible to participate in future campus recruitment drives conducted by our organizations.<br />
                <strong>
                  <h3>Registration Fee Only: ₹1,999</h3>
                </strong>
                <a href="https://arshithfresh.com/pages/internship-details" className="mncfix-apply-btn"> Apply Now → </a>
              </div>
            </div>
          </div>
        </section>

        {/* UPDATED OPPORTUNITIES 
        <section className="section">
          <div className="container">
            <div className="head" style={{ textAlign: 'center' }}>
              <h2>Updated Opportunities</h2>
              <p>
                Candidates who successfully complete the 6-month internship will undergo dedicated training and become eligible for placement opportunities. They will be given top priority during walk-in drives conducted by Arshith Fresh.
              </p>
            </div>
          </div>
        </section>*/}

        {/* APPLY */}
        <section className="section" id="mncfix-apply">
          <div className="container">
            <div className="mncfix-apply">
              <h2>Apply now</h2>
              <p>Email: <strong>info@arshithgroup.com</strong></p>
              <p>Contact: <strong>+91 8618471424</strong></p>
              {/* UNIQUE APPLY BUTTON */}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSekZmxBgdicFxMfbA0qNori2sD8bKKtzEqGLQJJwDMdxeUvlA/viewform?usp=header" className="mncfix-apply-btn"> Apply for Internship → </a>
            </div>
          </div>
        </section>
      </div>

      {/* THE ARSHITH GROUP INTRO */}
      <div className="arshith-about">
        <section className="arshith-group-intro">
          <div className="arshith-container">
            <div className="arshith-group-container">
              <div className="arshith-group-image-container">
                <img src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/about-us-top_pic.png" alt="Arshith Fresh Team" className="arshith-group-image" />
              </div>
              <div className="arshith-group-content">
                <h1>The Arshith Group</h1>
                <p className="tagline">The Arshith Group is more than just a brand — it's a growing ecosystem rooted in trust, tradition, and forward-thinking. From nurturing purity in every product to enabling smart, scalable solutions, we are steadily shaping a new era of responsible entrepreneurship.</p>
                <a href="#about-section" className="arshith-about-button">About Us</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAROOK BANNER */}
      <div className="arshith-container">
        <img className="desktop-only" src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/farook_pic.svg?v=1751612320" alt="Farook Desktop View" style={{ width: '100%', height: 'auto' }} />
        <img className="mobile-only" src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/verti_farook.svg?v=1751613228" alt="Farook Mobile View" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* PALLAVI BANNER */}
      <div className="arshith-container" style={{ marginTop: '20px' }}>
        <img className="desktop-only" src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/pallavi_pic.svg?v=1751612319" alt="Pallavi Desktop View" style={{ width: '100%', height: 'auto' }} />
        <img className="mobile-only" src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/verti_pallavi.svg?v=1751613228" alt="Pallavi Mobile View" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* COMPANIES SECTION */}
      <section className="arshith-companies" id="about-section">
        <div className="arshith-container">
          <div className="arshith-companies-hero">
            <div className="arshith-companies-content">
              <h2>Arshith Fresh Group Companies</h2>
              <p className="arshith-companies-description">
                From food staples to natural wellness products, Arshith Fresh delivers more than just products — it delivers trust in every grain, care in every process, and honesty in every label. What started as a humble initiative has grown into a purpose-driven group.
              </p>
              <p className="arshith-companies-description">
                Arshith Fresh is not just serving customers — it's empowering farmers, homemakers, local producers, and conscious buyers. Every item tells a story of heritage and hard work, from fields to kitchens, and from village hands to urban homes.
              </p>
              <p className="arshith-companies-description">
                Our dynamic ecosystem company powering tech-driven growth with sustainable innovation and digital innovations for clean e-commerce, enabling smart, scalable solutions for the future.
              </p>
              <div className="arshith-companies-stats">
                <div className="arshith-stat-item">
                  <span className="arshith-stat-number">2025</span>
                  <span className="arshith-stat-label">Founded</span>
                </div>
                <div className="arshith-stat-item">
                  <span className="arshith-stat-number">100+</span>
                  <span className="arshith-stat-label">Products</span>
                </div>
                <div className="arshith-stat-item">
                  <span className="arshith-stat-number">10+</span>
                  <span className="arshith-stat-label">Categories</span>
                </div>
              </div>
            </div>
            <div className="arshith-companies-image">
              <img src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/office1.jpg" alt="Arshith Fresh Office" />
              <div className="arshith-decorative-pattern"></div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET OUR LEADERS */}
      <section className="arshith-leaders">
        <div className="arshith-container">
          <div className="arshith-leaders-intro">
            <h2>Meet Our Leaders</h2>
            <p>
              The visionary team driving Arshith Fresh towards a healthier, more sustainable future through innovation, integrity, and unwavering commitment to quality.
            </p>
          </div>
          <div className="arshith-leaders-grid">
            <div className="arshith-leader-card">
              <div className="arshith-leader-image-container">
                <img src="/ceo.png" alt="N.Farook" className="arshith-leader-avatar" />
              </div>
              <div className="arshith-leader-info">
                <h3 className="arshith-leader-name">N.Farook</h3>
                <p className="arshith-leader-role">Chairman & CEO, Arshith Group</p>
              </div>
            </div>
            <div className="arshith-leader-card">
              <div className="arshith-leader-image-container">
                <img src="/logos/mamfinal.jpeg" alt="Nelli Pallavi" className="arshith-leader-avatar" />
              </div>
              <div className="arshith-leader-info">
                <h3 className="arshith-leader-name">Nelli Pallavi</h3>
                <p className="arshith-leader-role">President & Managing Director, Arshith Group</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY STANDARDS */}
      <div className="standard-image-container">
        <img src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/quality_stand.jpg" alt="Quality Standards" />
      </div>

      {/* ETHICS AND COMPLIANCE */}
      <section className="arshith-ethics">
        <div className="arshith-container">
          <div className="arshith-ethics-content">
            <h2 className="arshith-section-title">Ethics & Compliance</h2>
            <p style={{ fontSize: '1.4rem', marginBottom: '30px', color: '#66bb6a' }}>Rooted in Values, Growing with Integrity</p>
            <p className="arshith-ethics-text">At Arshith Fresh, trust isn't just a word — it's the foundation of everything we do. Every product we deliver, every partnership we build, and every promise we make stems from an unwavering commitment to honesty, quality, and transparency.</p>
            <p className="arshith-ethics-text">We believe that true success comes not just from growth, but from growing the right way — with purity in purpose and integrity in action.</p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY AND CARE */}
      <div className="standard-image-container">
        <img src="https://cdn.shopify.com/s/files/1/0858/0772/6869/files/tech_and_care.jpg" alt="Technology & Care" />
      </div>

      {/* CALL TO ACTION */}
      <section className="arshith-cta">
        <div className="arshith-container">
          <h1 className="hero-heading">
            TOGETHER, WE GROW WITH HONESTY
          </h1>
          <p>Rooted in purity. Driven by purpose. Growing hand-in-hand — naturally.</p>
        </div>
      </section>

      <FreshFooter />
    </>
  );
}

export default Internship;

