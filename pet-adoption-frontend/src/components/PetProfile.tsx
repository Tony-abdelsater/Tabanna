import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PetProfile.css';

interface Pet {
  id: number;
  name: string;
  age: number;
  breed: string;
  description: string;
  owner_id: number;
  shelter_id: number;
  // Add other properties as needed
}

const PetProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    fetch(`/api/pets/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched pet:', data); // Log the pet object
        setPet(data);
      })
      .catch(error => console.error('Error fetching pet:', error));
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pet.name}</h2>
      <p><strong>Age:</strong> {pet.age}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Description:</strong> {pet.description}</p>
      <p><strong>Owner ID:</strong> {pet.owner_id}</p>
      <p><strong>Shelter ID:</strong> {pet.shelter_id}</p>
      {/* Add other pet details here */}
    </div>
  );
};

export default PetProfile;