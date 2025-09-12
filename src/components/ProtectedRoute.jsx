import { useAppContext } from '../context/AppContext'; // Updated import
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, element, fallback = '/our-products' }) => {
  const { userRole, loading, isAuthenticated } = useAppContext();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  if (userRole === role) {
    return element;
  }

  return <Navigate to={fallback} replace />;
};

export default ProtectedRoute;

