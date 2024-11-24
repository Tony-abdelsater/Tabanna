import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PetProfile.css';

interface Pet {
  id: number;
  name: string | null;
  breed: string | null;
  age: number | null;
  owner_id: number | null;
  shelter_id: number | null;
  species: string | null;
  gender: 'Male' | 'Female' | 'Unknown' | null;
  size: 'Small' | 'Medium' | 'Large' | null;
  health_status: string | null;
  is_vaccinated: boolean | null;
  is_neutered: boolean | null;
  status: 'Available' | 'Pending' | 'Adopted' | null;
  created_at: string | null;
  category_id: number | null;
  image?: string;
}

const PetProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    fetch(`/api/pets/${id}`)
      .then(response => response.json())
      .then(data => setPet(data))
      .catch(error => console.error('Error fetching pet:', error));
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pet-profile">
      <h2>{pet.name || 'Unnamed Pet'}</h2>
      {pet.image ? (
        <img src={`/uploads/${pet.image}`} alt={pet.name || 'Pet'} />
      ) : (
        <img src="/uploads/default-pet-image.jpg" alt="Default Pet" />
      )}
      {pet.breed && <p><strong>Breed:</strong> {pet.breed}</p>}
      {pet.age && <p><strong>Age:</strong> {pet.age} years</p>}
      {pet.species && <p><strong>Species:</strong> {pet.species}</p>}
      {pet.gender && <p><strong>Gender:</strong> {pet.gender}</p>}
      {pet.size && <p><strong>Size:</strong> {pet.size}</p>}
      {pet.health_status && <p><strong>Health Status:</strong> {pet.health_status}</p>}
      
      {pet.is_vaccinated !== null && (
        <p><strong>Vaccinated:</strong> {pet.is_vaccinated ? 'Yes' : 'No'}</p>
      )}
      {pet.is_neutered !== null && (
        <p><strong>Neutered:</strong> {pet.is_neutered ? 'Yes' : 'No'}</p>
      )}
      
      {pet.status && <p><strong>Status:</strong> {pet.status}</p>}
      {pet.created_at && (
        <p><strong>Listed on:</strong> {new Date(pet.created_at).toLocaleDateString()}</p>
      )}
      
      {pet.owner_id && <p><strong>Owner ID:</strong> {pet.owner_id}</p>}
      {pet.shelter_id && <p><strong>Shelter ID:</strong> {pet.shelter_id}</p>}
      {pet.category_id && <p><strong>Category ID:</strong> {pet.category_id}</p>}
    </div>
  );
};

export default PetProfile;