import React, { useState } from 'react';
import { BarChart3, Package, DollarSign, Star, MapPin, Award, User } from 'lucide-react';
import Profile from './Profile';
import './DriverDashboard.css';

const DriverDashboard = ({ userData, onLogout }) => {
  const { username } = userData;
  const [showProfile, setShowProfile] = useState(false);

  const metrics = [
    { label: "Today's Trips", value: '8', icon: Package, color: 'bg-blue-500', change: '+2' },
    { label: "Today's Earnings", value: '₹3,242', icon: DollarSign, color: 'bg-green-500', change: '+₹450' },
    { label: 'Distance Covered', value: '287 km', icon: MapPin, color: 'bg-purple-500', change: '+45 km' },
    { label: 'Driver Rating', value: '4.8', icon: Star, color: 'bg-yellow-500', change: '+0.2' },
    { label: 'Completed Trips', value: '542', icon: BarChart3, color: 'bg-indigo-500', change: '+8' },
    { label: 'Acceptance Rate', value: '94%', icon: Award, color: 'bg-orange-500', change: '+3%' }
  ];

  if (showProfile) {
    return <Profile userData={userData} onBack={() => setShowProfile(false)} onLogout={onLogout} />;
  }

  return (
    <div className="driver-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">🚛 NeuroFleet Dashboard</h1>
            <p className="welcome-text">
              Welcome back, <span className="username">{username}</span> (Driver)
            </p>
          </div>
          <div className="header-actions">
            <button onClick={() => setShowProfile(true)} className="profile-btn">
              <User className="profile-icon" />
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
        {/* Dashboard Title */}
        <div className="section-header">
          <h2 className="section-title">Driver Dashboard</h2>
          <p className="section-subtitle">
            Track your trips, earnings, and performance metrics
          </p>
        </div>

        {/* Metrics Grid */}
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
                      <span className={metric.change.startsWith('+') ? 'change-positive' : 'change-negative'}>
                        {metric.change}
                      </span>
                      <span className="change-label">vs yesterday</span>
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

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3 className="section-title-small">Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <Package className="action-icon text-blue-600" />
              <span className="action-label">View Trips</span>
            </button>
            <button className="action-btn">
              <DollarSign className="action-icon text-green-600" />
              <span className="action-label">Earnings</span>
            </button>
            <button className="action-btn">
              <MapPin className="action-icon text-purple-600" />
              <span className="action-label">Navigation</span>
            </button>
            <button className="action-btn">
              <Star className="action-icon text-yellow-600" />
              <span className="action-label">Ratings</span>
            </button>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default DriverDashboard;