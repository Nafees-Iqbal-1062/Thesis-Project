import { Alert, Spinner, TextInput, Label } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import Header from "../components/Header";
import gymImage from '../assets/memberShipCover2.jpg'; // Background image
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return dispatch(signInFailure(data.message || 'Sign-in failed.'));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message || 'Something went wrong'));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${gymImage})`,
      }}
    >
      <Header />

      <div className="flex items-start justify-end py-6 px-16 pb-20 ">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-2xl font-bold text-gray-800 mb-1">BM <span className="text-black">FITNESS WORLD</span></div>
          <p className="text-sm text-gray-600 mb-6">Shape your dreams</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-black">Log in</h3>
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
            <div className="flex items-center justify-between text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <input type="checkbox" defaultChecked />
                <span>Keep me logged in</span>
              </div>
              <Link to="/forgot-password" className="underline">Forgot password?</Link>
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
                'Log in'
              )}
            </button>

            <OAuth />
          </form>

          <div className="mt-4 text-sm text-gray-700">
            Don’t have an account? <Link to="/sign-up" className="underline">Register</Link>
          </div>

          {errorMessage && (
            <Alert className='mt-4' color='failure'>
              {typeof errorMessage === 'string' ? errorMessage : errorMessage.message || 'An error occurred'}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
