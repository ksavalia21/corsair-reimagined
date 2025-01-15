import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Categories extends Component {
  render() {
    const categories = [
      {
        title: 'Gaming Keyboards',
        description: 'Professional grade mechanical keyboards',
        image: '/categories/keyboard.png'
      },
      {
        title: 'Gaming Mice',
        description: 'Precision engineered for victory',
        image: '/categories/mouse.webp'
      },
      {
        title: 'Headsets',
        description: 'Immersive audio experience',
        image: '/categories/headset.jpeg'
      },
      {
        title: 'Cooling',
        description: 'Advanced thermal solutions',
        image: '/categories/cooler.png'
      },
      {
        title: 'Memory',
        description: 'High-performance RAM modules',
        image: '/categories/memory.webp'
      },
      {
        title: 'Power Supply',
        description: 'Reliable and efficient power delivery',
        image: '/categories/psu.png'
      },
      {
        title: 'PC Cases',
        description: 'Stylish and functional enclosures',
        image: '/categories/case.jpeg'
      },
      {
        title: 'Gaming Monitors',
        description: 'Ultra-smooth high refresh displays',
        image: '/categories/monitor.avif'
      }
    ];

    const duplicatedCategories = [...categories, ...categories];

    return (
      <div className="relative overflow-hidden h-[500px] flex items-center">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10"></div>

        {/* Manual Scroll Container */}
        <div className="relative overflow-x-auto no-scrollbar">
          {/* Auto-scrolling Container */}
          <div className="flex animate-scroll-fast hover:pause">
            {duplicatedCategories.map((category, index) => (
              <Link 
                key={index}
                to="/products" 
                state={{ selectedCategory: category.title }}
                className="flex-none w-[400px] h-[400px] mx-4 group cursor-pointer"
              >
                <div className="relative h-full overflow-hidden rounded-2xl transition-transform duration-300 transform group-hover:scale-105">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                      <p className="text-gray-200 mb-4 line-clamp-2">{category.description}</p>
                      <span className="inline-flex items-center text-[#ECE81A] hover:text-white transition-colors">
                        View Products
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
