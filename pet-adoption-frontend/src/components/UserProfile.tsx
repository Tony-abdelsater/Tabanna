import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import PetCard from './PetCard';

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  // Add other user properties as needed
}

export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  image: string;
  status?: string;
}

export interface Donation {
  id: number;
  amount: number;
  date: string;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then(data => {
        setUser(data.user);
        setPets(data.pets);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      })
      .finally(() => {
        setLoading(false);
      });

    fetch('/api/user/donations', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }
        return response.json();
      })
      .then(data => {
        setDonations(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleAdoptPet = async (petId: number) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/pets/${petId}/adopt`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedPet = await response.json();
        setPets(pets.map(pet => pet.id === petId ? updatedPet : pet));
      } else {
        alert('Failed to update pet status.');
      }
    } catch (error) {
      console.error('Error updating pet status:', error);
      alert('Error updating pet status.');
    }
  };

  const handleRemovePet = async (petId: number) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPets(pets.filter(pet => pet.id !== petId));
      } else {
        alert('Failed to remove pet.');
      }
    } catch (error) {
      console.error('Error removing pet:', error);
      alert('Error removing pet.');
    }
  };

  const handlePetClick = (petId: number) => {
    navigate(`/pets/${petId}`);
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="error">No user data found</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
      <div className="user-pets">
        <h3>Your Pets</h3>
        {pets.length > 0 ? (
          <div className="pet-cards-container">
            {pets.map(pet => (
              <div key={pet.id} className="pet-card-wrapper" onClick={() => handlePetClick(pet.id)}>
                <PetCard name={pet.name} status={pet.status} showImage={false} showAge={false} showBreed={false} />
                {pet.status !== 'ADOPTED' && (
                  <button onClick={(e) => { e.stopPropagation(); handleAdoptPet(pet.id); }}>Mark as Adopted</button>
                )}
                <button onClick={(e) => { e.stopPropagation(); handleRemovePet(pet.id); }}>Remove Pet</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No pets posted yet.</p>
        )}
      </div>
      <div className="donations-section">
        <h2>Your Donations</h2>
        {donations.length > 0 ? (
          <div className="donation-cards-container">
            {donations.map(donation => (
              <div key={donation.id} className="donation-card-wrapper">
                <p>Amount: ${donation.amount}</p>
                <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No donations made yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
