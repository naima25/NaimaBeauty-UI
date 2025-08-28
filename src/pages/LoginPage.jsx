import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { login, error } = useAppContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    setSuccess('');

    try {
      await login(email, password);
      setSuccess('Login successful!');
      navigate('/our-products');
    } catch (err) {
      console.log("Login Error: ", err);
    }
  };

  return (
    <div className="login-container">
      {/* Decorative elements */}
      <div className="login-decoration login-decoration-1"></div>
      <div className="login-decoration login-decoration-2"></div>
      
      <div className="login-header">
        <h2>Welcome Back</h2>
      </div>
      
      <div className="login-content">
        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-submit-button">Sign In</button>
          
          {error && <div className="login-message login-error-message">{error}</div>}
          {success && <div className="login-message login-success-message">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;