import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/AboutUs.css";

/* 
  AboutUs Component:
  This component is the 'About Us' page for the ... platform. It provides information about the company's mission, values, and what sets it apart from other ecommerce platforms. 
  The page is structured into three main sections:
    -  Hero Section
   - Our Passion Section
   - Values Section

  This component is styled using an external CSS file and renders a simple, informative layout for visitors to learn more about EasyCommerce.
*/

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-content">
        {/* Hero Section */}
        <section className="hero-section">
          <img
            src="https://thumbs.dreamstime.com/b/asian-business-financial-team-work-together-project-brainstorm-meeting-cooperate-teamwork-strategy-planning-young-small-startup-187442432.jpg?w=2048"
            alt="NaimaBeauty team"
            className="hero-image"
          />
        </section>

        {/* Our Passion Section */}
        <section className="mission-section">
          <h2>Our Passion</h2>
          <p>
         Placeholder text here 
          </p>
        </section>



        {/* Values Section */}
        <section className="values-section">
          <h2>Why Choose Us?</h2>
          <div className="value-cards">
            <div className="card">
              <h3>✓ Curated Selection</h3>
              <p>Only the best products from trusted sellers</p>
            </div>
            <div className="card">
              <h3>✓ Easy Returns</h3>
              <p>30-day hassle-free return policy</p>
            </div>
            <div className="card">
              <h3>✓ Fast Shipping</h3>
              <p>Get your items in 2-3 business days</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;