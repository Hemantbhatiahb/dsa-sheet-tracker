// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { Layout, Typography, Card } from 'antd';
import MainNavigation from '../components/MainNavigation';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
  const {user} = useSelector(state => state.users)


  return (
    <Layout className="layout">
      <Content className="profile-content">
        <div className="profile-container">
          <Card className="profile-card">
            <Title level={2}>Welcome</Title>
            <Text>Email: {user?.email || 'N/A'}</Text>
          </Card>
        </div>
      </Content>
      
    </Layout>
  );
};

export default Profile;