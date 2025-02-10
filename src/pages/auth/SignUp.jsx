import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';
import Title from '../../Title'
import { apiCall } from '../../Functions/Axios';
import { ImSpinner9 } from "react-icons/im";
import Card from '../../Components/ui/Card';
import Button from '../../Components/ui/Button';

const Signup = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);


  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = 'auth/register'
    let body = formData;
    let method = 'post';
    let loadingState = setIsLoading
    const onSuccess = (data) => {
      window.location.href = '/'
    }
    const onError = (error) => {
      console.log(error)
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    apiCall(url, body, method, loadingState, onSuccess, onError)
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side with Welcome Content */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold text-main mb-4">Welcome to <Title /></h1>
        <ReactTyped
          strings={[
            'Explore the mysteries of the cosmos with AI-powered insights.',
            'Dive into deep cosmological discussions on black holes, dark energy, and more.',
            'Sign in to unlock AI-generated notes and intelligent space-time explorations!'
          ]}

          typeSpeed={50}
          backSpeed={30}
          loop
          className="text-xl text-main"
        />
        <p className="mt-6 ">
          Create your account and dive into exciting discussions with AI. We're thrilled to have you!
        </p>
      </div>

      {/* Right Side with Sign-up Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <Card extraClassName='w-full max-w-md'>
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-semibold text-center text-main mb-6">Sign Up</h2>

            {/* Sign-up Form */}
            <form onSubmit={handleSubmit}>
              {/* First Name Input */}
              <div className='flex space-x-2'>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-main">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-4 py-2 mt-2 border text-sm focus:outline-none focus:ring-main"
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-main">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-4 py-2 mt-2 border text-sm focus:outline-none focus:ring-main"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-main">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-4 py-2 mt-2 border text-sm focus:outline-none focus:ring-main"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-main">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-4 py-2 mt-2 border text-sm focus:outline-none focus:ring-main"
                  placeholder="Enter your password"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-main">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-4 py-2 mt-2 border text-sm focus:outline-none focus:ring-main"
                  placeholder="Confirm your password"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <Button
                  type="submit"
                  extraClassName="w-full"
                >
                  {
                    isLoading ? (
                      <ImSpinner9 className="animate-spin text-white text-2xl" />
                    ) : (
                      <span>Sign Up</span>
                    )
                  }
                </Button>
              </div>
            </form>

            {/* Already have an account */}
            <div className="text-center">
              <p className="text-sm ">
                Already have an account?
                <a href="/signin" className="text-main font-bold hover:underline ml-1">Sign In</a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
