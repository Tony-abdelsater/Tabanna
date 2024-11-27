import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPet.css';
import { AuthContext } from '../context/AuthContext';

const AddPet: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [shelterId, setShelterId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [isNeutered, setIsNeutered] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [status, setStatus] = useState('Available');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('description', description);
    formData.append('shelter_id', shelterId);
    formData.append('category_id', categoryId);
    formData.append('species', species);
    formData.append('gender', gender);
    formData.append('size', size);
    formData.append('health_status', healthStatus);
    formData.append('is_vaccinated', isVaccinated.toString());
    formData.append('is_neutered', isNeutered.toString());
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
        alert('Pet added successfully!');
        // Reset form fields
        setName('');
        setBreed('');
        setAge('');
        setDescription('');
        setShelterId('');
        setCategoryId('');
        setSpecies('');
        setGender('');
        setSize('');
        setHealthStatus('');
        setIsVaccinated(false);
        setIsNeutered(false);
        setLocationId('');
        setStatus('AVAILABLE');
        setImage(null);
        navigate('/');
      } else {
        alert('Failed to add pet.');
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
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Shelter ID:</label>
          <input type="number" value={shelterId} onChange={(e) => setShelterId(e.target.value)} />
        </div>
        <div>
          <label>Category ID:</label>
          <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </div>
        <div>
          <label>Species:</label>
          <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div>
          <label>Size:</label>
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
        </div>
        <div>
          <label>Health Status:</label>
          <input type="text" value={healthStatus} onChange={(e) => setHealthStatus(e.target.value)} />
        </div>
        <div>
          <label>Vaccinated:</label>
          <input type="checkbox" checked={isVaccinated} onChange={(e) => setIsVaccinated(e.target.checked)} />
        </div>
        <div>
          <label>Neutered:</label>
          <input type="checkbox" checked={isNeutered} onChange={(e) => setIsNeutered(e.target.checked)} />
        </div>
        <div>
          <label>Location ID:</label>
          <input type="number" value={locationId} onChange={(e) => setLocationId(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
        </div>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;