import React from 'react';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import DriverDashboard from './DriverDashboard';
import CustomerDashboard from './CustomerDashboard';

const Dashboard = ({ userData, onLogout }) => {
  const { userType } = userData;

  // Route to the appropriate dashboard based on user type
  switch (userType) {
    case 'Admin':
      return <AdminDashboard userData={userData} onLogout={onLogout} />;
    case 'Manager':
      return <ManagerDashboard userData={userData} onLogout={onLogout} />;
    case 'Driver':
      return <DriverDashboard userData={userData} onLogout={onLogout} />;
    case 'Customer':
      return <CustomerDashboard userData={userData} onLogout={onLogout} />;
    default:
      return <AdminDashboard userData={userData} onLogout={onLogout} />;
  }
};

export default Dashboard;