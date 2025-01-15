import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove 
} from 'firebase/firestore';

const CartContext = createContext();
const db = getFirestore();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
      
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.product.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];

    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.productId);

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.productId
          ? { ...item, quantity: Math.max(0, action.quantity) }
          : item
      ).filter(item => item.quantity > 0);

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    updateCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Load cart when user changes
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          // User is logged in, load cart from Firebase
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);
          
          if (cartDoc.exists() && cartDoc.data().items) {
            // Load existing cart items
            setCart(cartDoc.data().items);
          } else {
            // Check for guest cart to merge
            const guestCart = localStorage.getItem('guestCart');
            if (guestCart) {
              const parsedCart = JSON.parse(guestCart);
              await setDoc(cartRef, { 
                items: parsedCart,
                userId: user.uid,
                updatedAt: new Date().toISOString()
              });
              setCart(parsedCart);
              localStorage.removeItem('guestCart');
            }
          }
        } else {
          // User is logged out, load from localStorage
          const savedCart = localStorage.getItem('guestCart');
          if (savedCart) {
            setCart(JSON.parse(savedCart));
          } else {
            setCart([]);
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
      setLoading(false);
    };

    loadCart();
  }, [user]);

  // Save cart changes to Firebase immediately when cart changes
  useEffect(() => {
    const saveCart = async () => {
      if (!loading && user && cart) {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartDoc = await getDoc(cartRef);
          
          // Only update if the cart has changed
          if (!cartDoc.exists() || JSON.stringify(cartDoc.data().items) !== JSON.stringify(cart)) {
            await setDoc(cartRef, { 
              items: cart,
              userId: user.uid,
              updatedAt: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error('Error saving cart to Firebase:', error);
        }
      }
    };

    saveCart();
  }, [cart, user, loading]);

  const addToCart = async (product) => {
    try {
      const newCart = [...cart, { ...product, quantity: 1 }];
      updateCart(newCart);
      showToast(`${product.name} added to cart`);
      
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { 
          items: newCart,
          userId: user.uid,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const mergeGuestCart = async () => {
    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        const userCartDoc = await getDoc(cartRef);
        const userCart = userCartDoc.exists() ? userCartDoc.data().items : [];
        
        // Get guest cart
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        
        if (guestCart.length > 0) {
          // Merge guest cart with existing Firebase cart
          const mergedCart = [...userCart];
          
          // Add guest items or update quantities if item already exists
          guestCart.forEach(guestItem => {
            const existingItemIndex = mergedCart.findIndex(item => item.id === guestItem.id);
            if (existingItemIndex > -1) {
              mergedCart[existingItemIndex].quantity += guestItem.quantity;
            } else {
              mergedCart.push(guestItem);
            }
          });

          // Save merged cart to Firebase
          await setDoc(cartRef, {
            items: mergedCart,
            userId: user.uid,
            updatedAt: new Date().toISOString()
          });

          // Update local state
          setCart(mergedCart);
          
          // Clear guest cart
          localStorage.removeItem('guestCart');
        } else {
          // If no guest cart, just load the existing Firebase cart
          setCart(userCart);
        }
      } catch (error) {
        console.error('Error merging guest cart:', error);
      }
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateCart,
        toast,
        loading,
        mergeGuestCart,
        clearCart
      }}
    >
      {children}
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-[#ECE81A] text-black px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {toast.message}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 