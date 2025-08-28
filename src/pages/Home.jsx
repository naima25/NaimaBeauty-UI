import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { FiArrowRight, FiStar, FiHeart, FiAward, FiInstagram, FiFacebook } from "react-icons/fi";
import { SiTiktok, SiX } from 'react-icons/si';

function HomePage() {


  // Slider data with images and optional text/links
  const sliderData = [
    {
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070",
      title: "Luxury Beauty Reimagined",
      subtitle: "Experience the elegance of premium skincare and cosmetics",
      ctaText: "Discover Collection",
      ctaLink: "/our-products"
    },
    {
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2070",
      title: "New Royal Collection",
      subtitle: "Crafted for those who appreciate the finer things in life",
      ctaText: "Explore Now",
      ctaLink: "/new-collection"
    },
    {
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070",
      title: "Exclusive Offers",
      subtitle: "Indulge in luxury with up to 30% off selected items",
      ctaText: "View Offers",
      ctaLink: "/specials"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderData.length) % sliderData.length);
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Sophia R.",
      role: "Beauty Influencer",
      content: "NaimaBeauty products transformed my skincare routine. The luxury feel is unmatched.",
      rating: 5
    },
    {
      name: "Emma L.",
      role: "Makeup Artist",
      content: "The pigmentation and longevity of these products are exceptional. My clients always ask what I use.",
      rating: 5
    },
    {
      name: "Isabella M.",
      role: "Lifestyle Blogger",
      content: "From packaging to performance, NaimaBeauty exceeds expectations every time.",
      rating: 5
    }
  ];

  // Brand values data
  const values = [
    {
      icon: <FiAward />,
      title: "Premium Quality",
      description: "We source only the finest ingredients for exceptional results"
    },
    {
      icon: <FiHeart />,
      title: "Cruelty Free",
      description: "All our products are ethically produced and never tested on animals"
    },
    {
      icon: <FiStar />,
      title: "Luxury Experience",
      description: "From purchase to application, enjoy a truly luxurious experience"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        {sliderData.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.image})` }}
          >
            <div className="slide-content">
              <div className="gold-accent-line"></div>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <Link to={slide.ctaLink} className="cta-button">
                {slide.ctaText} <FiArrowRight className="cta-arrow" />
              </Link>
            </div>
          </div>
        ))}
        
        {/* Slider navigation */}
        <button className="slider-nav prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="slider-nav next" onClick={nextSlide}>
          &#10095;
        </button>
        
        {/* Slider indicators */}
        <div className="slider-indicators">
          {sliderData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="brand-values">
        <div className="values-container">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="cards-section">
        <div className="section-header">
          <h2>Signature Collection</h2>
          <p>Our most beloved products, cherished by beauty enthusiasts worldwide</p>
        </div>
        <div className="card-grid">
          {[
            {
              title: "DIOR Backstage Face & Body Foundation",
              price: "41.00",
              image: "https://media.johnlewiscontent.com/i/JohnLewis/110395307?fmt=auto&$background-off-white$&$rsp-pdp-port-640$",
              badge: "Bestseller"
            },
            { 
              title: "Yves Saint Laurent Make Me Blush", 
              price: "39.00", 
              image: "https://media.johnlewiscontent.com/i/JohnLewis/113696811?fmt=auto&$background-off-white$&$rsp-pdp-port-640$",
              badge: "New" 
            },
            { 
              title: "Hourglass Ambient Lighting Blush", 
              price: "46.00", 
              image: "https://media.johnlewiscontent.com/i/JohnLewis/239746700?fmt=auto&$background-off-white$&$rsp-pdp-port-640$",
              badge: "Limited Edition"
            }
          ].map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <button className="wishlist-btn">
                  <FiHeart />
                </button>
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <div className="product-price">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                  }).format(parseFloat(product.price))}
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/our-products" className="view-all-btn">
            View All Products <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Praise From Our Community</h2>
          <p>Discover why beauty enthusiasts worldwide choose NaimaBeauty</p>
        </div>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="star-icon" />
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join Our Inner Circle</h2>
          <p>Subscribe to receive exclusive offers, beauty tips, and early access to new collections</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="instagram-section">
        <div className="section-header">
          <h2>Follow Our Journey</h2>
          <p>See our latest posts and tag us to be featured</p>
        </div>
        <div className="instagram-embed-container">
          <iframe
            src="https://www.instagram.com/naimabeauty26_/embed"
            width="100%"
            height="500"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            title="Instagram Feed"
          ></iframe>
        </div>
        <div className="social-links">
          <a href="https://www.instagram.com/naimabeauty26_?igsh=MWtvNGtqamJxMWJkZg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
          <a href="https://www.facebook.com/profile.php?id=100076153177486" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
          <a href="https://www.tiktok.com/@naimaabdulle?_t=ZN-8zGLe9PEU8k&_r=1" target="_blank" rel="noopener noreferrer"><SiTiktok /></a>
          <a href="https://x.com/beauty_naima?s=11" target="_blank" rel="noopener noreferrer"><SiX /></a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;