import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPet.css';
import { AuthContext } from '../context/AuthContext';
import { GenderEnum, SizeEnum, PetStatusEnum, GenderType, SizeType, PetStatusType } from '../types/enums';

const AddPet: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [shelterId, setShelterId] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [species, setSpecies] = useState('Dog');
  const [gender, setGender] = useState<GenderType>(GenderEnum.UNKNOWN);
  const [size, setSize] = useState<SizeType>(SizeEnum.MEDIUM);
  const [healthStatus, setHealthStatus] = useState('');
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [status, setStatus] = useState<PetStatusType>(PetStatusEnum.AVAILABLE);
  const [image, setImage] = useState<File | null>(null);

  const shelters = [
    { id: 0, name: 'No Shelter' },
    { id: 1, name: 'AnimalsLebanon' },
    { id: 2, name: 'Beta' },
    { id: 3, name: 'Liflove pets' }
  ];

  const categories = [
    { id: 1, name: 'Pure Breed' },
    { id: 2, name: 'Mix' }
  ];

  const speciesList = ['Dog', 'Cat', 'Rabbit'];

  const formatEnumValue = (value: string): string => {
    return value.charAt(0) + value.slice(1).toLowerCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('description', description);
    formData.append('shelter_id', shelterId.toString());
    formData.append('category_id', categoryId.toString());
    formData.append('species', species);
    formData.append('gender', gender);
    formData.append('size', size);
    formData.append('health_status', healthStatus);
    formData.append('is_vaccinated', String(isVaccinated));
    formData.append('is_neutered', String(isNeutered));
    if (locationId) formData.append('location_id', locationId);
    formData.append('status', status);
    if (image) {
      formData.append('file', image);
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        const newPet = await response.json();
        newPet.image = `/uploads/${newPet.image}`;
        alert('Pet added successfully!');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Failed to add pet: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding pet:', error);
      alert('Error adding pet.');
    }
  };

  return (
    <div className="add-pet-container">
      <h2>Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Shelter:</label>
          <select
            value={shelterId}
            onChange={(e) => setShelterId(Number(e.target.value))}
          >
            {shelters.map((shelter) => (
              <option key={shelter.id} value={shelter.id}>
                {shelter.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Species:</label>
          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            {speciesList.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as GenderType)}
          >
            {Object.values(GenderEnum).map((value) => (
              <option key={value} value={value}>
                {formatEnumValue(value)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Size:</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as SizeType)}
          >
            {Object.values(SizeEnum).map((value) => (
              <option key={value} value={value}>
                {formatEnumValue(value)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Health Status:</label>
          <input
            type="text"
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Vaccinated:</label>
          <input
            type="checkbox"
            checked={isVaccinated}
            onChange={(e) => setIsVaccinated(e.target.checked)}
          />
        </div>
        <div>
          <label>Neutered:</label>
          <input
            type="checkbox"
            checked={isNeutered}
            onChange={(e) => setIsNeutered(e.target.checked)}
          />
        </div>
        <div>
          <label>Location ID:</label>
          <input
            type="number"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PetStatusType)}
          >
            {Object.values(PetStatusEnum).map((value) => (
              <option key={value} value={value}>
                {formatEnumValue(value)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;