import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";
import UserMenu from './UserMenu';
import { useAuth } from '../context/AuthContext';

function NavbarWrapper(props) {
  const { cart } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  return <NavbarClass {...props} cart={cart} totalQuantity={totalQuantity} location={location} user={user} />;
}

class NavbarClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastScrollY: 0,
      isVisible: true,
      isCartOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 50; // Minimum scroll amount before hiding

    if (currentScrollY < this.state.lastScrollY) {
      // Scrolling up
      this.setState({ isVisible: true });
    } else if (currentScrollY > this.state.lastScrollY && currentScrollY > scrollThreshold) {
      // Scrolling down and past threshold
      this.setState({ isVisible: false });
    }

    this.setState({ lastScrollY: currentScrollY });
  };

  toggleCart = (e) => {
    if (e) e.stopPropagation();
    console.log('Toggle cart clicked, current state:', this.state.isCartOpen);
    this.setState(prevState => ({
      isCartOpen: !prevState.isCartOpen
    }), () => {
      console.log('Cart is now:', this.state.isCartOpen ? 'open' : 'closed');
    });
  };

  render() {
    const { cart, totalQuantity, location, user } = this.props;
    const isHomePage = location.pathname === '/';

    return (
      <>
        <nav
          className={`bg-transparent dark:bg-transparent fixed w-full z-20 top-0 start-0 transition-all duration-300 ${
            this.state.isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isHomePage ? "opacity-0 animate-fadeInDown" : ""}`}
          style={isHomePage ? { animationDelay: '0.1s' } : {}}
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className={`flex items-center space-x-3 rtl:space-x-reverse ${
                isHomePage ? "opacity-0 animate-fadeInDown" : ""
              }`}
              style={isHomePage ? { animationDelay: '0.3s' } : {}}
            >
              <img src="/c_logo.png" className="h-10" alt="Corsair Logo" />
              <img src="/c_name.png" className="h-12" alt="Corsair Logo" />
            </a>
            <div 
              className={`flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ${
                isHomePage ? "opacity-0 animate-fadeInDown" : ""
              }`}
              style={isHomePage ? { animationDelay: '0.5s' } : {}}
            >
              {user ? (
                <UserMenu />
              ) : (
                <Link
                  to="/signup"
                  className="text-white mr-6 border-2 border-white rounded-lg hover:bg-[#ECE81A] hover:text-black hover:border-[#ECE81A] transition-all font-medium text-sm px-4 py-2 text-center"
                >
                  SIGN UP
                </Link>
              )}
              <button
                onClick={this.toggleCart}
                className="text-white mr-4 relative group"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cart && totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ECE81A] text-black w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {totalQuantity}
                  </span>
                )}
              </button>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1 ${
                isHomePage ? "opacity-0 animate-fadeInDown" : ""
              }`}
              id="navbar-sticky"
              style={isHomePage ? { animationDelay: '0.7s' } : {}}
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li className="group relative">
                  <Link
                    to="/products"
                    className="text-white block py-2 px-3 rounded md:hover:bg-transparent relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#ECE81A] after:transition-all after:duration-300 md:p-0"
                  >
                    PRODUCTS
                  </Link>
                  <div className="absolute hidden group-hover:block w-[900px] left-1/2 transform -translate-x-1/2 pt-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            Peripherals
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Keyboards
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Mouse
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Headsets
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Monitors
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            Components
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                CPU Coolers
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Memory
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Power Supply
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                PC Cases
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <img
                            src="./public/nav/products.png"
                            alt="Featured Product"
                            className="rounded-lg mb-4 w-full h-32 object-cover"
                          />
                          <h3 className="text-gray-800 font-bold mb-2">
                            EXCLUSIVE GEAR FOR CALL OF DUTY: BLACK OPS 6
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Are you ready?
                          </p>
                          <a
                            href="#"
                            className="inline-block bg-[#ECE81A] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4cb19] transition-colors"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="group relative">
                  <Link
                    to="/cart"
                    className="text-white block py-2 px-3 rounded md:hover:bg-transparent relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#ECE81A] after:transition-all after:duration-300 md:p-0"
                  >
                    GUIDES
                  </Link>
                  <div className="absolute hidden group-hover:block w-[900px] left-1/2 transform -translate-x-1/2 pt-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            Guides & Articles
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                DIY Builder
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Gaming & Furniture
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            Software
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                iCUE Guides
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                iCUE Lighting Profiles
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <img
                            src="./public/nav/guides.png"
                            alt="Featured Guide"
                            className="rounded-lg mb-4 w-full h-32 object-cover"
                          />
                          <h3 className="text-gray-800 font-bold mb-2">
                            RS MAX PERFORMANCE FANS
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Everything you need to know
                          </p>
                          <a
                            href="#"
                            className="inline-block bg-[#ECE81A] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4cb19] transition-colors"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="group relative">
                  <a
                    href="#"
                    className="text-white block py-2 px-3 rounded md:hover:bg-transparent relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#ECE81A] after:transition-all after:duration-300 md:p-0"
                  >
                    BUSINESS
                  </a>
                  <div className="absolute hidden group-hover:block w-[900px] left-1/2 transform -translate-x-1/2 pt-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            Industries
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Architecture & Engineering
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Education
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Esports
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Government
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Design & Manufacturing
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            Business Solutions
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                High Performance Computing
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Video Conferencing
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Digital Workspace
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Esports
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Customs
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <img
                            src="./public/nav/business.png"
                            alt="Business Solutions"
                            className="rounded-lg mb-4 w-full h-32 object-cover"
                          />
                          <h3 className="text-gray-800 font-bold mb-2">
                            CORSAIR FOR BUSINESS
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Scale your business with our specialized hardware
                            solutions.
                          </p>
                          <a
                            href="#"
                            className="inline-block bg-[#ECE81A] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4cb19] transition-colors"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="group relative">
                  <a
                    href="#"
                    className="text-white block py-2 px-3 rounded md:hover:bg-transparent relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#ECE81A] after:transition-all after:duration-300 md:p-0"
                  >
                    SOFTWARE
                  </a>
                  <div className="absolute hidden group-hover:block w-[900px] left-1/2 transform -translate-x-1/2 pt-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            iCUE Software
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                About iCUE
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Download iCUE
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                iCUE Developers
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                iCUE Murals
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-bold mb-4">
                            Integrations
                          </h3>
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Nanoleaf
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Philips Hue
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                NVIDIA
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="text-gray-600 hover:text-[#ECE81A] transition-colors"
                              >
                                Govee
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <img
                            src="./public/nav/software.png"
                            alt="Software Feature"
                            className="rounded-lg mb-4 w-full h-32 object-cover"
                          />
                          <h3 className="text-gray-800 font-bold mb-2">
                            iCUE Software
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            Take control of your setup with our powerful iCUE
                            software.
                          </p>
                          <a
                            href="#"
                            className="inline-block bg-[#ECE81A] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4cb19] transition-colors"
                          >
                            Download Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-white block py-2 px-3 rounded md:hover:bg-transparent relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#ECE81A] after:transition-all after:duration-300 md:p-0"
                  >
                    SUPPORT
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div 
          className={`fixed inset-y-0 right-0 w-96 bg-[#1A1A1A] shadow-xl transform transition-transform duration-300 ease-in-out z-[60] ${
            this.state.isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Your Cart</h2>
              <button 
                onClick={this.toggleCart}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <Cart />
            </div>
          </div>
        </div>

        {this.state.isCartOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={this.toggleCart}
          />
        )}
      </>
    );
  }
}

export default NavbarWrapper;
