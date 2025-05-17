import React, { useState } from 'react';
import { Alert, Spinner, TextInput, Label } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Header from "../components/Header";
import gymImage from '../assets/memberShipCover2.jpg'; // Matching SignIn background

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${gymImage})` }}
    >
      <Header />

      <div className="flex items-start justify-end py-6 px-16 pb-20">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-2xl font-bold text-gray-800 mb-1">
            BM <span className="text-black">FITNESS WORLD</span>
          </div>
          <p className="text-sm text-gray-600 mb-6">Shape your dreams</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-black">Sign Up</h3>
            <div>
              <Label value='Username' className="text-black" />
              <TextInput
                type='text'
                placeholder='Enter your username'
                id='username'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value='Email' className="text-black" />
              <TextInput
                type='email'
                placeholder='Enter your email'
                id='email'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label value='Password' className="text-black" />
              <TextInput
                type='password'
                placeholder='••••••'
                id='password'
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </button>

            <OAuth />
          </form>

          <div className="mt-4 text-sm text-gray-700">
            Already have an account? <Link to="/sign-in" className="underline">Sign in</Link>
          </div>

          {errorMessage && (
            <Alert className='mt-4' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
