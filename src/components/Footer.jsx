import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { SiTiktok, SiX } from 'react-icons/si';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-column">
          <h3>Naima Beauty</h3>
          <p className="footer-description">
            Luxury beauty products crafted with precision and care. Experience the elegance of premium skincare and cosmetics.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/naimabeauty26_?igsh=MWtvNGtqamJxMWJkZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=100076153177486" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
            <a href="https://www.tiktok.com/@naimaabdulle?_t=ZN-8zGLe9PEU8k&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><SiTiktok /></a>
            <a href="https://x.com/beauty_naima?s=11" target="_blank" rel="noopener noreferrer" aria-label="X"><SiX /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/our-products">Our Products</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/my-orders">Order Tracking</Link></li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping & Returns</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-column">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FiMapPin className="contact-icon" />
              <span>123 Beauty Avenue, London, UK</span>
            </div>
            <div className="contact-item">
              <FiPhone className="contact-icon" />
              <span>+44 20 1234 5678</span>
            </div>
            <div className="contact-item">
              <FiMail className="contact-icon" />
              <span>info@naimabeauty.com</span>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="newsletter">
            <h5>Subscribe to Our Newsletter</h5>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Naima Beauty. All rights reserved.</p>
          <div className="payment-methods">
            <span>We accept:</span>
            <div className="payment-icons">
              <div className="payment-icon">Visa</div>
              <div className="payment-icon">Mastercard</div>
              <div className="payment-icon">PayPal</div>
              <div className="payment-icon">Amex</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;