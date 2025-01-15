import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading } = useCart();
  const { user, updateUserProfile, getUserData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [showCouponList, setShowCouponList] = useState(false);
  const [couponError, setCouponError] = useState(null);

  const availableCoupons = [
    { code: 'SAVE10', description: '10% off orders above $250' },
    { code: 'SAVE20', description: '20% off orders above $500' }
  ];

  const calculateDiscount = (total) => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === 'SAVE20' && total >= 500) {
      return total * 0.2;
    }
    if (appliedCoupon === 'SAVE10' && total >= 250) {
      return total * 0.1;
    }
    return 0;
  };

  const handleApplyCoupon = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal + (subtotal * 0.3); // Including tax
    
    if (couponCode === 'SAVE20' && total >= 500) {
      setAppliedCoupon('SAVE20');
      setCouponError(null);
      toast.success('20% discount applied! 🎉');
    } else if (couponCode === 'SAVE10' && total >= 250) {
      setAppliedCoupon('SAVE10');
      setCouponError(null);
      toast.success('10% discount applied! 🎉');
    } else {
      let errorMessage = 'Invalid coupon code';
      if (couponCode === 'SAVE10' && total < 250) {
        errorMessage = 'Minimum order value of $250 (including tax) required for SAVE10';
      } else if (couponCode === 'SAVE20' && total < 500) {
        errorMessage = 'Minimum order value of $500 (including tax) required for SAVE20';
      }
      setCouponError(errorMessage);
      setTimeout(() => setCouponError(null), 3000);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Coupon removed');
  };

  // Load user data and addresses
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const userData = await getUserData();
        setSavedAddresses(userData?.addresses || []);
        // Select the first address by default if available
        if (userData?.addresses?.[0]) {
          setSelectedAddress(userData.addresses[0]);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    setProcessingPayment(true);

    try {
      // Calculate final amounts
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const tax = subtotal * 0.30;
      const total = subtotal + tax;
      const discount = calculateDiscount(total);
      const finalTotal = total - discount;

      // Create order object with null check for phone number
      const orderData = {
        userId: user.uid,
        items: cart,
        address: selectedAddress,
        status: 'processing',
        paymentStatus: 'paid',
        orderDate: new Date().toISOString(),
        subtotal,
        tax,
        discount,
        total: finalTotal,
        couponApplied: appliedCoupon || null,
        deliveryInstructions: deliveryInstructions || '',
        phoneNumber: selectedAddress.phoneNumber || '', // Add default empty string if undefined
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      // Create order in Firebase
      const orderRef = doc(db, 'orders', `${user.uid}_${Date.now()}`);
      await setDoc(orderRef, orderData);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessingPayment(false);
      setShowSuccessAnimation(true);

      // Wait for animation and redirect
      setTimeout(() => {
        clearCart();
        navigate('/orders');
      }, 2000);

    } catch (error) {
      console.error('Error placing order:', error);
      setProcessingPayment(false);
      toast.error('Failed to place order. Please try again.');
    }
  };

  // Replace the shipping information form with this address selection section
  const renderShippingSection = () => (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Shipping Information</h2>
      
      {savedAddresses.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-400 mb-4">No addresses saved in your account</p>
          <Link 
            to="/account?tab=addresses" 
            className="text-[#ECE81A] hover:text-[#d4cb19] transition-colors"
          >
            Add a new address in your account settings →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedAddresses.map((address) => (
            <div
              key={address.id}
              onClick={() => setSelectedAddress(address)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAddress?.id === address.id
                  ? 'border-[#ECE81A] bg-[#ECE81A]/10'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-medium">{address.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zipCode}<br />
                    {address.country}
                  </p>
                  {address.phoneNumber && (
                    <p className="text-gray-400 text-sm mt-1">
                      Phone: {address.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedAddress?.id === address.id}
                    onChange={() => setSelectedAddress(address)}
                    className="text-[#ECE81A] focus:ring-[#ECE81A]"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Link 
            to="/account?tab=addresses" 
            className="inline-block text-[#ECE81A] hover:text-[#d4cb19] transition-colors mt-2"
          >
            Manage addresses →
          </Link>
        </div>
      )}
    </div>
  );

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.30; // 30% tax
  const total = subtotal + tax;
  const discount = calculateDiscount(total);
  const finalTotal = total - discount;

  if (!user) {
    navigate('/signup');
    return null;
  }

  if (loading || cartLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ECE81A]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Cart Items */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-white/10">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-[#ECE81A]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="border-t border-white/10 pt-4 mb-4">
                <h3 className="text-lg font-medium text-white mb-3">Apply Coupon</h3>
                <div className="flex gap-3 mb-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-2 bg-[#ECE81A] text-black rounded-lg font-medium hover:bg-[#d4cb19] transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <button
                  onClick={() => setShowCouponList(!showCouponList)}
                  className="text-[#ECE81A] text-sm hover:text-[#d4cb19] transition-colors"
                >
                  {showCouponList ? 'Hide available coupons' : 'Browse available coupons'}
                </button>

                {showCouponList && (
                  <div className="mt-3 space-y-2">
                    {availableCoupons.map(coupon => (
                      <div
                        key={coupon.code}
                        className="bg-white/5 p-3 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="text-white font-medium">{coupon.code}</p>
                          <p className="text-sm text-gray-400">{coupon.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            setCouponCode(coupon.code);
                            setShowCouponList(false);
                          }}
                          className="text-[#ECE81A] hover:text-[#d4cb19] transition-colors"
                        >
                          Use
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {appliedCoupon && (
                  <div className="mt-3 flex justify-between items-center bg-green-500/10 text-green-500 p-3 rounded-lg">
                    <span>Coupon applied: {appliedCoupon}</span>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <div className="mt-3 flex justify-between items-center bg-red-500/10 text-red-500 p-3 rounded-lg animate-fadeIn">
                    <span>{couponError}</span>
                  </div>
                )}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (30%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount (applied to total)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-white text-lg font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#ECE81A]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Shipping & Payment */}
          <div className="space-y-6">
            {renderShippingSection()}
            
            {/* Payment Information */}
            {savedAddresses.length > 0 && (
              <div className="bg-white/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg">
                    <input
                      type="radio"
                      name="payment"
                      id="card"
                      className="text-[#ECE81A] focus:ring-[#ECE81A]"
                      checked
                      readOnly
                    />
                    <label htmlFor="card" className="flex items-center gap-2 text-white">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Credit Card
                    </label>
                  </div>
                  
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={processingPayment}
                    className="w-full bg-[#ECE81A] text-black py-4 rounded-lg font-medium hover:bg-[#d4cb19] transition-colors disabled:opacity-50"
                  >
                    {processingPayment ? 'Processing...' : `Place Order ($${finalTotal.toFixed(2)})`}
                  </button>
                  
                  <p className="text-center text-sm text-gray-400">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Processing Overlay */}
      {(processingPayment || showSuccessAnimation) && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="fixed inset-0 bg-black/80"></div>
          <div className="relative z-10">
            {processingPayment ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-[#ECE81A] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-xl">Processing payment...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-scaleIn">
                  <svg 
                    className="w-12 h-12 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <div className="animate-fadeIn">
                  <p className="text-white text-xl font-medium text-center">Payment Successful!</p>
                  <p className="text-gray-400 text-center mt-2">Thank you for shopping with us</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout; 