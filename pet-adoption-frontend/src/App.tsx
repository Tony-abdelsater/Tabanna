import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetList from './components/PetList';
import PetProfile from './components/PetProfile';
import AddPet from './components/AddPet'; // Import the AddPet component
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/pets/:id" element={<PetProfile />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/" element={<PetList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;