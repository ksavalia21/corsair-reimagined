import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AddressSection = () => {
  const { user, addUserAddress, deleteUserAddress, getUserData } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });

  // Load addresses when component mounts
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const userData = await getUserData();
        setAddresses(userData?.addresses || []);
      } catch (error) {
        console.error('Error loading addresses:', error);
      }
    };
    loadAddresses();
  }, [getUserData]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addUserAddress(newAddress);
      const userData = await getUserData();
      setAddresses(userData?.addresses || []);
      setMessage({ type: 'success', text: 'Address added successfully!' });
      setIsAddingNew(false);
      setNewAddress({
        name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isDefault: false
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add address. Please try again.' });
    }
    setLoading(false);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteUserAddress(addressId);
      const userData = await getUserData();
      setAddresses(userData?.addresses || []);
      setMessage({ type: 'success', text: 'Address deleted successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete address. Please try again.' });
    }
  };

  // Add this effect in the AddressSection component
  useEffect(() => {
    if (message.type === 'success') {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Shipping Addresses</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="text-[#ECE81A] hover:text-[#d4cb19] transition-colors"
        >
          Add New Address
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

      {/* Address List */}
      <div className="grid gap-4">
        {addresses.map(address => (
          <div
            key={address.id}
            className="p-4 border border-white/10 rounded-lg bg-white/5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white">{address.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {address.street}<br />
                  {address.city}, {address.state} {address.zipCode}<br />
                  {address.country}
                </p>
              </div>
              <div className="space-x-2">
                <button 
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Form */}
      {isAddingNew && (
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Recipient Name
              </label>
              <input
                type="text"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Street Address
              </label>
              <input
                type="text"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                City
              </label>
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                State
              </label>
              <input
                type="text"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                ZIP Code
              </label>
              <input
                type="text"
                value={newAddress.zipCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipCode: e.target.value })
                }
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Country
              </label>
              <input
                type="text"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                setMessage({ type: '', text: '' });
              }}
              className="px-4 py-2 text-white hover:text-[#ECE81A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#ECE81A] text-black rounded-lg hover:bg-[#d4cb19] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressSection; 