import React, { useState } from 'react';
import './AddPet.css';

const AddPet: React.FC = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [ownerId, setOwnerId] = useState('');
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
    if (breed) formData.append('breed', breed);
    if (age) formData.append('age', age);
    if (description) formData.append('description', description);
    if (ownerId) formData.append('owner_id', ownerId);
    if (shelterId) formData.append('shelter_id', shelterId);
    if (categoryId) formData.append('category_id', categoryId);
    if (species) formData.append('species', species);
    if (gender) formData.append('gender', gender);
    if (size) formData.append('size', size);
    if (healthStatus) formData.append('health_status', healthStatus);
    formData.append('is_vaccinated', isVaccinated.toString());
    formData.append('is_neutered', isNeutered.toString());
    if (locationId) formData.append('location_id', locationId);
    formData.append('status', status);
    if (image) {
      formData.append('file', image);
    }

    try {
      const response = await fetch('/api/pets', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Pet added successfully!');
        // Reset form fields
        setName('');
        setBreed('');
        setAge('');
        setDescription('');
        setOwnerId('');
        setShelterId('');
        setCategoryId('');
        setSpecies('');
        setGender('');
        setSize('');
        setHealthStatus('');
        setIsVaccinated(false);
        setIsNeutered(false);
        setLocationId('');
        setStatus('Available');
        setImage(null);
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
          <label>Owner ID:</label>
          <input type="number" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
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
          <textarea value={healthStatus} onChange={(e) => setHealthStatus(e.target.value)} />
        </div>
        <div>
          <label>Is Vaccinated:</label>
          <input type="checkbox" checked={isVaccinated} onChange={(e) => setIsVaccinated(e.target.checked)} />
        </div>
        <div>
          <label>Is Neutered:</label>
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