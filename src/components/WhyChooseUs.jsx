import React, { Component } from 'react';

export default class WhyChooseUs extends Component {
  render() {
    const features = [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        title: 'Lightning Fast',
        description: 'Ships free next business day'
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: 'Extended Returns',
        description: '60-day risk free return'
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        title: '24/7 Support',
        description: 'Round-the-clock technical support'
      }
    ];

    return (
      <div className="bg-black py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            {/* First Column - Text and Link */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Products?</h2>
              <p className="text-gray-400 mb-6">
                Experience gaming excellence with our premium products, backed by industry-leading support and warranty.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-[#ECE81A] hover:text-white transition-colors"
              >
                Learn More
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Feature Columns */}
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                {/* Icon Circle */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white group hover:border-[#ECE81A] transition-colors">
                    <div className="group-hover:text-[#ECE81A] transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                {/* Feature Text */}
                <div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
} 