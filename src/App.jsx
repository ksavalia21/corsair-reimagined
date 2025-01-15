import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "flowbite";
import LandingPage from "./components/LandingPage";
import TabSection from "./components/TabSection";
import WhyChooseUs from './components/WhyChooseUs';
import Tools from './components/Tools';
import Footer from './components/Footer';
import Products from './components/Products';
import { CartProvider } from './context/CartContext';
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import AccountSettings from './components/AccountSettings';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Navbar from './components/Navbar';

// Layout component to wrap protected routes
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
};

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Layout>
                    <Checkout />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route 
                path="/account" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AccountSettings />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Orders />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    );
  }
}

// Separate HomePage component to contain the landing page content
class HomePage extends Component {
  state = {
    activeTab: 'categories'
  };

  render() {
    return (
      <>
        <LandingPage />
        <TabSection />
        <WhyChooseUs />
        <Tools />
        <Footer />
      </>
    );
  }
}
