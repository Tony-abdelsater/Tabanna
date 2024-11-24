import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../context/AuthContext';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // or some fallback UI
  }

  const { isAuthenticated, logout } = authContext;

  return (
    <header className="header">
      <Link to="/" className="header-title">Pet Adoption</Link>
      <nav className="header-nav">
        <Link to="/" className="header-link">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/add-pet" className="header-link">Add Pet</Link>
            <Link to="/profile" className="header-link">Profile</Link>
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