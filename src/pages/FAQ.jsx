import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../styles/FAQ.css';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What are your shipping options?",
      answer: "We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Free standard shipping is available on orders over £50."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unused and in original packaging. Please contact our customer service team to initiate a return."
    },
    {
      question: "Are your products cruelty-free?",
      answer: "Yes, all Naima Beauty products are cruelty-free. We do not test on animals and work only with suppliers who share our commitment to ethical practices."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within the UK only. We're working on expanding our shipping options to include international destinations in the near future."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay for your convenience."
    },
    {
      question: "How can I contact customer service?",
      answer: "You can reach our customer service team via email at info@naimabeauty.com, phone at +44 20 1234 5678, or through our contact form. We're available Monday-Friday 9AM-6PM."
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer: "Many of our products are formulated for sensitive skin. Please check individual product descriptions for specific information, and we recommend patch testing before full use."
    }
  ];

  return (
    <div className="faq-container">
      {/* Hero Section */}
      <section className="faq-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2070')`
          }}
        >
          <div className="hero-content">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about our products and services</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="faq-wrapper">
          <div className="section-header">
            <h2>Common Questions</h2>
            <p>Can't find what you're looking for? Feel free to contact our customer service team.</p>
          </div>

          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-item ${openItems[index] ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleItem(index)}>
                  <h3>{item.question}</h3>
                  <span className="faq-icon">
                    {openItems[index] ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact">
            <h3>Still have questions?</h3>
            <p>Our customer service team is here to help you with any additional questions.</p>
            <a href="/contact" className="contact-btn">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;