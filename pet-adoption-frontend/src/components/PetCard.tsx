import React from 'react';
import './PetCard.css';

interface PetCardProps {
  name: string;
  breed: string;
  age: number;
  image: string;
}

const PetCard: React.FC<PetCardProps> = ({ name, breed, age, image }) => {
  return (
    <div className="pet-card">
      <img src={image ? `/uploads/${image}` : '/uploads/default-pet-image.jpg'} alt={`${name}`} />
      <h2>{name}</h2>
      <p>{breed}</p>
      <p>{age} years old</p>
    </div>
  );
};

export default PetCard;