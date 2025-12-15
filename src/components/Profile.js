import React, { useState } from 'react';
import { ArrowLeft, Mail, User, Shield, Phone, MapPin, Edit2, Save, CreditCard, FileText } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Profile.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Profile = ({ userData, onBack, onLogout }) => {
  const { username, userType, email } = userData;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: username,
    email: email,
    phone: '+(91)',
    location: 'Gudipadu, Musunuru, Eluru district, Andhra Pradesh, India',
    address: '123 Main Street, City, State',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: 'XXXX XXXX 1234',
    bio: '',
    latitude: 16.5062,
    longitude: 80.6480
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="header-content">
          <button onClick={onBack} className="back-btn">
            <ArrowLeft className="back-icon" />
            Back to Dashboard
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-main">
        <div className="profile-card">
          {/* Profile Header */}
          <div className="profile-card-header">
            <div className="avatar-section">
              <div className="avatar">
                <User className="avatar-icon" />
              </div>
              <div className="user-info">
                <h2 className="user-name">{profileData.username}</h2>
                <div className="user-badge">
                  <Shield className="badge-icon" />
                  <span>{userType}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="edit-btn"
            >
              {isEditing ? (
                <>
                  <Save className="edit-icon" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="edit-icon" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            <h3 className="section-title">Profile Information</h3>
            
            {/* Two Column Grid */}
            <div className="details-grid">
              {/* Left Column */}
              <div className="details-column">
                <div className="detail-group">
                  <label className="detail-label">
                    <Mail className="detail-icon" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="detail-input"
                    />
                  ) : (
                    <p className="detail-value">{profileData.email}</p>
                  )}
                </div>

                <div className="detail-group">
                  <label className="detail-label">
                    <Phone className="detail-icon" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="detail-input"
                    />
                  ) : (
                    <p className="detail-value">{profileData.phone}</p>
                  )}
                </div>

                <div className="detail-group">
                  <label className="detail-label">
                    <MapPin className="detail-icon" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="detail-input"
                    />
                  ) : (
                    <p className="detail-value">{profileData.location}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="details-column">
                <div className="detail-group">
                  <label className="detail-label">
                    <CreditCard className="detail-icon" />
                    PAN Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.panNumber}
                      onChange={(e) => setProfileData({...profileData, panNumber: e.target.value})}
                      className="detail-input"
                      maxLength="10"
                    />
                  ) : (
                    <p className="detail-value">{profileData.panNumber}</p>
                  )}
                </div>

                <div className="detail-group">
                  <label className="detail-label">
                    <FileText className="detail-icon" />
                    Aadhaar Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.aadhaarNumber}
                      onChange={(e) => setProfileData({...profileData, aadhaarNumber: e.target.value})}
                      className="detail-input"
                      maxLength="14"
                    />
                  ) : (
                    <p className="detail-value">{profileData.aadhaarNumber}</p>
                  )}
                </div>

                <div className="detail-group">
                  <label className="detail-label">
                    <MapPin className="detail-icon" />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="detail-input"
                    />
                  ) : (
                    <p className="detail-value">{profileData.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="profile-map-section">
            <h3 className="section-title">Your Location</h3>
            <div className="map-container">
              <MapContainer
                center={[profileData.latitude, profileData.longitude]}
                zoom={13}
                style={{ height: '400px', width: '100%', borderRadius: '12px' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[profileData.latitude, profileData.longitude]}>
                  <Popup>
                    <strong>{profileData.username}</strong><br />
                    {profileData.location}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Account Stats */}
          <div className="profile-stats">
            <h3 className="section-title">Account Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-label">Member Since</p>
                <p className="stat-value">January 2024</p>
              </div>
              <div className="stat-item">
                <p className="stat-label">Account Status</p>
                <p className="stat-value status-active">Active</p>
              </div>
              <div className="stat-item">
                <p className="stat-label">Last Login</p>
                <p className="stat-value">Today, 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;