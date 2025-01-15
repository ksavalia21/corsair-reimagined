import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from '../firebase/config';
import { 
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

const AuthContext = createContext();
const db = getFirestore();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, {
        displayName: displayName
      });

      // Create initial user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        displayName: displayName,
        email: email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        addresses: []
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          
          setUser({
            ...currentUser,
            ...userData
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserPassword = async (currentPassword, newPassword) => {
    if (!auth.currentUser) throw new Error('No user logged in');
    
    try {
      // Create credential with current password
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      
      // Reauthenticate user
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update password
      await updatePassword(auth.currentUser, newPassword);
      
      return true;
    } catch (error) {
      console.error('Error in updateUserPassword:', error);
      throw error;
    }
  };

  const updateUserProfile = async (userData) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      // Update displayName in Auth
      await updateProfile(auth.currentUser, {
        displayName: userData.displayName
      });

      // Update user data in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        displayName: userData.displayName,
        phoneNumber: userData.phoneNumber,
        email: user.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Update local user state
      setUser(prev => ({
        ...prev,
        displayName: userData.displayName,
        phoneNumber: userData.phoneNumber
      }));

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const addUserAddress = async (address) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        addresses: arrayUnion({ ...address, id: Date.now() })
      });
      return true;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  const deleteUserAddress = async (addressId) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const addresses = userDoc.data()?.addresses || [];
      const addressToRemove = addresses.find(addr => addr.id === addressId);
      
      if (addressToRemove) {
        await updateDoc(userRef, {
          addresses: arrayRemove(addressToRemove)
        });
      }
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  };

  const getUserData = async () => {
    if (!user) return null;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      return userDoc.data();
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const value = {
    user,
    signup,
    login,
    logout,
    updateUserProfile,
    updateUserPassword,
    addUserAddress,
    deleteUserAddress,
    getUserData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 