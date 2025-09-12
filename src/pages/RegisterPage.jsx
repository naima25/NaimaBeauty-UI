import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasDigit: false,
    hasSpecial: false
  });
  const navigate = useNavigate();

  const { error, register } = useAppContext();

  const validatePassword = (pwd) => {
    setPasswordValidation({
      minLength: pwd.length >= 6,
      hasUpper: /[A-Z]/.test(pwd),
      hasLower: /[a-z]/.test(pwd),
      hasDigit: /\d/.test(pwd),
      hasSpecial: /[^a-zA-Z0-9]/.test(pwd)
    });
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleRegister = async (event) => {
    event.preventDefault();
    setSuccess('');

    if (!isPasswordValid) {
      return;
    }

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
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
            />
            {password && (
              <div className="password-requirements">
                <div className={passwordValidation.minLength ? 'valid' : 'invalid'}>
                  ✓ Minimum 6 characters
                </div>
                <div className={passwordValidation.hasUpper ? 'valid' : 'invalid'}>
                  ✓ Uppercase letter
                </div>
                <div className={passwordValidation.hasLower ? 'valid' : 'invalid'}>
                  ✓ Lowercase letter
                </div>
                <div className={passwordValidation.hasDigit ? 'valid' : 'invalid'}>
                  ✓ Digit (0-9)
                </div>
                <div className={passwordValidation.hasSpecial ? 'valid' : 'invalid'}>
                  ✓ Special character
                </div>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="register-submit-button"
            disabled={password && !isPasswordValid}
          >
            Create Account
          </button>
          
          {error && <div className="register-message register-error-message">{error}</div>}
          {success && <div className="register-message register-success-message">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;