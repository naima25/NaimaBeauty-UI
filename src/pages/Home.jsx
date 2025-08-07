import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from '../assets/NaimaBeauty- final.png';

function HomePage() {
  return (
    <div className="home-container">
      
      {/* Hero Image Section */}
      <div className="home-hero-image">
        <img
          src="https://t3.ftcdn.net/jpg/03/47/75/02/360_F_347750203_GXv0FzGtXjEhAyyv68TaNzBpboULLSYR.jpg"
          alt="NaimaBeauty banner"
        />
      </div>

      {/* Welcome Text */}
      <header className="hero">
        <h1>Welcome to NaimaBeauty</h1>
        <p>Shop the latest products at the best prices</p>
        <Link to="/our-products" className="browse-collections-link">
          Browse Collections
        </Link>
      </header>

      {/* Featured Products Section */}
      <section className="cards-section">
        <h2>Featured Products</h2>
        <div className="card-grid">
          {[
            {
              title: "DIOR Backstage Face & Body Foundation",
              price: "41.00",
              image: "https://media.johnlewiscontent.com/i/JohnLewis/110395307?fmt=auto&$background-off-white$&$rsp-pdp-port-640$"
            },
            { 
              title: "Yves Saint Laurent Make Me Blush, Magenta 03", 
              price: "39", 
              image: "https://media.johnlewiscontent.com/i/JohnLewis/113696811?fmt=auto&$background-off-white$&$rsp-pdp-port-640$" 
            },
            { 
              title: "Hourglass Ambient Lighting Blush", 
              price: "46.00", 
              image: "https://media.johnlewiscontent.com/i/JohnLewis/239746700?fmt=auto&$background-off-white$&$rsp-pdp-port-640$"
            }
          ].map((product, index) => (
            <div key={index} className="card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(parseFloat(product.price))}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
