import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import '../styles/Account.css';
import { FiArrowRight, FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiHome, FiArrowLeft } from "react-icons/fi";

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Brand Column */}
        <div className="account-branding">
          <div className="brand-content">
            <h1>Welcome to NaimaBeauty</h1>
            <p>Experience luxury beauty redefined. Sign in to access exclusive products, personalized recommendations, and member-only benefits.</p>
            <div className="brand-features">
              <div className="feature">
                <FiUser className="feature-icon" />
                <span>Personalized Recommendations</span>
              </div>
              <div className="feature">
                <FiMail className="feature-icon" />
                <span>Exclusive Member Offers</span>
              </div>
              <div className="feature">
                <FiLock className="feature-icon" />
                <span>Secure Account Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="account-form-container">
          {/* Back to Home Link */}
          <Link to="/" className="back-to-home">
            <FiArrowLeft />
            Back to Home
          </Link>
          
          <div className="form-header">
            <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
            <p>{isLogin ? 'Welcome back to your beauty journey' : 'Join our community of beauty enthusiasts'}</p>
          </div>

          <div className="account-form">
            {isLogin ? <LoginPage /> : <RegisterPage />}
          </div>

          <div className="form-divider">
            <span>or</span>
          </div>

          <div className="account-toggle-buttons">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
              }}
              className="toggle-link"
            >
              {isLogin
                ? "Not a member yet? Create an account"
                : "Already have an account? Sign in"}
              <FiArrowRight className="toggle-arrow" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;