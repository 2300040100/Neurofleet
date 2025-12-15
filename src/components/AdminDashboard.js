import React, { useState } from 'react';
import { BarChart3, Users, Truck, Package, TrendingUp, DollarSign, User } from 'lucide-react';
import Profile from './Profile';
import './AdminDashboard.css';

const AdminDashboard = ({ userData, onLogout }) => {
  const { username } = userData;
  const [showProfile, setShowProfile] = useState(false);

  const metrics = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Total Fleets', value: '156', icon: Truck, color: 'bg-green-500', change: '+8%' },
    { label: 'Total Bookings', value: '8,432', icon: Package, color: 'bg-purple-500', change: '+23%' },
    { label: 'Active Users', value: '1,456', icon: TrendingUp, color: 'bg-orange-500', change: '+5%' },
    { label: 'Completed Trips', value: '7,891', icon: BarChart3, color: 'bg-indigo-500', change: '+18%' },
    { label: 'Total Revenue', value: '₹2,84,750', icon: DollarSign, color: 'bg-emerald-500', change: '+15%' }
  ];

  if (showProfile) {
    return <Profile userData={userData} onBack={() => setShowProfile(false)} onLogout={onLogout} />;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">🚛 NeuroFleet Dashboard</h1>
            <p className="welcome-text">
              Welcome back, <span className="username">{username}</span> (Admin)
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
          <h2 className="section-title">Admin Dashboard</h2>
          <p className="section-subtitle">
            Overview of your key metrics and performance indicators
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

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3 className="section-title-small">Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <Users className="action-icon text-indigo-600" />
              <span className="action-label">Manage Users</span>
            </button>
            <button className="action-btn">
              <Truck className="action-icon text-green-600" />
              <span className="action-label">Add Fleet</span>
            </button>
            <button className="action-btn">
              <BarChart3 className="action-icon text-purple-600" />
              <span className="action-label">View Reports</span>
            </button>
            <button className="action-btn">
              <DollarSign className="action-icon text-orange-600" />
              <span className="action-label">Revenue</span>
            </button>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default AdminDashboard;