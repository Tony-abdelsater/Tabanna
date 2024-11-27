import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Donations.css';

const Donations: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: parseFloat(amount) })
      });

      if (response.ok) {
        alert('Donation successful!');
        setAmount('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
      } else {
        const data = await response.json();
        setError(data.message || 'Donation failed');
      }
    } catch (error) {
      console.error('Error making donation:', error);
      setError('Donation failed');
    }
  };

  return (
    <div className="donations-container">
      <h2>Make a Donation</h2>
      <form onSubmit={handleDonate}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default Donations;