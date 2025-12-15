import React, { useState } from 'react';

const HomePage = ({ onNavigateToLogin, onNavigateToSignup }) => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden'
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      padding: '16px 0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      zIndex: 1000,
      borderBottom: '1px solid #e5e7eb'
    },
    navContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '24px',
      fontWeight: '800',
      color: '#1a202c',
      cursor: 'pointer'
    },
    logoIcon: {
      fontSize: '32px'
    },
    navLinks: {
      display: 'flex',
      gap: '40px',
      alignItems: 'center'
    },
    navLink: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#4a5568',
      cursor: 'pointer',
      transition: 'color 0.3s',
      padding: '8px 0',
      borderBottom: '2px solid transparent',
      background: 'none',
      border: 'none'
    },
    navLinkActive: {
      color: '#667eea',
      borderBottom: '2px solid #667eea'
    },
    authButtons: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center'
    },
    loginBtn: {
      padding: '10px 24px',
      border: '2px solid #667eea',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      background: 'transparent',
      color: '#667eea',
      transition: 'all 0.3s'
    },
    signupBtn: {
      padding: '10px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      transition: 'all 0.3s'
    },
    heroSection: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '120px 40px 80px'
    },
    heroContent: {
      maxWidth: '1200px',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '64px',
      fontWeight: '900',
      color: '#1a202c',
      lineHeight: '1.2',
      marginBottom: '24px'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'block'
    },
    heroSubtitle: {
      fontSize: '22px',
      color: '#4a5568',
      lineHeight: '1.6',
      marginBottom: '48px',
      maxWidth: '800px',
      margin: '0 auto 48px'
    },
    heroButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    ctaBtn: {
      padding: '18px 40px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    ctaBtnPrimary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
    },
    ctaBtnSecondary: {
      background: 'white',
      color: '#667eea',
      border: '2px solid #667eea'
    },
    section: {
      padding: '100px 40px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '48px',
      fontWeight: '800',
      color: '#1a202c',
      marginBottom: '20px',
      textAlign: 'center'
    },
    sectionSubtitle: {
      fontSize: '20px',
      color: '#4a5568',
      textAlign: 'center',
      marginBottom: '60px',
      maxWidth: '700px',
      margin: '0 auto 60px'
    },
    aboutContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '60px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
    },
    aboutText: {
      fontSize: '18px',
      lineHeight: '1.8',
      color: '#4a5568',
      marginBottom: '24px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      marginTop: '60px'
    },
    featureCard: {
      background: 'white',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s',
      textAlign: 'center'
    },
    featureIcon: {
      fontSize: '56px',
      marginBottom: '20px'
    },
    featureTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '12px'
    },
    featureText: {
      color: '#4a5568',
      lineHeight: '1.6',
      fontSize: '16px'
    },
    contactSection: {
      background: '#f7fafc',
      padding: '100px 40px'
    },
    contactContent: {
      maxWidth: '600px',
      margin: '0 auto',
      background: 'white',
      padding: '60px',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
    },
    contactInfo: {
      marginBottom: '40px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
      fontSize: '18px',
      color: '#4a5568'
    },
    contactIcon: {
      fontSize: '28px'
    },
    footer: {
      background: '#1a202c',
      color: 'white',
      padding: '60px 40px 30px'
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      marginBottom: '40px'
    },
    footerSection: {
      color: 'white'
    },
    footerTitle: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '16px'
    },
    footerText: {
      color: '#a0aec0',
      lineHeight: '1.6'
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    footerListItem: {
      marginBottom: '10px'
    },
    footerLink: {
      color: '#a0aec0',
      textDecoration: 'none',
      transition: 'color 0.3s',
      cursor: 'pointer'
    },
    footerBottom: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: '30px',
      borderTop: '1px solid #2d3748',
      textAlign: 'center',
      color: '#a0aec0'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .nav-link:hover {
            color: #667eea !important;
          }
          
          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
          }
          
          .login-btn:hover {
            background: #667eea;
            color: white;
          }
          
          .signup-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.5);
          }
          
          .cta-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
          }
          
          .footer-link:hover {
            color: #667eea !important;
          }
          
          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }
            
            .hero-title {
              font-size: 36px !important;
            }
          }
        `}
      </style>

      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logo} onClick={() => scrollToSection('home')}>
            <span style={styles.logoIcon}>🚗</span>
            <span>NeuroFleet</span>
          </div>
          
          <div style={styles.navLinks} className="nav-links">
            <button 
              className="nav-link"
              style={{
                ...styles.navLink,
                ...(activeSection === 'home' ? styles.navLinkActive : {})
              }}
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
            <button 
              className="nav-link"
              style={{
                ...styles.navLink,
                ...(activeSection === 'about' ? styles.navLinkActive : {})
              }}
              onClick={() => scrollToSection('about')}
            >
              About Us
            </button>
            <button 
              className="nav-link"
              style={{
                ...styles.navLink,
                ...(activeSection === 'features' ? styles.navLinkActive : {})
              }}
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <button 
              className="nav-link"
              style={{
                ...styles.navLink,
                ...(activeSection === 'contact' ? styles.navLinkActive : {})
              }}
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </button>
          </div>

          <div style={styles.authButtons}>
            <button 
              className="login-btn"
              style={styles.loginBtn} 
              onClick={onNavigateToLogin}
            >
              Login
            </button>
            <button 
              className="signup-btn"
              style={styles.signupBtn} 
              onClick={onNavigateToSignup}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Smart Fleet Management
            <span style={styles.gradientText}>Made Simple</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Manage your entire fleet with AI-powered analytics, real-time tracking,
            and comprehensive driver management system.
          </p>
          <div style={styles.heroButtons}>
            <button 
              className="cta-btn"
              style={{...styles.ctaBtn, ...styles.ctaBtnPrimary}} 
              onClick={onNavigateToSignup}
            >
              Get Started Free
            </button>
            <button 
              className="cta-btn"
              style={{...styles.ctaBtn, ...styles.ctaBtnSecondary}}
            >
              Watch Demo 🎥
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={styles.section}>
        <h2 style={styles.sectionTitle}>About NeuroFleet</h2>
        <p style={styles.sectionSubtitle}>
          Leading the future of intelligent fleet management
        </p>
        <div style={styles.aboutContent}>
          <p style={styles.aboutText}>
            NeuroFleet is a cutting-edge fleet management platform designed to streamline your vehicle operations. 
            Founded in 2024, we've been helping businesses of all sizes optimize their fleet performance through 
            innovative technology and data-driven insights.
          </p>
          <p style={styles.aboutText}>
            Our mission is to make fleet management simple, efficient, and accessible. We leverage AI and IoT 
            technology to provide real-time tracking, predictive maintenance, and comprehensive analytics that 
            help you make informed decisions.
          </p>
          <p style={styles.aboutText}>
            With NeuroFleet, you get more than just a tracking system – you get a complete fleet management 
            solution that grows with your business and adapts to your unique needs.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{...styles.section, background: '#f7fafc'}}>
        <h2 style={styles.sectionTitle}>Our Features</h2>
        <p style={styles.sectionSubtitle}>
          Everything you need to manage your fleet effectively
        </p>
        <div style={styles.featuresGrid}>
          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🚙</div>
            <h3 style={styles.featureTitle}>Real-Time Tracking</h3>
            <p style={styles.featureText}>
              Track your vehicles in real-time with GPS integration and get instant location updates.
            </p>
          </div>
          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Analytics Dashboard</h3>
            <p style={styles.featureText}>
              Get detailed insights with our powerful analytics and customizable reports.
            </p>
          </div>
          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🔔</div>
            <h3 style={styles.featureTitle}>Smart Alerts</h3>
            <p style={styles.featureText}>
              Receive instant notifications for maintenance, violations, and important updates.
            </p>
          </div>
          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>👥</div>
            <h3 style={styles.featureTitle}>Driver Management</h3>
            <p style={styles.featureText}>
              Monitor driver behavior and manage schedules efficiently with our tools.
            </p>
          </div>
          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>💰</div>
            <h3 style={styles.featureTitle}>Cost Optimization</h3>
            <p style={styles.featureText}>
              Reduce operational costs with intelligent route planning and fuel management.
            </p>
          </div>
          <div className="feature-card" style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>Secure & Reliable</h3>
            <p style={styles.featureText}>
              Enterprise-grade security with 99.9% uptime guarantee for peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.contactSection}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>
        <p style={styles.sectionSubtitle}>
          Get in touch with our team
        </p>
        <div style={styles.contactContent}>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📧</span>
              <span>support@neurofleet.com</span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📞</span>
              <span>+91 1800-123-4567</span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📍</span>
              <span>Vijayawada, Andhra Pradesh, India</span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>🕐</span>
              <span>Mon-Fri: 9:00 AM - 6:00 PM IST</span>
            </div>
          </div>
          <button 
            style={{...styles.ctaBtn, ...styles.ctaBtnPrimary, width: '100%'}}
            onClick={onNavigateToSignup}
          >
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>NeuroFleet</h4>
            <p style={styles.footerText}>Smart fleet management for modern businesses</p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink} onClick={() => scrollToSection('home')}>Home</a>
              </li>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink} onClick={() => scrollToSection('about')}>About Us</a>
              </li>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink} onClick={() => scrollToSection('features')}>Features</a>
              </li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Support</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink} onClick={() => scrollToSection('contact')}>Contact</a>
              </li>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink}>Help Center</a>
              </li>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink}>FAQ</a>
              </li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Legal</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink}>Privacy Policy</a>
              </li>
              <li style={styles.footerListItem}>
                <a className="footer-link" style={styles.footerLink}>Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2025 NeuroFleet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;