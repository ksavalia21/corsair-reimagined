import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: {
      marketing: true,
      orderUpdates: true,
      productUpdates: false,
      newsletter: true
    },
    pushNotifications: {
      orderStatus: true,
      promotions: false,
      reminders: true
    },
    appearance: 'dark',
    language: 'en'
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleToggle = (category, setting) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically save to your backend
      setMessage({
        type: 'success',
        text: 'Preferences updated successfully!'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update preferences. Please try again.'
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Preferences</h2>
        <p className="mt-1 text-sm text-gray-400">
          Manage your notification preferences and account settings
        </p>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-500'
              : 'bg-red-500/10 border border-red-500/20 text-red-500'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Email Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Email Notifications</h3>
        <div className="space-y-4 bg-white/5 rounded-lg p-4">
          {Object.entries(preferences.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-400">
                  {getNotificationDescription('email', key)}
                </p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications', key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-[#ECE81A]' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Push Notifications</h3>
        <div className="space-y-4 bg-white/5 rounded-lg p-4">
          {Object.entries(preferences.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-400">
                  {getNotificationDescription('push', key)}
                </p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications', key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-[#ECE81A]' : 'bg-white/10'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Language Preference */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Language & Region</h3>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) =>
                  setPreferences({ ...preferences, language: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Theme
              </label>
              <select
                value={preferences.appearance}
                onChange={(e) =>
                  setPreferences({ ...preferences, appearance: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button
          onClick={handleSave}
          className="w-full bg-[#ECE81A] text-black py-3 rounded-lg font-medium hover:bg-[#d4cb19] transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

// Helper function to get notification descriptions
const getNotificationDescription = (type, key) => {
  const descriptions = {
    email: {
      marketing: 'Receive emails about new products and special offers',
      orderUpdates: 'Get notifications about your order status',
      productUpdates: 'Updates about products you have purchased',
      newsletter: 'Weekly newsletter with trending products and deals'
    },
    push: {
      orderStatus: 'Real-time updates about your orders',
      promotions: 'Instant notifications about deals and promotions',
      reminders: 'Reminders about items in your cart and wishlist'
    }
  };
  return descriptions[type][key];
};

export default PreferencesSection; 