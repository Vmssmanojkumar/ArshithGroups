import { useEffect } from 'react';
import { useStylesheet } from '../hooks/useStylesheet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutCeo() {
  // Load Arshith Group Page stylesheets dynamically
  useStylesheet(['/styles.css', '/styles2.css', '/footer-premium.css', '/css/aboutceo.css']);

  useEffect(() => {
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
          if (entry.isIntersecting) {
            startCounters();
          }
        });
      },
      { threshold: 0.1 }
    );

    const statsSection = document.querySelector('.ag-stats-wrap');
    if (statsSection) observer.observe(statsSection);

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          className="ag-page-hero"
          style={{
            background: 'url("/logos/aboutbg.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color: 'white'
          }}
        >
          <div className="container ag-page-hero-inner">
            <h1 className="ag-visible">About Arshith Group</h1>
            <p className="ag-visible" style={{ animationDelay: '0.1s', color: 'white' }}>
              Arshith Group is built on three main pillars: ArshithInfotech, ArshithFresh, and SuntechSolutions.
              We deliver soft solutions and drive businesses to grow, scale, and succeed in the digital world.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="ag-section ag-story" id="story">
          <div className="container">
            <div className="ag-grid-50-50">
              <div className="ag-story-content">
                <span className="ag-eyebrow">Our Journey</span>
                <h2 className="ag-section-title">The Arshith <span>Story</span></h2>
                <p>
                  <b>Arshith Group</b> is a dynamic and growing ecosystem built on
                  trust, innovation, and a vision for sustainable growth. At its
                  core, the organization is driven by three strong pillars —
                  <b>ArshithInfotech, ArshithFresh, and SuntechSolutions</b>
                  — each contributing uniquely to our mission of delivering
                  excellence across industries. We specialize in providing smart
                  digital solutions that empower businesses to grow, scale, and
                  succeed in today's competitive landscape. Through ArshithInfotech
                  and SuntechSolutions, we enable organizations with cutting-edge
                  technology, efficient systems, and forward-thinking strategies.
                </p>
                <p>
                  At the same time, through ArshithFresh, we remain deeply rooted
                  in our commitment to quality and authenticity by bringing purely
                  natural, farm-sourced products directly to customers. Every
                  product reflects our dedication to purity, care, and trust. Our
                  approach goes beyond business — we focus on building long-term
                  value by supporting local communities, encouraging responsible
                  entrepreneurship, and maintaining the highest standards in
                  everything we do. With a balance of tradition and innovation,
                  Arshith Group is steadily shaping a future where technology,
                  sustainability, and trust come together to create meaningful
                  impact.
                </p>
              </div>
              <div className="ag-story-img">
                <img src="/logos/arshithgroupabout.png" alt="The Arshith Story" />
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="ag-section ag-leadership" id="leadership">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="ag-eyebrow">Our Team</span>
              <h2 className="ag-section-title">Leadership</h2>
            </div>

            {/* Leader 1 */}
            <div className="ag-leader-card">
              <div className="ag-leader-img">
                <img src="/logos/sir(1)(1).png" alt="Farook Nurubasha" />
                <span className="leader-badge">
                  <i className="fa-solid fa-star" />
                  Est. 10 Yrs Software &amp; Scaling
                </span>
              </div>
              <div className="ag-leader-content">
                <h3>Farook N</h3>
                <h4>Chairman - Arshith Group</h4>
                <p>
                  As a proudly rooted Indian brand, we at Arshith Fresh are
                  dedicated to creating honest, healthy, and high-quality products
                  that nourish every home. Our journey is guided by deep respect
                  for tradition and a bold vision for modern India. We believe in
                  transparency, trust, and long-term relationships — not shortcuts.
                </p>
                <p>
                  Our focus is on delivering authentic value while empowering
                  local communities and enabling sustainable practices that
                  benefit everyone.
                </p>
              </div>
            </div>

            {/* Leader 2 */}
            <div className="ag-leader-card ag-leader-reverse">
              <div className="ag-leader-content">
                <h3>Pallavi N</h3>
                <h4>Managing Director - Arshith Group</h4>
                <p>
                  At Arshith Group, we're more than just a brand — we're a
                  heartfelt movement rooted in the soil of India, blooming with
                  purpose. Every product we craft carries a promise: purity
                  without compromise, wellness with every bite, and care in every
                  grain.
                </p>
                <p>
                  We don't believe in shortcuts — only in the long road of trust,
                  honesty, and enduring relationships. Our mission is to nourish
                  every Indian home, whether in a bustling metro or a remote
                  village, with food that's wholesome, transparent, and
                  thoughtfully made. This is our way of giving back.
                </p>
              </div>
              <div className="ag-leader-img">
                <img src="/logos/mamimagefinal.jpeg" alt="Pallavi" />
                <span className="leader-badge">
                  <i className="fa-solid fa-star" />
                  Est. 10 Yrs Operational Systems
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="ag-section ag-stats-wrap">
          <div className="container">
            <div className="ag-stats-grid">
              <div className="ag-stat-item">
                <h3><span className="counter" data-target="7">0</span>+</h3>
                <p>Years of Experience</p>
              </div>
              <div className="ag-stat-item">
                <h3><span className="counter" data-target="10">0</span>+</h3>
                <p>Services &amp; Solutions</p>
              </div>
              <div className="ag-stat-item">
                <h3><span className="counter" data-target="100">0</span>+</h3>
                <p>Quality Products</p>
              </div>
              <div className="ag-stat-item">
                <h3><span className="counter" data-target="30">0</span>k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutCeo;
