import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PetList.css';

interface Pet {
  id: number;
  name: string;
  image?: string;
  breed?: string;
  age?: number;
  // Add other properties as needed
}

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetch('/api/pets')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched pets:', data);
        setPets(data);
      })
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  return (
    <div className="pet-list-container">
      <h2 className="pet-list-title">Available Pets</h2>
      <div className="pet-grid">
        {pets.map(pet => (
          <Link to={`/pets/${pet.id}`} key={pet.id} className="pet-card">
            <div className="pet-card-image">
              <img 
                src={pet.image ? `/uploads/${pet.image}` : '/uploads/default-pet-image.jpg'} 
                alt={pet.name}
                loading="lazy"
              />
            </div>
            <div className="pet-card-content">
              <h3 className="pet-card-name">{pet.name}</h3>
              {pet.breed && <p className="pet-card-breed">{pet.breed}</p>}
              {pet.age && <p className="pet-card-age">{pet.age} years old</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PetList;