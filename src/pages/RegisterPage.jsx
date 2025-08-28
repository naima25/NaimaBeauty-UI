import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { error, register } = useAppContext();

  const handleRegister = async (event) => {
    event.preventDefault();
    setSuccess('');

    try {
      await register(email, password);
      setSuccess('Registration successful!');
      navigate('/our-products');
    } catch (err) {
      console.log("Registration error: ", err);
    }
  };

  return (
    <div className="register-container">
      {/* Decorative elements */}
      <div className="register-decoration register-decoration-1"></div>
      <div className="register-decoration register-decoration-2"></div>
      
      <div className="register-header">
        <h2>Create Account</h2>
      </div>
      
      <div className="register-content">
        <form onSubmit={handleRegister}>
          <div className="register-input-group">
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
          
          <div className="register-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="register-submit-button">Create Account</button>
          
          {error && <div className="register-message register-error-message">{error}</div>}
          {success && <div className="register-message register-success-message">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;