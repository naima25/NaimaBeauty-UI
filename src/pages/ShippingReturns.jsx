import React from 'react';
import { FiTruck, FiPackage, FiRotateCcw, FiClock } from 'react-icons/fi';
import '../styles/ShippingReturns.css';

const ShippingReturns = () => {
  return (
    <div className="shipping-container">
      {/* Hero Section */}
      <section className="shipping-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780')`
          }}
        >
          <div className="hero-content">
            <h1>Shipping & Returns</h1>
            <p>Everything you need to know about our shipping and return policies</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="shipping-content">
        <div className="shipping-wrapper">
          
          {/* Shipping Information */}
          <div className="info-section">
            <div className="section-header">
              <FiTruck className="section-icon" />
              <h2>Shipping Information</h2>
            </div>
            
            <div className="info-grid">
              <div className="info-card">
                <FiPackage className="card-icon" />
                <h3>Standard Shipping</h3>
                <p><strong>5-7 Business Days</strong></p>
                <p>£4.99 (Free on orders over £50)</p>
              </div>
              
              <div className="info-card">
                <FiClock className="card-icon" />
                <h3>Express Shipping</h3>
                <p><strong>2-3 Business Days</strong></p>
                <p>£9.99</p>
              </div>
            </div>

            <div className="policy-details">
              <h3>Shipping Details</h3>
              <ul>
                <li>All orders are processed within 1-2 business days</li>
                <li>Orders placed after 2 PM will be processed the next business day</li>
                <li>We ship Monday through Friday, excluding holidays</li>
                <li>You will receive a tracking number once your order ships</li>
                <li>Currently, we only ship within the United Kingdom</li>
                <li>Shipping costs are calculated at checkout based on your location</li>
              </ul>
            </div>
          </div>

          {/* Returns Information */}
          <div className="info-section">
            <div className="section-header">
              <FiRotateCcw className="section-icon" />
              <h2>Returns & Exchanges</h2>
            </div>

            <div className="policy-details">
              <h3>Return Policy</h3>
              <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within <strong>30 days</strong> of delivery.</p>
              
              <h4>Return Requirements:</h4>
              <ul>
                <li>Items must be unused and in original condition</li>
                <li>Products must be in original packaging</li>
                <li>Include original receipt or proof of purchase</li>
                <li>Cosmetics and skincare items must be unopened for hygiene reasons</li>
                <li>Custom or personalized items cannot be returned</li>
              </ul>

              <h4>How to Return:</h4>
              <ol>
                <li>Contact our customer service team at info@naimabeauty.com</li>
                <li>Provide your order number and reason for return</li>
                <li>We'll send you a prepaid return label</li>
                <li>Package items securely and attach the return label</li>
                <li>Drop off at any Royal Mail location</li>
              </ol>

              <h4>Refund Process:</h4>
              <ul>
                <li>Refunds are processed within 5-7 business days after we receive your return</li>
                <li>Original payment method will be credited</li>
                <li>Shipping costs are non-refundable (unless item was defective)</li>
                <li>You'll receive an email confirmation once refund is processed</li>
              </ul>
            </div>
          </div>

          {/* Exchanges */}
          <div className="info-section">
            <div className="section-header">
              <h2>Exchanges</h2>
            </div>

            <div className="policy-details">
              <p>We're happy to exchange items for a different size or color, subject to availability.</p>
              
              <h4>Exchange Process:</h4>
              <ul>
                <li>Follow the same return process above</li>
                <li>Specify the item you'd like to exchange for</li>
                <li>We'll send the new item once we receive your return</li>
                <li>If there's a price difference, we'll charge or refund accordingly</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h3>Need Help?</h3>
            <p>If you have any questions about shipping or returns, our customer service team is here to help.</p>
            <div className="contact-info">
              <p><strong>Email:</strong> info@naimabeauty.com</p>
              <p><strong>Phone:</strong> +44 20 1234 5678</p>
              <p><strong>Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM</p>
            </div>
            <a href="/contact" className="contact-btn">Contact Us</a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ShippingReturns;