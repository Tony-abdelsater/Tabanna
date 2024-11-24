import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetList from './components/PetList';
import PetProfile from './components/PetProfile';
import AddPet from './components/AddPet'; // Import the AddPet component
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register'; // Import the Register component
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/pets/:id" element={<PetProfile />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Add the Register route */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<PetList />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;