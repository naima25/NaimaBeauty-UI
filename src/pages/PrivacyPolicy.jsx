import React from 'react';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070')`
          }}
        >
          <div className="hero-content">
            <h1>Privacy Policy</h1>
            <p>Your privacy is important to us. Learn how we collect, use, and protect your information.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content">
        <div className="privacy-wrapper">
          
          <div className="last-updated">
            <p><strong>Last updated:</strong> January 2024</p>
          </div>

          <div className="policy-section">
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.</p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Account credentials and preferences</li>
              <li>Purchase history and product reviews</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Website usage and navigation patterns</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services:</p>
            
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your account and orders</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and customer experience</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            
            <ul>
              <li><strong>Service Providers:</strong> With trusted partners who help us operate our business</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              <li><strong>Consent:</strong> With your explicit permission</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information:</p>
            
            <ul>
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal information</li>
              <li>Employee training on data protection</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Your Rights</h2>
            <p>You have certain rights regarding your personal information:</p>
            
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>Cookies</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience:</p>
            
            <ul>
              <li><strong>Essential Cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
              <li><strong>Marketing Cookies:</strong> Used for personalized advertising</li>
            </ul>
            
            <p>You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.</p>
          </div>

          <div className="policy-section">
            <h2>Children's Privacy</h2>
            <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>
          </div>

          <div className="policy-section">
            <h2>Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.</p>
          </div>

          <div className="contact-section">
            <h2>Contact Us</h2>
            <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
            
            <div className="contact-info">
              <p><strong>Email:</strong> privacy@naimabeauty.com</p>
              <p><strong>Phone:</strong> +44 20 1234 5678</p>
              <p><strong>Address:</strong> 123 Beauty Avenue, London, UK SW1A 1AA</p>
            </div>
            
            <a href="/contact" className="contact-btn">Contact Us</a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;