import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PetList.css';  // Import the CSS file

interface Pet {
  id: number;
  name: string;
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
      <h2>Available Pets</h2>
      <ul className="pet-list">
        {pets.map(pet => (
          <li key={pet.id} className="pet-item">
            <Link to={`/pets/${pet.id}`} className="pet-link">
              <div className="pet-name">{pet.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;