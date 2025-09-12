import React from 'react';
import '../styles/TermsConditions.css';

const TermsConditions = () => {
  return (
    <div className="terms-container">
      {/* Hero Section */}
      <section className="terms-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887')`
          }}
        >
          <div className="hero-content">
            <h1>Terms & Conditions</h1>
            <p>Please read these terms carefully before using our services</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="terms-content">
        <div className="terms-wrapper">
          
          <div className="last-updated">
            <p><strong>Last updated:</strong> January 2024</p>
          </div>

          <div className="terms-section">
            <h2>Acceptance of Terms</h2>
            <p>By accessing and using the Naima Beauty website, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access or use the service.</p>
          </div>

          <div className="terms-section">
            <h2>Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Naima Beauty's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>Product Information</h2>
            <p>We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
            
            <ul>
              <li>Product colors may vary due to monitor settings</li>
              <li>We reserve the right to correct any errors, inaccuracies, or omissions</li>
              <li>We may update product information without prior notice</li>
              <li>Product availability is subject to change</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>Orders and Payment</h2>
            <p>By placing an order, you agree to provide accurate and complete information. We reserve the right to refuse or cancel orders for any reason.</p>
            
            <h3>Order Acceptance</h3>
            <ul>
              <li>All orders are subject to acceptance and availability</li>
              <li>We may require additional verification before accepting orders</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to limit quantities</li>
            </ul>

            <h3>Payment Terms</h3>
            <ul>
              <li>Payment is due at the time of order</li>
              <li>We accept major credit cards and PayPal</li>
              <li>All payments are processed securely</li>
              <li>Refunds will be processed according to our return policy</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>Shipping and Delivery</h2>
            <p>Shipping terms and costs are detailed on our shipping page. Delivery times are estimates and not guaranteed.</p>
            
            <ul>
              <li>Risk of loss passes to you upon delivery</li>
              <li>We are not responsible for delays caused by shipping carriers</li>
              <li>Additional customs fees may apply for international orders</li>
              <li>Incorrect addresses may result in additional charges</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>User Accounts</h2>
            <p>When you create an account, you are responsible for maintaining the security of your account and password.</p>
            
            <ul>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>We reserve the right to terminate accounts for violations</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>Prohibited Uses</h2>
            <p>You may not use our service:</p>
            
            <ul>
              <li>For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations or laws</li>
              <li>To transmit or procure the sending of any advertising or promotional material</li>
              <li>To impersonate or attempt to impersonate the company or other users</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use of the website</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>Disclaimer</h2>
            <p>The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, this company:</p>
            
            <ul>
              <li>Excludes all representations and warranties relating to this website and its contents</li>
              <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
              <li>Does not guarantee the accuracy, completeness, or timeliness of information</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>Limitations</h2>
            <p>In no event shall Naima Beauty or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.</p>
          </div>

          <div className="terms-section">
            <h2>Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
          </div>

          <div className="contact-section">
            <h2>Contact Information</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us:</p>
            
            <div className="contact-info">
              <p><strong>Email:</strong> legal@naimabeauty.com</p>
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

export default TermsConditions;