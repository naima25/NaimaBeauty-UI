import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';  
import { useAppContext } from '../context/AppContext';
import '../styles/OurProducts.css';
import '../styles/HeroStyles.css';  

const OurProducts = () => {
  const { categories, products, filteredProducts, setFilteredProducts, loading, error, getProductsByCategory } = useAppContext(); 
  const [activeCategory, setActiveCategory] = useState(null);

  // Function to shuffle products randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(shuffleArray([...products]));
    }
  }, [products, setFilteredProducts]);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName) {
      getProductsByCategory(categoryName);
    }
  };

  // Handle "View All Products" button click
  const viewAllProducts = () => {
    setActiveCategory(null);
    setFilteredProducts(shuffleArray([...products]));
  };

  if (loading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;

  return (
    <div className="our-products-container">
      {/* Hero Section */}
      <section className="products-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070')`
          }}
        >
          <div className="hero-content">
            <h1>Our Collection</h1>
            <p>Discover our exquisite range of beauty products, carefully curated for your luxury experience</p>
          </div>
        </div>
      </section>

      {/* "View Our Products" Button */}
      <div className="categories-header">
        <button onClick={viewAllProducts}>View All Products</button>
      </div>

      {/* Category Buttons Row */}
      <div className="category-row">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Display */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} /> 
        ))}
      </div>
    </div>
  );
};

export default OurProducts;