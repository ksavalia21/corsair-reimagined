import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, loading } = useCart();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ECE81A]"></div>
      </div>
    );
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
        <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4">
        {cart.map(item => (
          <div 
            key={item.id}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="flex gap-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.name}</h3>
                
                {/* Price Information */}
                <div className="mt-1 space-y-1">
                  <p className="text-gray-400 text-sm">
                    Unit price: <span className="text-[#ECE81A]">${item.price.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    Total: <span className="text-[#ECE81A] font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => handleQuantityDecrease(item)}
                    disabled={item.quantity <= 1}
                    className={`w-8 h-8 flex items-center justify-center text-white border border-white/20 rounded-lg transition-colors
                      ${item.quantity <= 1 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white/10'
                      }`}
                  >
                    -
                  </button>
                  <span className="text-white min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-red-500 text-sm hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white">Subtotal</span>
          <span className="text-white font-bold">${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-sm text-white/60">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-white text-lg">Total</span>
          <span className="text-[#ECE81A] text-lg font-bold">${calculateTotal().toFixed(2)}</span>
        </div>
        <button 
          className="w-full bg-[#ECE81A] text-black py-3 rounded-lg font-medium hover:bg-[#d4cb19] transition-colors"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
