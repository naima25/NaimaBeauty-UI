import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-content">

        {/* Hero Section */}
        <section className="hero-section">
          <img
            src="https://t4.ftcdn.net/jpg/15/72/96/53/360_F_1572965322_4VeJadYt0jO7vXxYvZLX4h3D8E0W4ydm.jpg"
            alt="NaimaBeauty team"
            className="hero-image"
          />
        </section>

        {/* Our Passion Section */}
        <section className="mission-section">
          <h2>Our Story 🌸</h2>
          <p>
            NaimaBeauty was born from the belief that everyone deserves to feel confident and cared for. 
            We’re more than just a beauty shop — we’re your go-to glow-up destination!  
            From clean skincare to playful makeup must-haves, everything we do is fueled by love, creativity, and a dash of sparkle ✨.
          </p>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2>Why You’ll Love Us 💕</h2>
          <div className="value-cards">
            <div className="card">
              <h3>🌷 Handpicked with Love</h3>
              <p>Only the best products that we truly adore — tested, trusted, and beautiful.</p>
            </div>
            <div className="card">
              <h3>🐰 100% Cruelty-Free</h3>
              <p>No animal testing. Just pure, ethical beauty goodness.</p>
            </div>
            <div className="card">
              <h3>🚀 Fast & Pretty Delivery</h3>
              <p>Your goodies shipped fast, wrapped cute, and delivered with love.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
