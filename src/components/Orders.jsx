import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import Navbar from './Navbar';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editingInstructions, setEditingInstructions] = useState({});

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(ordersData.sort((a, b) => 
            new Date(b.orderDate) - new Date(a.orderDate)
          ));
        } catch (error) {
          console.error('Error loading orders:', error);
        }
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: 'cancelled',
        cancelledAt: new Date().toISOString()
      });
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled', cancelledAt: new Date().toISOString() }
          : order
      ));
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleUpdateInstructions = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        deliveryInstructions: editingInstructions[orderId]
      });
      
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, deliveryInstructions: editingInstructions[orderId] }
          : order
      ));
      
      toast.success('Delivery instructions updated');
    } catch (error) {
      console.error('Error updating instructions:', error);
      toast.error('Failed to update instructions');
    }
  };

  const generateInvoice = (order) => {
    // Implement PDF generation logic here
    console.log('Generating invoice for order:', order.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ECE81A]"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20 max-w-6xl">
        <h1 className="text-2xl font-bold text-white mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white/5 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-medium">
                      Order #{order.id.slice(-8)}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                      order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <button
                      onClick={() => generateInvoice(order)}
                      className="text-[#ECE81A] hover:text-[#d4cb19] transition-colors"
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-gray-400 text-sm">
                          Quantity: {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Shipping Address</h4>
                    <p className="text-gray-400 text-sm">
                      {order.address.name}<br />
                      {order.address.street}<br />
                      {order.address.city}, {order.address.state} {order.address.zipCode}<br />
                      {order.address.country}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Payment Info</h4>
                    <p className="text-gray-400 text-sm">
                      Status: <span className="text-green-500">Paid</span><br />
                      Method: Credit Card<br />
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Delivery Instructions</h4>
                    <div className="space-y-2">
                      <textarea
                        value={editingInstructions[order.id] ?? order.deliveryInstructions ?? ''}
                        onChange={(e) => setEditingInstructions({
                          ...editingInstructions,
                          [order.id]: e.target.value
                        })}
                        placeholder="Add delivery instructions..."
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent"
                        rows="3"
                      />
                      <button
                        onClick={() => handleUpdateInstructions(order.id)}
                        className="px-4 py-2 bg-[#ECE81A] text-black rounded-lg"
                      >
                        Update Instructions
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                  {order.status === 'processing' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-4 py-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => window.location.href = `mailto:support@example.com?subject=Order%20${order.id}`}
                    className="px-4 py-2 text-[#ECE81A] hover:text-[#d4cb19] transition-colors"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders; 