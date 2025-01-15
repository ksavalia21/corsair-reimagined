import React, { Component } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUpWrapper(props) {
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  return <SignUpClass {...props} auth={{ signup, login }} navigate={navigate} />;
}

class SignUpClass extends Component {
  state = {
    isLogin: true,
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    error: null,
    successMessage: null,
    showPassword: false,
    showConfirmPassword: false
  };

  // Add message timeout cleanup
  componentWillUnmount() {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }

  // Method to handle message dismissal
  setTemporaryMessage = (message, type = 'success') => {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.setState({
      [type === 'success' ? 'successMessage' : 'error']: message
    });

    this.messageTimeout = setTimeout(() => {
      this.setState({
        [type === 'success' ? 'successMessage' : 'error']: null
      });
    }, 5000);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name, isLogin } = this.state;
    const { auth, navigate } = this.props;

    try {
      if (isLogin) {
        await auth.login(email, password);
        navigate('/');
      } else {
        if (password !== confirmPassword) {
          this.setTemporaryMessage("Passwords don't match", 'error');
          return;
        }
        await auth.signup(email, password, name);
        this.setTemporaryMessage("Account created successfully! Please log in.", 'success');
        this.setState({
          isLogin: true,
          email: '',
          password: '',
          confirmPassword: '',
          name: ''
        });
      }
    } catch (error) {
      this.setTemporaryMessage(
        error.message.includes('auth/') ? 'Invalid email or password' : error.message,
        'error'
      );
    }
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin,
      error: null,
      successMessage: null,
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    }));
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null
    });
  };

  togglePasswordVisibility = (field) => {
    this.setState(prevState => ({
      [field]: !prevState[field]
    }));
  };

  render() {
    const { isLogin, error, successMessage } = this.state;

    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/c_logo.png" className="h-12" alt="Corsair Logo" />
          </div>

          {/* Toggle Tabs - Added gap-4 for spacing */}
          <div className="flex gap-4 px-4">
            <button
              onClick={() => this.setState({ isLogin: true })}
              className={`flex-1 py-3 text-center rounded-lg transition-all ${
                isLogin 
                  ? 'bg-[#ECE81A] text-black font-medium' 
                  : 'bg-[#1A1A1A] text-white hover:text-[#ECE81A]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => this.setState({ isLogin: false })}
              className={`flex-1 py-3 text-center rounded-lg transition-all ${
                !isLogin 
                  ? 'bg-[#ECE81A] text-black font-medium' 
                  : 'bg-[#1A1A1A] text-white hover:text-[#ECE81A]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Main Form Container - Added min-h-[500px] for consistent height */}
          <div className="bg-[#1A1A1A] p-8 rounded-xl min-h-[500px] transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-gray-400">
                {isLogin 
                  ? 'Sign in to access your account' 
                  : 'Join us to start shopping'}
              </p>
            </div>

            {/* Messages */}
            <div className="min-h-[60px]"> {/* Added fixed height for messages */}
              {successMessage && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg mb-6">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={this.handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="animate-fadeIn"> {/* Added animation */}
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    onChange={this.handleInputChange}
                    className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  required
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => this.togglePasswordVisibility('showPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {this.state.showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={this.state.confirmPassword}
                    onChange={this.handleInputChange}
                    className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-[#ECE81A] focus:border-transparent transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#ECE81A] text-black py-3 rounded-lg font-medium hover:bg-[#d4cb19] transition-colors"
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpWrapper; 