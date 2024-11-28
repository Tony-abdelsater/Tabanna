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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log('Menu toggled:', !menuOpen); // Add this line to verify state change
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <header className="header">
      <Link to="/" className="header-title">Tabanna</Link>
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`} aria-label="Main Navigation">
        <Link to="/" className="header-link" onClick={() => setMenuOpen(false)}>Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/add-pet" className="header-link" onClick={() => setMenuOpen(false)}>Add Pet</Link>
            <Link to="/profile" className="header-link" onClick={() => setMenuOpen(false)}>Profile</Link>
            <Link to="/donations" className="header-link" onClick={() => setMenuOpen(false)}>Donations</Link>
            <button onClick={handleLogout} className="header-link" aria-label="Logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="header-link" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </nav>
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>
    </header>
  );
};

export default Header;