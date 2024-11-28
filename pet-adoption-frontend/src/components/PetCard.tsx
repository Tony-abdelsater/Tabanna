import React from 'react';
import './PetCard.css';

interface PetCardProps {
  name: string;
  breed?: string;
  age?: number;
  image?: string;
  status?: string;
  showImage?: boolean;
  showAge?: boolean;
  showBreed?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ name, breed, age, image, status, showImage = true, showAge = true, showBreed = true }) => {
  return (
    <div className="pet-card">
      {showImage && (
        <img 
          src={image ? `/uploads/${image}` : '/uploads/default-pet-image.jpg'} 
          alt={name} 
        />
      )}
      <h2>{name}</h2>
      {showBreed && breed && <p><strong>Breed:</strong> {breed}</p>}
      {showAge && age && <p><strong>Age:</strong> {age} years</p>}
      {status && <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>}
    </div>
  );
};

export default PetCard;