import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { handleLogout } = useCart();
  const navigate = useNavigate();
  const menuRef = useRef();

  // Get the first letter of the name or email for the avatar
  const getInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || '?';
  };

  // Updated getDisplayName method to capitalize the name
  const getDisplayName = () => {
    if (user?.displayName) {
      // Split the name into words and capitalize each word
      return user.displayName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    // If no display name, capitalize the email username
    return user?.email?.split('@')[0].charAt(0).toUpperCase() + 
           user?.email?.split('@')[0].slice(1) || 'User';
  };

  const handleLogoutClick = async () => {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      try {
        await logout();
        handleLogout();
        toast.success('Successfully logged out!');
        navigate('/');
      } catch (error) {
        console.error('Failed to log out:', error);
        toast.error('Failed to log out');
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mr-8" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-[#ECE81A] transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[#ECE81A] flex items-center justify-center text-black font-medium">
          {getInitial()}
        </div>
        <span className="hidden md:block font-medium">
          {getDisplayName()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-sm text-white font-medium">{user?.displayName}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          
          <button
            onClick={() => {
              navigate('/account');
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors"
          >
            Account Settings
          </button>
          
          <button
            onClick={() => {
              navigate('/orders');
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors"
          >
            Orders
          </button>
          
          <button
            onClick={handleLogoutClick}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-white/5 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 