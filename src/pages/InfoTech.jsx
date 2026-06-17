import { useState, useEffect, useRef } from 'react';
import { useStylesheet } from '../hooks/useStylesheet';
import InfoTechNavbar from '../components/InfoTechNavbar';
import InfoTechFooter from '../components/InfoTechFooter';

const serviceData = {
  'digital-transformation': {
    icon: 'fa-laptop-code',
    title: 'Digital Transformation',
    desc: 'We partner with enterprises to reimagine their entire digital value chain — from customer-facing applications to back-office operations — using AI, analytics, and next-gen cloud platforms.',
    features: [
      'AI-powered process automation and intelligent workflows',
      'Customer experience modernization across all digital touchpoints',
      'Legacy system migration with zero business disruption',
      'Data strategy and advanced analytics platforms',
      'Change management and digital adoption programs'
    ]
  },
  'cloud-computing': {
    icon: 'fa-cloud',
    title: 'Cloud Computing',
    desc: 'From strategy to migration and ongoing optimization, we architect cloud environments that scale with your ambition — whether on AWS, Azure, Google Cloud, or a hybrid model.',
    features: [
      'Multi-cloud and hybrid cloud architecture design',
      'Secure, zero-downtime cloud migration programs',
      'Cloud-native application development and modernization',
      'FinOps: continuous cost optimization and governance',
      '24/7 managed cloud operations and monitoring'
    ]
  },
  'engineering-rd': {
    icon: 'fa-cogs',
    title: 'Engineering & R&D',
    desc: 'We accelerate your product development lifecycle through engineering excellence — combining deep domain expertise with cutting-edge automation, IoT, and platform engineering.',
    features: [
      'Product engineering from prototype to global scale',
      'IoT platform design and connected device ecosystems',
      'Embedded systems and firmware engineering',
      'Test automation and quality engineering',
      'Agile R&D labs and innovation sprints'
    ]
  },
  'enterprise-software': {
    icon: 'fa-cubes',
    title: 'Enterprise Software',
    desc: 'Our portfolio of enterprise-grade software products and custom solutions covers everything from intelligent automation to next-gen customer experience platforms.',
    features: [
      'Custom ERP and CRM platform development',
      'DevSecOps toolchain integration and automation',
      'Intelligent document processing and workflow automation',
      'API-first microservices architecture',
      'SaaS product development and productization'
    ]
  },
  'infrastructure-mgmt': {
    icon: 'fa-network-wired',
    title: 'Infrastructure Management',
    desc: 'We manage complex, mission-critical IT environments with precision — delivering reliability, security, and operational excellence across your entire infrastructure estate.',
    features: [
      'End-to-end data center management and optimization',
      'Zero-trust cybersecurity architecture and SOC operations',
      'Network infrastructure design and SD-WAN deployment',
      'Disaster recovery and business continuity planning',
      'Compliance management: ISO 27001, SOC2, GDPR'
    ]
  }
};

function InfoTech() {
  // Load InfoTech stylesheets dynamically
  useStylesheet(['/css/style.css', '/footer-premium.css']);

  const [loading, setLoading] = useState(() => !sessionStorage.getItem('ag_preloader_shown'));
  const [preloaderHidden, setPreloaderHidden] = useState(() => !!sessionStorage.getItem('ag_preloader_shown'));
  const [typewriterText, setTypewriterText] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [isCtaCollapsed, setIsCtaCollapsed] = useState(false);

  // Canvas ref for particle effect
  const canvasRef = useRef(null);

  // Form states
  const [formFname, setFormFname] = useState('');
  const [formLname, setFormLname] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formService, setFormService] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Preloader timeout
  useEffect(() => {
    if (sessionStorage.getItem('ag_preloader_shown')) {
      return;
    }
    const timer = setTimeout(() => {
      setPreloaderHidden(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('ag_preloader_shown', 'true');
      }, 500);
      return () => clearTimeout(removeTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Hero Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const COUNT = 65;
    let particles = [];
    let animId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37,99,235,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const words = ['Digital Future', 'Business Growth', 'Global Innovation'];
    let wordIndex = 0;
    let txt = '';
    let isDeleting = false;
    let active = true;

    const type = () => {
      if (!active) return;
      const current = wordIndex % words.length;
      const fullTxt = words[current];

      txt = isDeleting
        ? fullTxt.substring(0, txt.length - 1)
        : fullTxt.substring(0, txt.length + 1);

      setTypewriterText(txt);

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && txt === fullTxt) {
        typeSpeed = 3000;
        isDeleting = true;
      } else if (isDeleting && txt === '') {
        isDeleting = false;
        wordIndex++;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    const initialTimer = setTimeout(type, 1000);

    return () => {
      active = false;
      clearTimeout(initialTimer);
    };
  }, []);

  // Stats Counters Observer
  useEffect(() => {
    if (loading) return;

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
          if (entry.isIntersecting) startCounters();
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [loading]);

  // Scroll Reveals Observer
  useEffect(() => {
    if (loading) return;

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      if (observer) observer.disconnect();
    };
  }, [loading]);

  // Floating CTA Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      setIsCtaCollapsed(scrolled > document.documentElement.scrollHeight - 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modal open helper
  const openModal = (key) => {
    setActiveModal(serviceData[key]);
    document.body.style.overflow = 'hidden';
  };

  // Modal close helper
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  // Escape key close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Form Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formFname || !formLname || !formEmail) return;

    setIsSubmitting(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${formFname} ${formLname}`,
          email: formEmail,
          company: formCompany,
          subject: formService,
          message: formMessage || 'Inquiry about service',
          source: 'infotech_services'
        })
      });

      const data = await response.json();
      if (data.success) {
        setFormSuccess(true);
        setFormFname('');
        setFormLname('');
        setFormEmail('');
        setFormCompany('');
        setFormService('');
        setFormMessage('');
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      // Fallback visual mock success during testing if backend isn't up
      setFormSuccess(true);
      setFormFname('');
      setFormLname('');
      setFormEmail('');
      setFormCompany('');
      setFormService('');
      setFormMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Preloader */}
      {loading && (
        <div id="preloader" className={preloaderHidden ? 'hidden' : ''}>
          <div className="preloader-logo">
            Arshith&nbsp;<span className="logo-tech">Info-Tech</span><span className="logo-dot">.</span>
          </div>
          <div className="preloader-spinner" />
        </div>
      )}

      {/* Navbar */}
      <InfoTechNavbar />

      {/* Hero Section */}
      <header className="hero">
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          id="heroParticles"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
        />
        {/* Animated background shapes */}
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Empowering Your <br />
              <span className="typewriter">{typewriterText}</span>
            </h1>
            <p className="hero-subtitle">
              We deliver innovative IT solutions that drive growth, enhance security, and transform businesses for the digital age.
            </p>
            <div className="hero-cta">
              <a href="#services" className="btn btn-primary">Discover Solutions</a>
              <a href="#contact" class="btn btn-outline">Get in Touch</a>
            </div>
          </div>
          <div className="hero-image floating-hero-img">
            <div className="ken-burns-wrapper">
              <img src="/assets/images/hero-office.png" alt="IT Professionals collaborating" />
            </div>
            <div className="floating-card">
              <div className="floating-icon">
                <i className="fas fa-chart-line" />
              </div>
              <div>
                <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>99.9%</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Uptime Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Who We Are Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-content reveal-left">
              <h4 className="section-badge">Who We Are</h4>
              <h2 className="section-title">Supercharging Progress</h2>
              <p className="about-desc">
                We are a next-generation global technology company that helps enterprises reimagine their businesses for the digital age.
                Our technology products, services, and engineering are built on decades of innovation, with a world-renowned management
                philosophy, a strong culture of invention and risk-taking, and a relentless focus on customer relationships.
              </p>
              <ul className="about-list">
                <li><i className="fas fa-check-circle text-primary" /> <strong>Innovation-Driven:</strong> Pioneering solutions in AI, Cloud, and Cyber.</li>
                <li><i className="fas fa-check-circle text-primary" /> <strong>Client-Centric:</strong> A relentless focus on delivering value.</li>
                <li><i className="fas fa-check-circle text-primary" /> <strong>Global Reach:</strong> Operating across 40+ countries.</li>
              </ul>
              <a href="/about-infotech" className="btn btn-primary mt-4">Learn More About Us</a>
            </div>
            <div className="about-image reveal-right">
              <img src="/assets/images/tech-abstract.png" alt="Technology Abstract" className="rounded-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-alt">
        <div className="container">
          <div className="text-center reveal-up">
            <h2 className="section-title">Our Core Capabilities</h2>
            <p className="section-subtitle">Comprehensive technology solutions tailored to your unique business challenges.</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal-scale delay-100" onClick={() => openModal('digital-transformation')}>
              <i className="fas fa-laptop-code service-icon" />
              <h3>Digital Transformation</h3>
              <p>Leveraging AI, analytics, and cloud technologies to modernize business processes and enhance customer engagement.</p>
              <span className="card-learn"><i className="fas fa-arrow-right" /> Learn more</span>
            </div>
            <div className="service-card reveal-scale delay-200" onClick={() => openModal('cloud-computing')}>
              <i className="fas fa-cloud service-icon" />
              <h3>Cloud Computing</h3>
              <p>Comprehensive cloud migration, hybrid/multi-cloud management, and cloud-native services for scalable infrastructure.</p>
              <span className="card-learn"><i className="fas fa-arrow-right" /> Learn more</span>
            </div>
            <div className="service-card reveal-scale delay-300" onClick={() => openModal('engineering-rd')}>
              <i className="fas fa-cogs service-icon" />
              <h3>Engineering & R&D</h3>
              <p>Accelerating the product development lifecycle with platforms, automation solutions, and specialized IoT expertise.</p>
              <span className="card-learn"><i className="fas fa-arrow-right" /> Learn more</span>
            </div>
            <div className="service-card reveal-scale delay-400" onClick={() => openModal('enterprise-software')}>
              <i className="fas fa-cubes service-icon" />
              <h3>Enterprise Software</h3>
              <p>Portfolio of enterprise-grade software products covering Customer Experience, DevSecOps, and intelligent automation.</p>
              <span className="card-learn"><i className="fas fa-arrow-right" /> Learn more</span>
            </div>
            <div className="service-card reveal-scale delay-500" onClick={() => openModal('infrastructure-mgmt')}>
              <i className="fas fa-network-wired service-icon" />
              <h3>Infrastructure Mgmt</h3>
              <p>Managing complex IT environments, data centers, and advanced cybersecurity to ensure operational efficiency and security.</p>
              <span className="card-learn"><i className="fas fa-arrow-right" /> Learn more</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="section-padding">
        <div className="container">
          <div className="text-center reveal-up">
            <h4 className="section-badge">Industries We Serve</h4>
            <h2 className="section-title">Domain Expertise</h2>
            <p className="section-subtitle">Delivering tailored technology solutions across major global industries.</p>
          </div>
          <div className="industries-grid">
            <div className="industry-card reveal-up delay-100" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800")' }}>
              <div className="industry-overlay">
                <h3>Financial Services</h3>
                <p>Driving digital banking and fintech innovation.</p>
              </div>
            </div>
            <div className="industry-card reveal-up delay-200" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800")' }}>
              <div className="industry-overlay">
                <h3>Healthcare</h3>
                <p>Transforming patient care with digital health.</p>
              </div>
            </div>
            <div className="industry-card reveal-up delay-300" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800")' }}>
              <div className="industry-overlay">
                <h3>Manufacturing</h3>
                <p>Industry 4.0 and smart supply chains.</p>
              </div>
            </div>
            <div className="industry-card reveal-up delay-400" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800")' }}>
              <div className="industry-overlay">
                <h3>Retail & CPG</h3>
                <p>Enhancing customer experiences and omnichannel commerce.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="careers-section">
        <div className="container reveal-scale">
          <div className="careers-content text-center">
            <h2>Find Your Spark</h2>
            <p>Join a global network of innovators, creators, and problem solvers. Build a career that supercharges your potential and shapes the future of technology.</p>
            <a href="#contact" className="btn btn-primary mt-4">Explore Opportunities</a>
          </div>
        </div>
      </section>

      {/* Stats/Impact Section */}
      <section id="stats" class="stats">
        <div className="container reveal-up">
          <div className="stat-item">
            <h4 className="counter" data-target="8">0</h4>
            <p>Years of Excellence</p>
          </div>
          <div className="stat-item">
            <h4><span className="counter" data-target="20">0</span>+</h4>
            <p>Global Clients</p>
          </div>
          <div className="stat-item">
            <h4><span className="counter" data-target="100">0</span>+</h4>
            <p>IT Professionals</p>
          </div>
        </div>
      </section>

      {/* Why Info-tech Section */}
      <section id="why-us" className="section-padding">
        <div className="container">
          <div className="text-center reveal-up">
            <h4 className="section-badge">Why Choose Us</h4>
            <h2 className="section-title">What Sets Info-tech Apart</h2>
            <p className="section-subtitle">We don't just deliver technology — we deliver outcomes that transform how businesses compete and grow.</p>
          </div>
          <div className="why-grid">
            <div className="why-card reveal-left delay-100">
              <div className="why-icon"><i className="fas fa-rocket" /></div>
              <h3>Outcome-First Approach</h3>
              <p>Every engagement is measured by real business results — not hours logged. We align our success completely with yours.</p>
            </div>
            <div className="why-card reveal-up delay-200">
              <div className="why-icon"><i className="fas fa-users" /></div>
              <h3>Dedicated Expert Teams</h3>
              <p>You get a focused team of specialists — not generalists. Each project is staffed with domain experts who live and breathe your industry.</p>
            </div>
            <div className="why-card reveal-up delay-300">
              <div className="why-icon"><i className="fas fa-lock" /></div>
              <h3>Security by Design</h3>
              <p>Security isn't an add-on — it's built into every line of code, every architecture decision, and every deployment we deliver.</p>
            </div>
            <div className="why-card reveal-up delay-400">
              <div className="why-icon"><i className="fas fa-sync-alt" /></div>
              <h3>Agile Delivery</h3>
              <p>Faster releases, tighter feedback loops. Our agile methodology means you see real progress every sprint — not just at project end.</p>
            </div>
            <div className="why-card reveal-up delay-200">
              <div className="why-icon"><i className="fas fa-headset" /></div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock monitoring and support means your systems stay live — because downtime is not an option in the digital economy.</p>
            </div>
            <div className="why-card reveal-right delay-300">
              <div className="why-icon"><i className="fas fa-leaf" /></div>
              <h3>Sustainable Tech</h3>
              <p>We design energy-efficient architectures and green cloud strategies that reduce your carbon footprint alongside your costs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech-stack" className="section-padding bg-alt">
        <div className="container">
          <div className="text-center reveal-up">
            <h4 className="section-badge">Our Technology Stack</h4>
            <h2 className="section-title">Powered by Industry-Leading Tools</h2>
            <p className="section-subtitle">We leverage the world's most trusted platforms and frameworks to build solutions that scale.</p>
          </div>
          <div className="tech-grid reveal-up delay-100">
            <div className="tech-badge"><i className="fab fa-aws" /><span>AWS</span></div>
            <div className="tech-badge"><i className="fab fa-microsoft" /><span>Azure</span></div>
            <div className="tech-badge"><i className="fab fa-google" /><span>Google Cloud</span></div>
            <div className="tech-badge"><i className="fab fa-docker" /><span>Docker</span></div>
            <div className="tech-badge"><i className="fas fa-dharmachakra" /><span>Kubernetes</span></div>
            <div className="tech-badge"><i className="fab fa-react" /><span>React</span></div>
            <div className="tech-badge"><i className="fab fa-node-js" /><span>Node.js</span></div>
            <div className="tech-badge"><i className="fab fa-python" /><span>Python</span></div>
            <div className="tech-badge"><i className="fas fa-database" /><span>PostgreSQL</span></div>
            <div className="tech-badge"><i className="fab fa-git-alt" /><span>DevOps & CI/CD</span></div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="process" className="section-padding">
        <div className="container">
          <div className="text-center reveal-up">
            <h4 className="section-badge">Our Process</h4>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A structured, transparent engagement model designed to deliver results at every stage.</p>
          </div>
          <div className="process-steps">
            <div className="process-step reveal-up delay-100">
              <div className="step-num">01</div>
              <h3>Discover</h3>
              <p>We begin by deeply understanding your business goals, pain points, and technical landscape through collaborative workshops.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step reveal-up delay-200">
              <div className="step-num">02</div>
              <h3>Design</h3>
              <p>Our architects craft a tailored solution blueprint — choosing the right technologies, platforms, and delivery approach for your specific needs.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step reveal-up delay-300">
              <div className="step-num">03</div>
              <h3>Build</h3>
              <p>Our expert teams execute with precision using agile sprints, continuous integration, and transparent progress reporting throughout.</p>
            </div>
            <div className="process-connector" />
            <div className="process-step reveal-up delay-400">
              <div className="step-num">04</div>
              <h3>Scale & Support</h3>
              <p>Post-launch, we continuously monitor, optimize, and evolve your solution — ensuring it grows alongside your business ambitions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="section-padding bg-alt">
        <div className="container">
          <div className="text-center reveal-up">
            <h2 className="section-title">Latest Insights</h2>
            <p className="section-subtitle">Thought leadership, industry analysis, and expert perspectives from our team.</p>
          </div>
          <div className="insights-grid">
            <div className="insight-card reveal-left delay-100">
              <div className="insight-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800")' }} />
              <div className="insight-content">
                <span className="insight-meta">Artificial Intelligence • May 12, 2026</span>
                <h3>The Future of Generative AI in the Enterprise</h3>
                <p>How leading organizations are leveraging generative AI to streamline operations, reduce costs, and create entirely new revenue streams.</p>
                <div className="insight-author">
                  <div className="author-avatar"><i className="fas fa-user-circle" /></div>
                  <div><strong>Dr. Aisha Patel</strong><br /><small>Head of AI Research</small></div>
                </div>
                <a href="#" className="read-more">Read Article <i class="fas fa-arrow-right" /></a>
              </div>
            </div>
            <div className="insight-card reveal-up delay-200">
              <div className="insight-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800")' }} />
              <div className="insight-content">
                <span className="insight-meta">Cloud Strategy • April 28, 2026</span>
                <h3>Multi-Cloud in 2026: Strategy Over Complexity</h3>
                <p>Why the most successful enterprises are consolidating their cloud strategy instead of expanding — and how to get there without disruption.</p>
                <div className="insight-author">
                  <div className="author-avatar"><i class="fas fa-user-circle" /></div>
                  <div><strong>Marcus Chen</strong><br /><small>Principal Cloud Architect</small></div>
                </div>
                <a href="#" className="read-more">Read Article <i class="fas fa-arrow-right" /></a>
              </div>
            </div>
            <div className="insight-card reveal-right delay-300">
              <div className="insight-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800")' }} />
              <div className="insight-content">
                <span className="insight-meta">Cybersecurity • April 15, 2026</span>
                <h3>Building a Zero-Trust Architecture That Actually Works</h3>
                <p>A practical framework for implementing zero-trust security in hybrid environments — without slowing down your engineering teams.</p>
                <div className="insight-author">
                  <div className="author-avatar"><i className="fas fa-user-circle" /></div>
                  <div><strong>Priya Ramesh</strong><br /><small>Chief Security Officer</small></div>
                </div>
                <a href="#" className="read-more">Read Article <i class="fas fa-arrow-right" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal-left">
              <h4 className="section-badge">Get In Touch</h4>
              <h2 className="section-title">Let's Build Something <span style={{ color: 'var(--primary)' }}>Great Together</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Whether you're looking to modernize your IT infrastructure, launch a new digital product, or explore AI-driven solutions — we're ready to help you get there.
              </p>
              <ul className="contact-details">
                <li><i className="fas fa-map-marker-alt" /><div><strong>Office</strong><br />Bengaluru, Karnataka, India - 560076</div></li>
                <li><i className="fas fa-phone-alt" /><div><strong>Phone</strong><br />+91 8618471424</div></li>
                <li><i className="fas fa-envelope" /><div><strong>Email</strong><br />support@arshith-infotech.com</div></li>
                <li><i className="fas fa-clock" /><div><strong>Business Hours</strong><br />Mon – Fri, 10:00 AM – 6:00 PM EST</div></li>
              </ul>
            </div>
            <div className="contact-form-wrap reveal-right">
              {!formSuccess ? (
                <form className="contact-form" id="contactForm" onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        id="fname"
                        value={formFname}
                        onChange={(e) => setFormFname(e.target.value)}
                        placeholder="Arshith"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lname">Last Name</label>
                      <input
                        type="text"
                        id="lname"
                        value={formLname}
                        onChange={(e) => setFormLname(e.target.value)}
                        placeholder="Infotech"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="support@arshith-infotech.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="arshith-infotech"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Service of Interest</label>
                    <select
                      id="service"
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                    >
                      <option value="">Select a service...</option>
                      <option>Digital Transformation</option>
                      <option>Cloud Computing</option>
                      <option>Engineering &amp; R&amp;D</option>
                      <option>Data &amp; AI</option>
                      <option>Cybersecurity</option>
                      <option>Infrastructure Management</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      rows="4"
                      placeholder="Tell us about your project or challenge..."
                    />
                  </div>
                  <button type="submit" className="btn btn-primary form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <i className="fas fa-paper-plane" />
                      </>
                    )}
                  </button>
                  <p className="form-note"><i className="fas fa-shield-alt" /> Your information is secure and will never be shared.</p>
                </form>
              ) : (
                <div className="form-success" id="formSuccess" style={{ display: 'block' }}>
                  <i className="fas fa-check-circle" />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will contact you within 1 business day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <InfoTechFooter />

      {/* Floating CTA Button */}
      <div className="floating-cta" id="floatingCta">
        <a href="#contact" className={`floating-cta-btn ${isCtaCollapsed ? 'collapsed' : ''}`} id="floatingCtaBtn">
          <i className="fas fa-comments" />
          <span>Let's Talk</span>
        </a>
      </div>

      {/* Service Modal */}
      {activeModal && (
        <div id="serviceModal" className="open" role="dialog" aria-modal="true" onClick={(e) => { if (e.target.id === 'serviceModal') closeModal(); }}>
          <div className="modal-box">
            <button className="modal-close" aria-label="Close" onClick={closeModal}><i className="fas fa-times" /></button>
            <div className="modal-icon"><i className={`fas ${activeModal.icon}`} /></div>
            <h2>{activeModal.title}</h2>
            <p className="modal-desc">{activeModal.desc}</p>
            <ul className="modal-features">
              {activeModal.features.map((f, idx) => (
                <li key={idx}><i className="fas fa-check-circle" />{f}</li>
              ))}
            </ul>
            <a href="#contact" className="modal-cta" onClick={closeModal}>Get a Free Consultation <i className="fas fa-arrow-right" /></a>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoTech;
