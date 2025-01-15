import React, { Component } from 'react';
import Navbar from './Navbar';
import ProductModal from './ProductModal';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

// Create a wrapper function component to use the hook
function ProductsWrapper(props) {
  const { cart, addToCart } = useCart();
  const location = useLocation();
  return <ProductsClass {...props} cart={cart} addToCart={addToCart} location={location} />;
}

// Rename the class component to ProductsClass
class ProductsClass extends Component {
  state = {
    activeCategory: 'all',
    selectedProduct: null,
    priceRange: {
      min: 0,
      max: 1000
    },
    sortOrder: 'default',
    isFilterOpen: false,
    searchQuery: '',
    isSearchFocused: false
  };

  // Categories from your Categories.jsx
  categories = [
    {
      title: 'Gaming Keyboards',
      description: 'Professional grade mechanical keyboards',
      image: '/keyboards.jpg'
    },
    {
      title: 'Gaming Mice',
      description: 'Precision engineered for victory',
      image: '/mice.jpg'
    },
    {
      title: 'Headsets',
      description: 'Immersive audio experience',
      image: '/headsets.jpg'
    },
    {
      title: 'Cooling',
      description: 'Advanced thermal solutions',
      image: '/cooling.jpg'
    },
    {
      title: 'Memory',
      description: 'High-performance RAM modules',
      image: '/memory.jpg'
    },
    {
      title: 'Power Supply',
      description: 'Reliable and efficient power delivery',
      image: '/psu.jpg'
    },
    {
      title: 'PC Cases',
      description: 'Stylish and functional enclosures',
      image: '/cases.jpg'
    },
    {
      title: 'Gaming Monitors',
      description: 'Ultra-smooth high refresh displays',
      image: '/monitors.jpg'
    }
  ];

  // Products data
  products = [
    {
        "id": 1,
        "name": "K100 RGB Optical-Mechanical Gaming Keyboard",
        "category": "Gaming Keyboards",
        "price": 229.99,
        "image": "./products/product1.png",
        "description": "The incomparable CORSAIR K100 RGB Optical-Mechanical Gaming Keyboard combines the latest innovations in mechanical gaming keyboard switch technology.",
        "tag": "New"
      },
      {
        "id": 2,
        "name": "K65 Plus Wireless Gaming Keyboard",
        "category": "Gaming Keyboards",
        "price": 179.95,
        "image": "./products/product2.png",
        "description": "The K65 Plus wireless keyboard features a 75% tenkeyless design with pre-lubricated CORSAIR MLX Red v2 linear switches and customizable LED lighting.",
        "tag": "Best Seller"
      },
      {
        "id": 3,
        "name": "K55 CORE RGB Gaming Keyboard",
        "category": "Gaming Keyboards",
        "price": 39.99,
        "image": "./products/product3.png ",
        "description": "The K55 CORE RGB Gaming Keyboard offers dynamic RGB backlighting, six programmable macro keys, and dedicated media controls for an enhanced gaming experience.",
        "tag": "Best Seller"
      },
      {
        "id": 4,
        "name": "M75 Wireless Gaming Mouse",
        "category": "Gaming Mice",
        "price": 129.95,
        "image": "./products/product4.png",
        "description": "The M75 wireless gaming mouse features an ambidextrous design, a 26,000 DPI Marksman optical sensor, and customizable settings via iCUE software.",
        "tag": "Best Seller"
      },
      {
        "id": 5,
        "name": "SCIMITAR RGB ELITE Gaming Mouse",
        "category": "Gaming Mice",
        "price": 79.99,
        "image": "./products/product5.png",
        "description": "The SCIMITAR RGB ELITE Gaming Mouse is designed for MMO and MOBA gamers, featuring 17 programmable buttons and a custom 18,000 DPI optical sensor.",
        "tag": "New"
      },
      {
        "id": 6,
        "name": "VOID RGB ELITE Wireless Premium Gaming Headset",
        "category": "Headsets",
        "price": 99.99,
        "image": "./products/product6.png",
        "description": "The VOID RGB ELITE Wireless headset offers exceptional comfort, superior sound quality, and a 40 ft wireless range, making it perfect for long gaming sessions.",
        "tag": "Best Seller"
      },
      {
        "id": 7,
        "name": "HS80 RGB WIRELESS Gaming Headset",
        "category": "Headsets",
        "price": 149.99,
        "image": "./products/product7.png",
        "description": "The HS80 RGB WIRELESS Gaming Headset combines iconic CORSAIR design, superb audio quality, and a durable build for the ultimate gaming experience.",
        "tag": "Best Seller"
      },
      {
        "id": 8,
        "name": "iCUE H150i ELITE CAPELLIX Liquid CPU Cooler",
        "category": "Cooling",
        "price": 189.99,
        "image": "./products/product8.png",
        "description": "The iCUE H150i ELITE CAPELLIX delivers powerful, low-noise cooling for your CPU, with dynamic RGB lighting and a 360mm radiator.",
        "tag": "Best Seller"
      },
      {
        "id": 9,
        "name": "iCUE LINK TITAN 360 RX RGB AIO Liquid CPU Cooler",
        "category": "Cooling",
        "price": 169.99,
        "image": "./products/product9.png",
        "description": "The iCUE LINK TITAN 360 RX RGB AIO Liquid CPU Cooler offers efficient cooling performance with vibrant RGB lighting and a user-friendly installation process.",
        "tag": "Best Seller"
      },
      {
        "id": 10,
        "name": "Vengeance RGB PRO 16GB (2 x 8GB) DDR4 3200MHz C16 Desktop Memory",
        "category": "Memory",
        "price": 94.99,
        "image": "./products/product10.png",
        "description": "CORSAIR Vengeance RGB PRO Series DDR4 memory lights up your PC with mesmerizing dynamic multi-zone RGB lighting while delivering the best in DDR4 performance and stability.",
        "tag": "Best Seller"
      },
      {
        "id": 11,
        "name": "VENGEANCE RGB DDR5 Memory",
        "category": "Memory",
        "price": 129.99,
        "image": "./products/product11.png",
        "description": "The VENGEANCE RGB DDR5 Memory delivers higher frequencies and greater capacities, optimized for Intel® and AMD motherboards, with dynamic RGB lighting.",
        "tag": "Best Seller"
      },
      {
        "id": 12,
        "name": "RM850x 850W 80 PLUS Gold Fully Modular ATX Power Supply",
        "category": "Power Supply",
        "price": 139.99,
        "image": "./products/product12.png",
        "description": "CORSAIR RM850x series power supplies are built with the highest quality components to deliver 80 PLUS Gold efficient power to your PC.",
        "tag": "Best Seller"
      },
      {
        "id": 13,
        "name": "SF750 750W 80 PLUS Platinum Fully Modular SFX Power Supply",
        "category": "Power Supply",
        "price": 179.99,
        "image": "./products/product13.png",
        "description": "The SF750 delivers 750 continuous watts in SFX form, perfect for the most power-dense small-form-factor PCs, with 80 PLUS Platinum efficiency and fully modular cables.",
        "tag": "Best Seller"
      },
      {
        "id": 14,
        "name": "Obsidian Series 500D RGB SE Premium Mid-Tower Case",
        "category": "PC Cases",
        "price": 249.99,
        "image": "./products/product14.png",
        "description": "The Obsidian Series 500D RGB SE is a premium mid-tower case with iconic CORSAIR design, smoked tempered glass panels, and premium aluminum trim.",
        "tag": "Best Seller"
      },
      {
        "id": 15,
        "name": "9000D RGB AIRFLOW Super Full-Tower PC Case",
        "category": "PC Cases",
        "price": 499.99,
        "image": "./products/product15.png",
        "description": "The 9000D RGB AIRFLOW is a super full-tower case with exceptional cooling potential, featuring a high-airflow design and extensive expandability for the most ambitious builds.",
        "tag": "Best Seller"
      },
      {
        "id": 16,
        "name": "XENEON 32QHD165 Gaming Monitor",
        "category": "Gaming Monitors",
        "price": 799.99,
        "image": "./products/product16.png",
        "description": "The CORSAIR XENEON 32QHD165 brings your games and media to life on a vibrant, ultra-slim 32-inch QHD (2560x1440) IPS display with a blazing fast 165Hz refresh rate and 1ms response time.",
        "tag": "Best Seller"
      }
  ];

  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category });
  };

  handleProductClick = (product) => {
    this.setState({ selectedProduct: product });
  };

  handleCloseModal = () => {
    this.setState({ selectedProduct: null });
  };

  handlePriceRangeChange = (e, type) => {
    this.setState(prevState => ({
      priceRange: {
        ...prevState.priceRange,
        [type]: Number(e.target.value)
      }
    }));
  };

  handleSortChange = (sortOrder) => {
    this.setState({ sortOrder });
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  getFilteredProducts = () => {
    let filtered = this.products;

    // Apply search filter
    if (this.state.searchQuery.trim()) {
      const searchTerms = this.state.searchQuery.toLowerCase().split(' ');
      filtered = filtered.filter(product => {
        const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
        
        // Check for exact match
        if (searchableText.includes(this.state.searchQuery.toLowerCase())) {
          return true;
        }

        // Check for keyword matches
        return searchTerms.some(term => 
          searchableText.includes(term) && term.length > 2
        );
      });
    }

    // Apply category filter
    if (this.state.activeCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === this.state.activeCategory
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= this.state.priceRange.min && 
      product.price <= this.state.priceRange.max
    );

    // Apply sorting
    switch (this.state.sortOrder) {
      case 'lowToHigh':
        return filtered.sort((a, b) => a.price - b.price);
      case 'highToLow':
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  };

  toggleFilter = () => {
    this.setState(prevState => ({
      isFilterOpen: !prevState.isFilterOpen
    }));
  };

  handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent the product modal from opening
    console.log('Adding to cart:', product);
    this.props.addToCart(product);
  };

  componentDidMount() {
    const { location } = this.props;
    
    // Check if we're coming from a direct navbar click (no state) or with a category filter
    if (location.state?.selectedCategory) {
      this.setState({ 
        activeCategory: location.state.selectedCategory
      });
    } else {
      // Reset to 'all' if coming from navbar or direct URL
      this.setState({
        activeCategory: 'all'
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    
    // Check if location has changed
    if (location !== prevProps.location) {
      // Reset category if there's no specific category in the new location
      if (!location.state?.selectedCategory) {
        this.setState({
          activeCategory: 'all'
        });
      } else {
        this.setState({
          activeCategory: location.state.selectedCategory
        });
      }
    }
  }

  render() {
    const { addToCart } = this.props;
    const filteredProducts = this.getFilteredProducts();
    const allPrices = this.products.map(p => p.price);
    const maxPrice = Math.max(...allPrices);
    const minPrice = Math.min(...allPrices);

    return (
        <>
        <Navbar />
      <div className="min-h-screen bg-black py-16">
        <div className="container mx-auto px-4 py-16">
          {/* Header with Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
            <h1 className="text-4xl font-bold text-white">Our Products</h1>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={this.state.searchQuery}
                  onChange={this.handleSearch}
                  onFocus={() => this.setState({ isSearchFocused: true })}
                  onBlur={() => this.setState({ isSearchFocused: false })}
                  className="w-full bg-white/10 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ECE81A] transition-all"
                />
                <svg 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    this.state.isSearchFocused ? 'text-[#ECE81A]' : 'text-gray-400'
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
                {this.state.searchQuery && (
                  <button
                    onClick={() => this.setState({ searchQuery: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filter Button */}
              <button
                onClick={this.toggleFilter}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(this.state.searchQuery || this.state.activeCategory !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 text-white/60 mb-8">
              <span>Active:</span>
              <div className="flex flex-wrap items-center gap-2">
                {this.state.searchQuery && (
                  <span className="bg-[#ECE81A]/10 text-[#ECE81A] px-3 py-1 rounded-full text-sm">
                    Search: {this.state.searchQuery}
                  </span>
                )}
                {this.state.activeCategory !== 'all' && (
                  <span className="bg-[#ECE81A]/10 text-[#ECE81A] px-3 py-1 rounded-full text-sm">
                    Category: {this.state.activeCategory}
                  </span>
                )}
                
                {/* Show All Products Button */}
                <button
                  onClick={() => {
                    this.setState({
                      activeCategory: 'all',
                      searchQuery: ''
                    });
                  }}
                  className="bg-[#ECE81A] text-black px-3 py-1 rounded-full text-sm hover:bg-[#d4cb19] transition-colors ml-2"
                >
                  Show All Products
                </button>
              </div>
            </div>
          )}

          {/* Filter Drawer */}
          <div 
            className={`fixed inset-y-0 right-0 w-80 bg-[#1A1A1A] shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
              this.state.isFilterOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Filter Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Filters</h3>
              <button 
                onClick={this.toggleFilter}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
              {/* Categories */}
              <div>
                <h4 className="text-white font-medium mb-4">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => this.handleCategoryChange('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${this.state.activeCategory === 'all'
                        ? 'bg-[#ECE81A] text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    All Products
                  </button>
                  
                  {this.categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => this.handleCategoryChange(category.title)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${this.state.activeCategory === category.title
                          ? 'bg-[#ECE81A] text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-white font-medium mb-4">Price Range</h4>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={this.state.priceRange.min}
                  onChange={(e) => this.handlePriceRangeChange(e, 'min')}
                  className="w-full accent-[#ECE81A] cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>${this.state.priceRange.min}</span>
                  <span>${maxPrice}</span>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="text-white font-medium mb-4">Sort By</h4>
                <div className="space-y-2">
                  {['default', 'lowToHigh', 'highToLow'].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => this.handleSortChange(sort)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${this.state.sortOrder === sort
                          ? 'bg-[#ECE81A] text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                      {sort === 'default' && 'Featured'}
                      {sort === 'lowToHigh' && 'Price: Low to High'}
                      {sort === 'highToLow' && 'Price: High to Low'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#1A1A1A] border-t border-white/10">
              <button
                onClick={this.toggleFilter}
                className="w-full bg-[#ECE81A] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#d4cb19] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Backdrop */}
          {this.state.isFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={this.toggleFilter}
            />
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white/5 rounded-lg overflow-hidden group hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => this.handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xl font-bold">
                      ${product.price}
                    </span>
                    <button 
                      onClick={(e) => this.handleAddToCart(e, product)}
                      className="bg-transparent border-2 border-[#ECE81A] text-[#ECE81A] px-4 py-1.5 rounded-lg font-medium hover:bg-[#ECE81A] hover:text-black transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <p className="text-xl mb-2">No products found</p>
              <p className="text-sm">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Product Modal */}
        <ProductModal 
          product={this.state.selectedProduct}
          onClose={this.handleCloseModal}
        />
      </div>
      </>
    );
  }
}

// Export the wrapper component instead of the class
export default ProductsWrapper; 