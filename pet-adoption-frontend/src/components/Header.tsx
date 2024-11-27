import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../context/AuthContext';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!authContext) {
    return null; // or some fallback UI
  }

  const { isAuthenticated, logout } = authContext;

  return (
    <header className="header">
      <Link to="/" className="header-title">Pet Adoption</Link>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="header-link">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/add-pet" className="header-link">Add Pet</Link>
            <Link to="/profile" className="header-link">Profile</Link>
            <Link to="/donations" className="header-link">Donations</Link>
            <button onClick={logout} className="header-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link">Login</Link>
            <Link to="/register" className="header-link">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;