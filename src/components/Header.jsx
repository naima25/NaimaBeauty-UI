import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import logo from '../assets/NaimaBeauty- final.png';
import whiteLogo from '../assets/NaimaBeauty-white.png';
import { useAppContext } from "../context/AppContext"; 
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { FiMail, FiHelpCircle, FiTruck, FiShield, FiFileText } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cart, isAuthenticated, logout, getTotalItems, userRole } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const totalCartQuantity = cart?.cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Control header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
        setDropdownOpen(false); // Close dropdown when scrolling down
      } else if (currentScrollY < lastScrollY) {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Handle dropdown hover behavior
  const handleDropdownEnter = () => {
    if (window.innerWidth > 768) {
      setDropdownOpen(true);
    }
  };

  const handleDropdownLeave = () => {
    if (window.innerWidth > 768) {
      // Add a small delay to prevent accidental closing
      setTimeout(() => {
        setDropdownOpen(false);
      }, 300);
    }
  };

  return (
    <nav className={isHeaderVisible ? '' : 'header-hidden'}>
      {/* Logo row - centered at top */}
      <div className="logo-row">
        <Link
          to="/home"
          className={`header-logo-link ${location.pathname === '/home' ? 'active' : ''}`}
          onClick={closeMenu}
        >
          {/* Regular logo (shown on hover) */}
          <img src={logo} alt="NaimaBeauty logo" className="header-logo colored-logo" />
          
          {/* White logo (shown by default) */}
          <img src={whiteLogo} alt="NaimaBeauty logo" className="header-logo white-logo" />
        </Link>
      </div>

      {/* Navigation row - centered below logo */}
      <div className="nav-row">
        <ul className={`menu ${isMenuOpen ? "active" : ""}`}>
          {/* Account link positioned to the left */}
          <li className="account-item">
            {isAuthenticated ? (
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link
                to="/account"
                className={location.pathname === "/account" ? "active" : ""}
                onClick={closeMenu}
              >
                Account
              </Link>
            )}
          </li>

          {/* Public Links - visible to everyone */}
          <li>
            <Link
              to="/our-products"
              className={location.pathname === "/our-products" ? "active" : ""}
              onClick={closeMenu}
            >
              Our Products
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className={location.pathname === "/about-us" ? "active" : ""}
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>
          
          {/* Enhanced Dropdown */}
          <li 
            className={`dropdown ${isDropdownOpen ? 'show' : ''}`}
            ref={dropdownRef}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <span 
              className="dropdown-toggle"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setDropdownOpen(!isDropdownOpen);
                }
              }}
            >
              Support <FaChevronDown className="dropdown-icon" />
            </span>
            <div 
              className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link to="/contact" onClick={closeMenu}>
                <FiMail className="dropdown-item-icon" />
                Contact Us
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                <FiHelpCircle className="dropdown-item-icon" />
                FAQ
              </Link>
              <Link to="/shipping" onClick={closeMenu}>
                <FiTruck className="dropdown-item-icon" />
                Shipping & Returns
              </Link>
              <Link to="/privacy" onClick={closeMenu}>
                <FiShield className="dropdown-item-icon" />
                Privacy Policy
              </Link>
              <Link to="/terms" onClick={closeMenu}>
                <FiFileText className="dropdown-item-icon" />
                Terms & Conditions
              </Link>
            </div>
          </li>
          {/* User-specific Links - only visible to authenticated users with 'User' role */}
          {isAuthenticated && userRole === "User" && (
            <>
              <li>
                <Link
                  to="/my-orders"
                  className={location.pathname === "/my-orders" ? "active" : ""}
                  onClick={closeMenu}
                >
                  My Orders
                </Link>
              </li>
              <li className="nav-cart-item">
                <Link
                  to="/cart"
                  className={`cart-link ${location.pathname === "/cart" ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="cart-text">
                    Cart <FaShoppingCart className="cart-icon" style={{ marginLeft: "5px" }} />
                    {totalCartQuantity > 0 && <span className="cart-counter">({totalCartQuantity})</span>}
                  </span>
                </Link>
              </li>
            </>
          )}

          {/* Admin-specific Links - only visible to authenticated users with 'Admin' role */}
          {isAuthenticated && userRole === "Admin" && (
            <>
              <li>
                <Link
                  to="/admin/products"
                  className={location.pathname.startsWith("/admin/products") ? "active" : ""}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/analytics"
                  className={location.pathname === "/admin/analytics" ? "active" : ""}
                  onClick={closeMenu}
                >
                  Analytics
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Header;