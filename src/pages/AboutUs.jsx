import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/AboutUs.css";
import { FiHeart, FiTruck, FiAward, FiInstagram, FiFacebook } from "react-icons/fi";
import { SiTiktok, SiX } from 'react-icons/si';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070')`
          }}
        >
          <div className="hero-content">
            <h1>Our Story</h1>
            <p>Where Luxury Meets Beauty</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="text-content">
              <h2>Crafting Beauty Experiences</h2>
              <div className="gold-accent"></div>
              <p>
                NaimaBeauty was born from the belief that everyone deserves to feel confident and cared for. 
                We're more than just a beauty shop — we're your destination for luxury self-care and transformation.
              </p>
              <p>
                From meticulously curated skincare to exquisite makeup essentials, everything we offer is crafted 
                with passion, creativity, and an unwavering commitment to quality.
              </p>
              <Link to="/our-products" className="cta-button">
                Explore Our Collection
              </Link>
            </div>
            <div className="image-content">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070" 
                alt="Luxury beauty products" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Commitment to Excellence</h2>
            <p>Why discerning clients choose NaimaBeauty</p>
          </div>
          <div className="value-cards">
            <div className="value-card">
              <div className="card-icon">
                <FiAward />
              </div>
              <h3>Curated with Precision</h3>
              <p>Only the finest products that meet our exacting standards — tested, trusted, and celebrated for their excellence.</p>
            </div>
            <div className="value-card">
              <div className="card-icon">
                <FiHeart />
              </div>
              <h3>Ethically Conscious</h3>
              <p>Committed to cruelty-free practices and sustainable beauty that respects our planet and its inhabitants.</p>
            </div>
            <div className="value-card">
              <div className="card-icon">
                <FiTruck />
              </div>
              <h3>White Glove Service</h3>
              <p>Your luxury experience extends to our prompt, careful delivery and exquisite packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="promise-section">
        <div className="container">
          <div className="promise-content">
            <h2>The NaimaBeauty Difference</h2>
            <div className="gold-accent"></div>
            <p>
              We believe beauty is an experience to be cherished. Each product in our collection is chosen not just for its 
              efficacy but for its ability to transform your routine into a moment of luxury and self-care.
            </p>
            <p>
              Our team of beauty experts continually searches the globe for innovative formulas, timeless classics, 
              and emerging brands that align with our philosophy of conscious luxury.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="container">
          <div className="section-header">
            <h2>Join Our Beauty Community</h2>
            <p>Connect with us and other beauty enthusiasts</p>
          </div>
          <div className="community-content">
            <div className="community-text">
              <p>
                At NaimaBeauty, we're building more than a brand—we're cultivating a community of beauty lovers 
                who share our passion for quality, ethics, and self-expression through cosmetics and skincare.
              </p>
              <div className="social-links">
                <a href="https://www.instagram.com/naimabeauty26_?igsh=MWtvNGtqamJxMWJkZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
                <a href="https://www.facebook.com/profile.php?id=100076153177486" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
                <a href="https://www.tiktok.com/@naimaabdulle?_t=ZN-8zGLe9PEU8k&_r=1" target="_blank" rel="noopener noreferrer"><SiTiktok /></a>
                <a href="https://x.com/beauty_naima?s=11" target="_blank" rel="noopener noreferrer"><SiX /></a>
              </div>
            </div>
            <div className="community-image">
              <img 
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1887" 
                alt="Beauty community" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;