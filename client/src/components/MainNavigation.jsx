import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './MainNavigation.css';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const MainNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <Header className="main-header">
      <div className="logo">
        <Link to="/profile">Dashboard</Link>
      </div>
      <div className="nav-menu">
        <Link 
          to="/profile" 
          className={`nav-item ${currentPath === '/profile' ? 'active' : ''}`}
        >
          Profile
        </Link>
        <Link 
          to="/topics" 
          className={`nav-item ${currentPath === '/topics' ? 'active' : ''}`}
        >
          Topics
        </Link>
        <Link 
          to="/progress" 
          className={`nav-item ${currentPath === '/progress' ? 'active' : ''}`}
        >
          Progress
        </Link>
        <Button type="primary" onClick={handleLogout} className="logout-btn">
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default MainNavigation;