import React, { Component } from 'react';

export default class Tools extends Component {
  render() {
    const tools = [
      {
        name: 'CORSAIR BUILD KITS',
        description: 'Build your PC with our easy-to-use build kits',
        image: '/categories/tool1.jpeg',
        link: '#',
        tag: 'Essential',
        actionText: 'Access Kits'
      },
      {
        name: 'CORSAIR PC Builder',
        description: 'Custom build configuration tool',
        image: '/categories/tool2.png',
        link: '#',
        tag: 'Popular',
        actionText: 'Access Tool'
      },
      {
        name: 'SPECIAL OFFERS',
        description: 'Advanced performance monitoring',
        image: '/categories/tool3.jpeg',
        link: '#',
        tag: 'New',
        actionText: 'Explore Offers'
      }
    ];

    return (
      <div className="bg-black">
        <div className="container mx-auto mb-4 px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Essential Tools & Resources
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access our suite of powerful tools and resources
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-b from-white/5 to-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/15 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative mb-6 rounded-xl overflow-hidden aspect-video">
                  <img 
                    src={tool.image} 
                    alt={tool.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#ECE81A] text-black px-3 py-1 rounded-full text-sm font-medium">
                      {tool.tag}
                    </span>
                  </div>
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-gray-400 mb-6">{tool.description}</p>
                  
                  {/* Link */}
                  <a 
                    href={tool.link}
                    className="inline-flex items-center text-[#ECE81A] hover:text-white transition-colors group-hover:translate-x-2 duration-300"
                  >
                    {tool.actionText}
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>

                  {/* Decorative Corner */}
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#ECE81A]/10 rounded-tl-2xl transform rotate-45 group-hover:bg-[#ECE81A]/20 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
} 