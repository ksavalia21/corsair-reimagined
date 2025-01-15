import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Hero extends Component {
  render() {
    return (
      <>
        <div className="hero w-full min-h-screen flex flex-wrap items-center justify-center relative">
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          
          <section className="relative z-10 w-full h-screen flex items-end">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h1 className="mb-4 text-4xl font-semibold tracking-tight leading-none text-white md:text-5xl lg:text-6xl opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                ARE YOU 50 SERIES READY?
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-100 lg:text-xl sm:px-16 lg:px-48 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                Discover our expertly crafted range of gaming PC components. From high-performance keyboards and precision mice to advanced coolers,
                elevate your gaming setup with cutting-edge technology, exclusive deals, and fast delivery.
              </p>
              
              {/* Featured Categories */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
                <Link
                  to="/products"
                  className="inline-flex justify-center items-center py-3 px-8 text-base font-medium text-center text-black rounded-lg bg-[#ECE81A] hover:bg-[#d4cb19] transition-all"
                >
                  Shop Now
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
                <a
                  href="#trending"
                  className="py-3 px-8 sm:ms-4 text-base font-medium text-white border-2 border-white rounded-lg hover:bg-[#ECE81A] hover:text-black hover:border-[#ECE81A] transition-all"
                >
                  View Trending
                </a>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}
