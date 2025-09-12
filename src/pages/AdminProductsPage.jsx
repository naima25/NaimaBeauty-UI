import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import '../styles/AdminProductsPage.css';
import '../styles/HeroStyles.css';

const AdminProductsPage = () => {
  const { products, deleteProduct, loading, error } = useAppContext();

  const handleDelete = async (productId) => {
    if (window.confirm('Delete this product permanently?')) {
      deleteProduct(productId);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-products-container">
      {/* Hero Section */}
      <section className="admin-hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1780')`
          }}
        >
          <div className="hero-content">
            <h1>Product Management</h1>
            <p>Manage your beauty product inventory and catalog</p>
          </div>
        </div>
      </section>

      <div className="admin-content">
        <div className="admin-controls">
        <Link to="/admin/categories" className="categories-link">
          Manage Categories
        </Link>
        <Link to="/admin/products/new" className="add-button">
          + Add New Product
        </Link>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th> {/* Now displayed in pounds */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="admin-product-thumbnail"
                />
              </td>
              <td>{product.name}</td>
              <td>Naima Beauty</td>
              <td>{product.categoryNames}</td>
              <td>
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(product.price)}
              </td>
              <td className="action-buttons">
                <Link 
                  to={`/admin/products/edit/${product.id}`} 
                  className="edit-button"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
