import React, { Component } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

// Wrapper function to use the cart hook
function FeaturedProductsWrapper(props) {
  const { addToCart } = useCart();
  return <FeaturedProductsClass {...props} addToCart={addToCart} />;
}

class FeaturedProductsClass extends Component {
  state = {
    selectedProduct: null,
    isModalOpen: false
  };

  handleProductClick = (product) => {
    this.setState({ 
      selectedProduct: product,
      isModalOpen: true
    });
  };

  handleCloseModal = () => {
    this.setState({ 
      selectedProduct: null,
      isModalOpen: false
    });
  };

  handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent modal from opening when clicking add to cart
    this.props.addToCart(product);
  };

  render() {
    const products = [
        {
          "id": 3,
          "name": "K55 CORE RGB Gaming Keyboard",
          "category": "Gaming Keyboards",
          "price": 39.99,
          "image": "./products/product3.png ",
          "description": "The K55 CORE RGB Gaming Keyboard offers dynamic RGB backlighting, six programmable macro keys, and dedicated media controls for an enhanced gaming experience."
        },
        {
          "id": 8,
          "name": "iCUE H150i ELITE CAPELLIX Liquid CPU Cooler",
          "category": "Cooling",
          "price": 189.99,
          "image": "./products/product8.png",
          "description": "The iCUE H150i ELITE CAPELLIX delivers powerful, low-noise cooling for your CPU, with dynamic RGB lighting and a 360mm radiator."
        },
        {
          "id": 9,
          "name": "iCUE LINK TITAN 360 RX RGB AIO Liquid CPU Cooler",
          "category": "Cooling",
          "price": 169.99,
          "image": "./products/product9.png",
          "description": "The iCUE LINK TITAN 360 RX RGB AIO Liquid CPU Cooler offers efficient cooling performance with vibrant RGB lighting and a user-friendly installation process."
        },
        {
          "id": 10,
          "name": "Vengeance RGB PRO 16GB (2 x 8GB) DDR4 3200MHz C16 Desktop Memory",
          "category": "Memory",
          "price": 94.99,
          "image": "./products/product10.png",
          "description": "CORSAIR Vengeance RGB PRO Series DDR4 memory lights up your PC with mesmerizing dynamic multi-zone RGB lighting while delivering the best in DDR4 performance and stability."
        },
        {
          "id": 11,
          "name": "VENGEANCE RGB DDR5 Memory",
          "category": "Memory",
          "price": 129.99,
          "image": "./products/product11.png",
          "description": "The VENGEANCE RGB DDR5 Memory delivers higher frequencies and greater capacities, optimized for Intel® and AMD motherboards, with dynamic RGB lighting."
        },
    ];

    // Duplicate products for seamless loop
    const duplicatedProducts = [...products, ...products];

    return (
      <>
        <div className="relative overflow-hidden h-[500px] flex items-center">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10"></div>

          {/* Manual Scroll Container */}
          <div className="relative overflow-x-auto no-scrollbar">
            <div className="flex animate-scroll-fast hover:pause">
              {duplicatedProducts.map((product, index) => (
                <div 
                  key={index}
                  className="flex-none w-[400px] h-[400px] mx-4 group cursor-pointer"
                  onClick={() => this.handleProductClick(product)}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 h-full transition-transform duration-300 transform group-hover:scale-105">
                    <div className="relative h-[50%] mb-4 overflow-hidden rounded-xl">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">${product.price}</span>
                      <button 
                        className="bg-transparent border-2 border-[#ECE81A] text-[#ECE81A] px-4 py-1.5 rounded-lg font-medium hover:bg-[#ECE81A] hover:text-black transition-colors"
                        onClick={(e) => this.handleAddToCart(e, product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Modal */}
        <ProductModal 
          product={this.state.selectedProduct}
          onClose={this.handleCloseModal}
        />
      </>
    );
  }
}

export default FeaturedProductsWrapper; 