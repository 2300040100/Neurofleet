import React, { useState } from 'react';
import AuthenticationModule from './components/AuthenticationModule';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import HomePage from './components/HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'dashboard', 'profile'

  const handleLoginSuccess = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setCurrentPage('home');
  };

  const navigateToProfile = () => {
    setCurrentPage('profile');
  };

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <HomePage 
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToSignup={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'login' && !isLoggedIn && (
        <AuthenticationModule onLoginSuccess={handleLoginSuccess} />
      )}

      {currentPage === 'dashboard' && isLoggedIn && (
        <Dashboard 
          userData={userData} 
          onLogout={handleLogout}
          onNavigateToProfile={navigateToProfile}
        />
      )}

      {currentPage === 'profile' && isLoggedIn && (
        <Profile 
          userData={userData} 
          onLogout={handleLogout}
          onBack={navigateToDashboard}
        />
      )}
    </div>
  );
}

export default App;