import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status dynamically
  useEffect(() => {
    const updateUserStatus = () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setIsLoggedIn(!!user);
    };

    updateUserStatus(); // Run once on mount

    window.addEventListener("storage", updateUserStatus);
    return () => window.removeEventListener("storage", updateUserStatus);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Smooth scroll + auto redirect to home
  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);

      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="nav-logo">
          <Link to="/" className="brand">FitLife</Link>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li>
            <a className="nav-link nav-pill" onClick={() => scrollToSection('home')}>
              Home
            </a>
          </li>

          <li>
            <a className="nav-link nav-pill" onClick={() => scrollToSection('about')}>
              About
            </a>
          </li>

          <li>
            <a className="nav-link nav-pill" onClick={() => scrollToSection('services')}>
              Services
            </a>
          </li>

          <li>
            {!isLoggedIn ? (
              <Link to="/login" className="nav-link nav-pill">Login</Link>
            ) : (
              <a className="nav-link nav-pill" onClick={handleLogout}>
                Logout
              </a>
            )}
          </li>
        </ul>

        <div
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
