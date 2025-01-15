import React, { Component } from 'react';
import Categories from './Categories';
import FeaturedProducts from './FeaturedProducts';

export default class TabSection extends Component {
  state = {
    activeTab: 'categories'
  };

  render() {
    return (
      <div className="bg-black">
        <div className="container mx-auto px-4 pt-16">
          <div className="flex items-center justify-center space-x-8 mb-12">
            <button 
              onClick={() => this.setState({ activeTab: 'categories' })}
              className={`text-xl font-bold pb-2 border-b-2 transition-all ${
                this.state.activeTab === 'categories' 
                  ? 'border-[#ECE81A] text-white' 
                  : 'border-transparent text-gray-400 hover:text-white hover:border-[#ECE81A]'
              }`}
            >
              PRODUCT CATEGORIES
            </button>
            <button 
              onClick={() => this.setState({ activeTab: 'featured' })}
              className={`text-xl font-bold pb-2 border-b-2 transition-all ${
                this.state.activeTab === 'featured' 
                  ? 'border-[#ECE81A] text-white' 
                  : 'border-transparent text-gray-400 hover:text-white hover:border-[#ECE81A]'
              }`}
            >
              FEATURED PRODUCTS
            </button>
          </div>

          {this.state.activeTab === 'categories' ? <Categories /> : <FeaturedProducts />}
        </div>
      </div>
    );
  }
}
