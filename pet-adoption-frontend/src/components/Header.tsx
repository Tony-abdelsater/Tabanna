import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Pet Adoption Platform</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-pet">Add Pet</Link>
      </nav>
    </header>
  );
};

export default Header;