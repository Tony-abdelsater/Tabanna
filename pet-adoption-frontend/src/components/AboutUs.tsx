import React from 'react';
import './AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>We are a team of 3 CCE students who are passionate pet owners. Our mission is to ensure every pawfriend has a safe and loving home. We believe in caring for pets and making sure they are well taken care of.</p>
      <p>Join us in our journey to provide a better life for all pets!</p>
      <div className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/image1.jpg" alt="Mada Faddoul" />
            <p>Mada Faddoul</p>
          </div>
          <div className="team-member">
            <img src="/image2.jpg" alt="Team Member 2" />
            <p>Rayen BouNassif</p>
          </div>
          <div className="team-member">
            <img src='/image3.jpg' alt="Team Member 3" />
            <p>Tony Abdelsater</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;