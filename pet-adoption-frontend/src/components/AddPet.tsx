import React, { useState } from 'react';
import './AddPet.css';

const AddPet: React.FC = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [shelterId, setShelterId] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('description', description);
    formData.append('owner_id', ownerId);
    formData.append('shelter_id', shelterId);
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
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Owner ID:</label>
          <input type="number" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required />
        </div>
        <div>
          <label>Shelter ID:</label>
          <input type="number" value={shelterId} onChange={(e) => setShelterId(e.target.value)} required />
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