interface PetCardProps {
  name: string | null;
  breed: string | null;
  age: number | null;
  image: string;
  species: string | null;
  gender: 'Male' | 'Female' | 'Unknown' | null;
  size: 'Small' | 'Medium' | 'Large' | null;
  health_status: string | null;
  is_vaccinated: boolean | null;
  is_neutered: boolean | null;
  status: 'Available' | 'Pending' | 'Adopted' | null;
  description?: string | null; // Added
  ownerId?: string | null; // Added
  shelterId?: string | null; // Added
}

const PetCard: React.FC<PetCardProps> = ({
  name,
  breed,
  age,
  image,
  species,
  gender,
  size,
  health_status,
  is_vaccinated,
  is_neutered,
  status,
  description,
  ownerId,
  shelterId
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'status-available';
      case 'Pending':
        return 'status-pending';
      case 'Adopted':
        return 'status-adopted';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div className="pet-card-container">
      <div className="pet-card-content">
        <div className="pet-image-container">
          <img src={image} alt={name || 'Pet'} className="pet-image" />
          {status && (
            <span className={`status-badge ${getStatusColor(status)}`}>
              {status}
            </span>
          )}
        </div>
        
        <div className="pet-info">
          <h2 className="pet-name">{name || 'Unnamed Pet'}</h2>
          
          <div className="pet-main-details">
            {breed && <span className="detail-tag">{breed}</span>}
            {age && <span className="detail-tag">{age} years</span>}
            {size && <span className="detail-tag">{size}</span>}
          </div>

          {description && (
            <div className="pet-description">
              <p>{description}</p>
            </div>
          )}

          <div className="pet-attributes">
            <div className="attribute-row">
              <span className="attribute-label">Species:</span>
              <span className="attribute-value">{species || 'Unknown'}</span>
            </div>
            <div className="attribute-row">
              <span className="attribute-label">Gender:</span>
              <span className="attribute-value">{gender || 'Unknown'}</span>
            </div>
            {ownerId && (
              <div className="attribute-row">
                <span className="attribute-label">Owner ID:</span>
                <span className="attribute-value">{ownerId}</span>
              </div>
            )}
            {shelterId && (
              <div className="attribute-row">
                <span className="attribute-label">Shelter ID:</span>
                <span className="attribute-value">{shelterId}</span>
              </div>
            )}
          </div>

          {/* ... rest of the existing component ... */}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
