import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetList from './components/PetList';
import PetProfile from './components/PetProfile';
import AddPet from './components/AddPet';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import Donations from './components/Donations';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/pets/:id" element={<PetProfile />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/" element={<PetList />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;