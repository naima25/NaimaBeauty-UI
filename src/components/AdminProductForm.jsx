import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/AdminProductForm.css'; 

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, getProductById, updateOrCreateProduct } = useAppContext(); 

  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: '',
    description: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      if (id) {
        setIsEditing(true);
        try {
          const productData = await getProductById(id);
          if (isMounted) {
            setProduct(productData);
            if (productData.imageUrl) {
              setImagePreview(productData.imageUrl);
            }
          }
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      } else {
        setIsEditing(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    
    // Update image preview when image URL changes
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateOrCreateProduct(isEditing, id, product);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error saving the product. Please try again.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/products');
    }
  };

  return (
    <div className="admin-product-form-container">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
        </div>
        
        <div>
          <label>Price (£)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter product description"
          />
        </div>
        
        {imagePreview && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img src={imagePreview} alt="Preview" onError={(e) => {
              e.target.style.display = 'none';
            }} />
          </div>
        )}
        
        <button type="submit">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="navigation-buttons">
        <button onClick={handleCancel} className="back-to-products-button">
          Cancel
        </button>
        <Link to="/admin/products" className="back-to-products-button">
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default AdminProductForm;