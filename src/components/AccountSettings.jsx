import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileSection from './account/ProfileSection';
import AddressSection from './account/AddressSection';
import SecuritySection from './account/SecuritySection';
import PreferencesSection from './account/PreferencesSection';
import Navbar from './Navbar';

const AccountSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'addresses', label: 'Addresses', icon: '📍' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'addresses':
        return <AddressSection />;
      case 'security':
        return <SecuritySection />;
      case 'preferences':
        return <PreferencesSection />;
      default:
        return <ProfileSection />;
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20 max-w-6xl">
        <h1 className="text-2xl font-bold text-white mb-8">Account Settings</h1>

        {/* Tabs moved to top */}
        <div className="bg-white/5 rounded-lg p-6 mb-6">
          <nav className="flex space-x-4 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#ECE81A] text-black font-medium'
                    : 'text-white hover:text-[#ECE81A]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Content Section */}
          <div className="w-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings; 