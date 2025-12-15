import React, { useState } from 'react';
import { BarChart3, Package, DollarSign, TrendingUp, Calendar, MapPin, User } from 'lucide-react';
import Profile from './Profile';
import './CustomerDashboard.css';

const CustomerDashboard = ({ userData, onLogout }) => {
  const { username } = userData;
  const [showProfile, setShowProfile] = useState(false);

  const metrics = [
    { label: 'Active Bookings', value: '2', icon: Package, color: 'bg-blue-500', change: '+1' },
    { label: 'Total Trips', value: '67', icon: BarChart3, color: 'bg-green-500', change: '+5' },
    { label: 'Total Spent', value: '₹1,845', icon: DollarSign, color: 'bg-purple-500', change: '+₹234' },
    { label: 'Amount Saved', value: '₹267', icon: TrendingUp, color: 'bg-emerald-500', change: '+₹45' },
    { label: 'Upcoming Trips', value: '3', icon: Calendar, color: 'bg-orange-500', change: '+2' },
    { label: 'Favorite Routes', value: '5', icon: MapPin, color: 'bg-indigo-500', change: '+1' }
  ];

  if (showProfile) {
    return <Profile userData={userData} onBack={() => setShowProfile(false)} onLogout={onLogout} />;
  }

  return (
    <div className="customer-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">🚛 NeuroFleet Dashboard</h1>
            <p className="welcome-text">
              Welcome back, <span className="username">{username}</span> (Customer)
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
          <h2 className="section-title">Customer Dashboard</h2>
          <p className="section-subtitle">
            Track your bookings, trips, and savings
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
                      <span className="change-label">vs last month</span>
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
              <span className="action-label">New Booking</span>
            </button>
            <button className="action-btn">
              <Calendar className="action-icon text-green-600" />
              <span className="action-label">My Trips</span>
            </button>
            <button className="action-btn">
              <MapPin className="action-icon text-purple-600" />
              <span className="action-label">Track Order</span>
            </button>
            <button className="action-btn">
              <DollarSign className="action-icon text-orange-600" />
              <span className="action-label">Payment</span>
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default CustomerDashboard;