import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.</p>
      <p>We are committed to ensuring that your information is secure. We have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>
      <div className="policy-details">
        <h2>Policy Details</h2>
        <ul>
          <li>Information Collection</li>
          <li>Use of Information</li>
          <li>Security Measures</li>
          <li>Contact Information</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
