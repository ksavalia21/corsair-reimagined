import React, { Component } from 'react';
import { useCart } from '../context/CartContext';

// Wrapper function component to use the cart hook
function ProductModalWrapper(props) {
  const { addToCart } = useCart();
  return <ProductModalClass {...props} addToCart={addToCart} />;
}

class ProductModalClass extends Component {
  state = {
    quantity: 1
  };

  updateQuantity = (delta) => {
    this.setState(prev => ({
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    this.setState({ quantity: Math.max(1, value) });
  };

  handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { product, addToCart, onClose } = this.props;
    
    // Add to cart the number of times specified by quantity
    for (let i = 0; i < this.state.quantity; i++) {
      addToCart(product);
    }
    
    // Reset quantity and close modal
    this.setState({ quantity: 1 });
    onClose();
  };

  handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { product, onClose } = this.props;
    const { quantity } = this.state;

    if (!product) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        onClick={this.handleBackdropClick}
      >
        <div className="bg-[#1A1A1A] w-full max-w-4xl rounded-lg overflow-hidden relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{product.name}</h2>
              <p className="text-gray-400 mb-6">{product.description}</p>
              <div className="text-[#ECE81A] text-2xl font-bold mb-6">
                ${product.price}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => this.updateQuantity(-1)}
                    className="w-8 h-8 flex items-center justify-center text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={this.handleQuantityChange}
                    className="w-16 bg-white/5 border border-white/20 rounded-lg text-center text-white px-2 py-1"
                  />
                  <button
                    onClick={() => this.updateQuantity(1)}
                    className="w-8 h-8 flex items-center justify-center text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={this.handleAddToCart}
                className="w-full bg-[#ECE81A] text-black py-3 rounded-lg font-medium hover:bg-[#d4cb19] transition-colors mb-6"
              >
                Add to Cart
              </button>

              {/* Additional Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/60">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Shipping
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductModalWrapper; 