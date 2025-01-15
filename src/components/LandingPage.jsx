import React, { Component } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <div className="relative min-h-screen">
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-90 z-0"
            style={{ backgroundImage: 'url("/hero.png")' }}
          ></div>

          <div className="relative z-10">
            <Navbar />
            <Hero />
          </div>
        </div>
      </>
    );
  }
}