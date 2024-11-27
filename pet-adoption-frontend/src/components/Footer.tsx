import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Tabanna</p>
        <nav className="footer-nav">
          <Link to="/about-us">About Us</Link>
          <Link to="/privacy-policy" >Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;