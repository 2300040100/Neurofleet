import React, { useState } from 'react';
import { BarChart3, Users, Truck, Package, TrendingUp, DollarSign, User, Edit2, Trash2, MapPin, Zap, Plus, X, Map } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Profile from './Profile';
import './ManagerDashboard.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationSelector = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const ManagerDashboard = ({ userData, onLogout }) => {
  const { username } = userData;
  const [showProfile, setShowProfile] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [tempLocation, setTempLocation] = useState(null);
  const [selectedVehicleForMap, setSelectedVehicleForMap] = useState(null);
  
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: 'Vehicle 001',
      model: 'Tesla Model 3',
      location: { lat: 16.5062, lng: 80.6480, address: 'Vijayawada, AP' },
      status: 'Available',
      battery: 85,
      lastUpdate: '2 mins ago'
    },
    {
      id: 2,
      name: 'Vehicle 002',
      model: 'Toyota Camry',
      location: { lat: 16.5100, lng: 80.6350, address: 'Benz Circle, Vijayawada' },
      status: 'In Use',
      battery: 62,
      lastUpdate: '5 mins ago'
    },
    {
      id: 3,
      name: 'Vehicle 003',
      model: 'Honda Civic',
      location: { lat: 16.4950, lng: 80.6600, address: 'Kanuru, Vijayawada' },
      status: 'Needs Service',
      battery: 35,
      lastUpdate: '10 mins ago'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    latitude: '',
    longitude: '',
    address: '',
    status: 'Available',
    battery: 100
  });

  const metrics = [
    { label: 'Active Vehicles', value: vehicles.filter(v => v.status !== 'Needs Service').length.toString(), icon: Truck, color: 'bg-blue-500', change: '+3' },
    { label: 'Total Fleet', value: vehicles.length.toString(), icon: Package, color: 'bg-green-500', change: '0' },
    { label: 'Active Trips', value: '18', icon: TrendingUp, color: 'bg-purple-500', change: '+5' },
    { label: 'Completed Trips', value: '1,234', icon: BarChart3, color: 'bg-orange-500', change: '+89' },
    { label: 'Active Drivers', value: '38', icon: Users, color: 'bg-indigo-500', change: '+2' },
    { label: 'Weekly Revenue', value: '₹45,890', icon: DollarSign, color: 'bg-emerald-500', change: '+12%' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return '#10b981';
      case 'In Use': return '#f59e0b';
      case 'Needs Service': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 60) return '#10b981';
    if (battery > 30) return '#f59e0b';
    return '#ef4444';
  };

  const simulateGPSUpdate = (vehicleId) => {
    setVehicles(vehicles.map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          location: {
            ...v.location,
            lat: v.location.lat + (Math.random() - 0.5) * 0.01,
            lng: v.location.lng + (Math.random() - 0.5) * 0.01
          },
          battery: Math.max(0, v.battery - Math.floor(Math.random() * 5)),
          lastUpdate: 'Just now'
        };
      }
      return v;
    }));
  };

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setFormData({
      name: '',
      model: '',
      latitude: '',
      longitude: '',
      address: '',
      status: 'Available',
      battery: 100
    });
    setShowModal(true);
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      model: vehicle.model,
      latitude: vehicle.location.lat.toString(),
      longitude: vehicle.location.lng.toString(),
      address: vehicle.location.address,
      status: vehicle.status,
      battery: vehicle.battery
    });
    setShowModal(true);
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleSelectLocationFromMap = () => {
    setTempLocation({
      lat: parseFloat(formData.latitude) || 16.5062,
      lng: parseFloat(formData.longitude) || 80.6480
    });
    setShowMapModal(true);
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setTempLocation({ lat, lng });
    setFormData({
      ...formData,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6)
    });
  };

  const handleConfirmLocation = () => {
    setShowMapModal(false);
  };

  const fetchAddressFromCoords = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || '';
  } catch (error) {
    console.error('Reverse geocoding failed', error);
    return '';
  }
};


  const handleSubmit = () => {
    if (!formData.name || !formData.model || !formData.latitude || !formData.longitude || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id 
          ? {
              ...v,
              name: formData.name,
              model: formData.model,
              location: {
                lat: parseFloat(formData.latitude),
                lng: parseFloat(formData.longitude),
                address: formData.address
              },
              status: formData.status,
              battery: parseInt(formData.battery)
            }
          : v
      ));
    } else {
      const newVehicle = {
        id: Math.max(...vehicles.map(v => v.id), 0) + 1,
        name: formData.name,
        model: formData.model,
        location: {
          lat: parseFloat(formData.latitude),
          lng: parseFloat(formData.longitude),
          address: formData.address
        },
        status: formData.status,
        battery: parseInt(formData.battery),
        lastUpdate: 'Just now'
      };
      setVehicles([...vehicles, newVehicle]);
    }
    
    setShowModal(false);
  };

  const handleShowVehicleOnMap = (vehicle) => {
    setSelectedVehicleForMap(vehicle);
  };

  const handleCloseVehicleMap = () => {
    setSelectedVehicleForMap(null);
  };

  if (showProfile) {
    return <Profile userData={userData} onBack={() => setShowProfile(false)} onLogout={onLogout} />;
  }

  return (
    <div className="manager-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">NeuroFleet Dashboard</h1>
            <p className="welcome-text">
              Welcome back, <span className="username">{username}</span> (Fleet Manager)
            </p>
          </div>
          <div className="header-actions">
            <button onClick={() => setShowProfile(true)} className="profile-btn">
              <User size={16} />
              Profile
            </button>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`nav-tab ${currentView === 'dashboard' ? 'active' : ''}`}
          >
            <BarChart3 size={18} />
            Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('vehicles')}
            className={`nav-tab ${currentView === 'vehicles' ? 'active' : ''}`}
          >
            <Truck size={18} />
            Fleet Management
          </button>
        </div>

        {currentView === 'dashboard' ? (
          <>
            <div className="section-header">
              <h2 className="section-title">Fleet Manager Dashboard</h2>
              <p className="section-subtitle">
                Manage your fleet operations and monitor performance
              </p>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="metric-card">
                    <div className="metric-content">
                      <div className="metric-info">
                        <p className="metric-label">{metric.label}</p>
                        <h3 className="metric-value">{metric.value}</h3>
                        <div className="metric-change">
                          <span className={metric.change.startsWith('+') ? 'change-positive' : metric.change === '0' ? 'change-neutral' : 'change-negative'}>
                            {metric.change}
                          </span>
                          <span className="change-label">vs last period</span>
                        </div>
                      </div>
                      <div className={`metric-icon ${metric.color}`}>
                        <Icon className="icon" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="quick-actions-section">
              <h3 className="section-title-small">Quick Actions</h3>
              <div className="actions-grid">
                <button className="action-btn" onClick={() => setCurrentView('vehicles')}>
                  <Truck className="action-icon text-blue-600" />
                  <span className="action-label">Manage Fleet</span>
                </button>
                <button className="action-btn">
                  <Users className="action-icon text-green-600" />
                  <span className="action-label">View Drivers</span>
                </button>
                <button className="action-btn">
                  <Package className="action-icon text-purple-600" />
                  <span className="action-label">Active Trips</span>
                </button>
                <button className="action-btn">
                  <BarChart3 className="action-icon text-orange-600" />
                  <span className="action-label">Analytics</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="fleet-header">
              <div>
                <h2 className="section-title">Vehicle Fleet Management</h2>
                <p className="section-subtitle">Manage your fleet with real-time tracking and status monitoring</p>
              </div>
              <button onClick={handleAddVehicle} className="add-vehicle-btn">
                <Plus size={20} />
                Add Vehicle
              </button>
            </div>

            {/* Vehicles Grid */}
            <div className="vehicles-grid">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="vehicle-card">
                  <div className="vehicle-header">
                    <div>
                      <h3 className="vehicle-name">{vehicle.name}</h3>
                      <p className="vehicle-model">{vehicle.model}</p>
                    </div>
                    <div className="vehicle-actions">
                      <button 
                        onClick={() => handleEditVehicle(vehicle)}
                        className="icon-btn edit-btn"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="icon-btn delete-btn"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <span className="status-badge" style={{
                    background: getStatusColor(vehicle.status) + '20',
                    color: getStatusColor(vehicle.status)
                  }}>
                    {vehicle.status}
                  </span>

                  <div className="vehicle-location">
                    <MapPin size={16} className="location-icon" />
                    <div className="location-details">
                      <strong>Location:</strong> {vehicle.location.address}
                      <br />
                      <small className="coordinates">
                        {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
                      </small>
                    </div>
                  </div>

                  <div className="battery-section">
                    <div className="battery-header">
                      <span className="battery-label">
                        <Zap size={14} />
                        Battery/Fuel
                      </span>
                      <span className="battery-value" style={{ color: getBatteryColor(vehicle.battery) }}>
                        {vehicle.battery}%
                      </span>
                    </div>
                    <div className="battery-bar-container">
                      <div 
                        className="battery-bar" 
                        style={{
                          width: `${vehicle.battery}%`,
                          background: getBatteryColor(vehicle.battery)
                        }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => handleShowVehicleOnMap(vehicle)}
                    className="map-btn"
                  >
                    <Map size={16} />
                    View on Map
                  </button>

                  <p className="last-update">
                    Last updated: {vehicle.lastUpdate}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
              <button onClick={() => setShowModal(false)} className="modal-close">
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Vehicle Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Vehicle 004"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  placeholder="e.g., Toyota Camry"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location (Click map to select)</label>
                <button onClick={handleSelectLocationFromMap} className="map-select-btn">
                  <Map size={18} />
                  Select Location from Map
                </button>
                {formData.latitude && formData.longitude && (
                  <p className="selected-coords">
                    Selected: {parseFloat(formData.latitude).toFixed(4)}, {parseFloat(formData.longitude).toFixed(4)}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="e.g., Vijayawada, AP"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Needs Service">Needs Service</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Battery/Fuel (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="form-input"
                  value={formData.battery}
                  onChange={(e) => setFormData({...formData, battery: e.target.value})}
                />
              </div>

              <div className="modal-actions">
                <button className="btn-primary" onClick={handleSubmit}>
                  {editingVehicle ? 'Update' : 'Add'} Vehicle
                </button>
                <button className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Selection Modal */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Select Vehicle Location</h3>
              <button onClick={() => setShowMapModal(false)} className="modal-close">
                <X size={24} />
              </button>
            </div>
            <p className="modal-subtitle">Click on the map to select the vehicle location</p>
            <div className="map-container">
              <MapContainer
  center={[tempLocation?.lat || 16.5062, tempLocation?.lng || 80.6480]}
  zoom={13}
  style={{ height: '100%', width: '100%' }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <LocationSelector
  onSelect={async (latlng) => {
    setTempLocation(latlng);

    setFormData((prev) => ({
      ...prev,
      latitude: latlng.lat.toFixed(6),
      longitude: latlng.lng.toFixed(6),
    }));

    // 🔴 Fetch address
    const address = await fetchAddressFromCoords(
      latlng.lat,
      latlng.lng
    );

    setFormData((prev) => ({
      ...prev,
      address: address,
    }));
  }}
/>


  {tempLocation && (
    <Marker position={[tempLocation.lat, tempLocation.lng]} />
  )}
</MapContainer>

            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleConfirmLocation}>
                Confirm Location
              </button>
              <button className="btn-secondary" onClick={() => setShowMapModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Location View Modal */}
      {selectedVehicleForMap && (
        <div className="modal-overlay" onClick={handleCloseVehicleMap}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{selectedVehicleForMap.name}</h3>
                <p className="modal-subtitle">{selectedVehicleForMap.model}</p>
              </div>
              <button onClick={handleCloseVehicleMap} className="modal-close">
                <X size={24} />
              </button>
            </div>
            <div className="map-container">
              <MapContainer
                center={[selectedVehicleForMap.location.lat, selectedVehicleForMap.location.lng]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[selectedVehicleForMap.location.lat, selectedVehicleForMap.location.lng]}>
                  <Popup>
                    <strong>{selectedVehicleForMap.name}</strong><br />
                    {selectedVehicleForMap.location.address}<br />
                    Status: {selectedVehicleForMap.status}<br />
                    Battery: {selectedVehicleForMap.battery}%
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleCloseVehicleMap}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;