import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileSection = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // Auto-dismiss success message after 3 seconds
  useEffect(() => {
    if (message.type === 'success') {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);

      // Cleanup timer on component unmount or when message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateUserProfile(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to update profile. Please try again.' 
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Personal Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-[#ECE81A] hover:text-[#d4cb19] transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white">
            Full Name
          </label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) =>
              setFormData({ ...formData, displayName: e.target.value })
            }
            disabled={!isEditing}
            className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white opacity-50"
          />
          <p className="mt-1 text-sm text-gray-400">
            Email cannot be changed for security reasons.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            disabled={!isEditing}
            className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        {isEditing && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ECE81A] text-black py-3 rounded-lg font-medium hover:bg-[#d4cb19] transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileSection; 