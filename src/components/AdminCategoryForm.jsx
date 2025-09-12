import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/AdminProductForm.css';
import '../styles/AdminCategoryForm.css';
import '../styles/HeroStyles.css';

const AdminCategoryForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { updateOrCreateCategory, getCategoryById } = useAppContext();

  useEffect(() => {
    let isMounted = true;

    const fetchCategory = async () => {
      if (id) {
        setIsEditing(true);
        try {
          const categoryData = await getCategoryById(id);
          if (isMounted) {
            setCategory(categoryData);
          }
        } catch (error) {
          console.error("Failed to fetch category:", error);
          alert('Failed to load category data. Please try again.');
        }
      } else {
        setIsEditing(false);
      }
    };

    fetchCategory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrCreateCategory(isEditing, id, category);
      navigate('/admin/categories');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('There was an error saving the category. Please try again.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/admin/categories');
    }
  };

  return (
    <div className="admin-category-form-page">
      {/* Hero Section */}
      <section className="admin-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1887')`
          }}
        >
          <div className="hero-content">
            <h1>{isEditing ? 'Edit Category' : 'Add New Category'}</h1>
            <p>{isEditing ? 'Update category information' : 'Create a new product category'}</p>
          </div>
        </div>
      </section>

      <div className="admin-category-form-container">
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
            placeholder="Enter category name"
          />
        </div>
        
        <button type="submit">
          {isEditing ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <div className="navigation-buttons">
        <button onClick={handleCancel} className="back-to-categories-button">
          Cancel
        </button>
        <Link to="/admin/categories" className="back-to-categories-button">
          Back to Categories
        </Link>
      </div>
    </div>
    </div>
  );
};

export default AdminCategoryForm;