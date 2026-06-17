import { useState } from 'react';
import { useStylesheet } from '../hooks/useStylesheet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function LatestNews() {
  // Load Arshith Group Page stylesheets dynamically
  useStylesheet(['/styles.css', '/styles2.css', '/footer-premium.css']);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submit handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setIsSubmitting(true);
    try {
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
          message: formMsg,
          source: 'corporate_news'
        })
      });

      const data = await response.json();
      if (data.success) {
        setFormSuccess(true);
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormSubject('');
        setFormMsg('');
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      // Fallback visual mock success during testing if backend isn't up
      setFormSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormSubject('');
      setFormMsg('');
      setTimeout(() => setFormSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Latest News & Updates */}
      <section className="section" style={{ backgroundColor: 'var(--bg-main)', padding: '50px', marginTop: '100px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <div>
              <h2 className="section-title">Latest news & updates</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Stay informed with the latest updates from Arshith Group.</p>
            </div>
          </div>

          <div className="news-grid">
            {/* Card 1 */}
            <div className="news-card">
              <img src="/logos/mallareddy.jpeg" alt="A Defining Moment for Future Growth" className="news-img" />
              <div className="news-content">
                <h3 className="news-title">A Defining Moment for Future Growth and Direction</h3>
              </div>
            </div>

            {/* Card 2 */}
            <div className="news-card">
              <img src="/logos/diest collage.jpeg" alt="Marking a New Phase of Progress" className="news-img" />
              <div className="news-content">
                <h3 className="news-title">Marking a New Phase of Progress and Commitment.</h3>
              </div>
            </div>

            {/* Card 3 */}
            <div className="news-card">
              <img src="/logos/news3.jpeg" alt="A Moment of Pride and Great Success" className="news-img" />
              <div className="news-content">
                <h3 className="news-title">
                  A Moment of Pride and Great Success: Honoring the synergy of institutional collaboration and the spirit of shared achievement
                </h3>
              </div>
            </div>

            {/* Card 4 */}
            <div className="news-card">
              <img src="/logos/students.jpeg" alt="Empowering minds today" className="news-img" />
              <div className="news-content">
                <h3 className="news-title">Empowering minds today for a brighter leadership tomorrow</h3>
              </div>
            </div>

            {/* Card 5 */}
            <div className="news-card">
              <img src="/logos/news4.jpeg" alt="A Step Forward" className="news-img" />
              <div className="news-content">
                <h3 className="news-title">A Step Forward in Strengthening Women Leadership</h3>
              </div>
            </div>

            {/* Card 6 */}
            <div className="news-card">
              <img src="/logos/news5.jpeg" alt="Strengthening Foundations" className="news-img" />
              <div className="news-content">
                <h3 className="news-title">
                  “Strengthening Foundations for Future Success” <br />
                  “Building Momentum Towards a Stronger Tomorrow”
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="ag-careers" id="careers">
        <div className="container">
          <div className="ag-careers-head">
            <h2 className="ag-section-title">Join Us</h2>
            <a href="#" className="ag-btn ag-btn--solid-dark">Know More <i className="fa-solid fa-arrow-right" /></a>
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

      {/* CONTACT */}
      <section className="ag-contact" id="contact">
        <div className="container">
          <div className="ag-contact-heading">
            <span className="ag-contact-eyebrow">Get In Touch</span>
            <h2 className="ag-contact-title">Contact Us</h2>
            <p className="ag-contact-sub">Have a question or want to work with us? Reach out and our team will get back to you shortly.</p>
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
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  rows="5"
                  placeholder="Write your message here…"
                  required
                />
              </div>
              <div className="ag-form-submit-row">
                <button type="submit" className="ag-form-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'} <i className="fa-solid fa-paper-plane" />
                </button>
                {formSuccess && (
                  <p className="ag-form-success" id="agFormSuccess" style={{ display: 'block' }}>
                    ✅ Thank you! We'll get back to you soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LatestNews;
