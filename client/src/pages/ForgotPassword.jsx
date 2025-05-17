import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Cookies from 'js-cookie';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        Cookies.set('userEmail', email, { expires: 1 });
        navigate(`/otp-verify`, { state: { email } });
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="bg-[#1f1f1f] w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" value="Email" className="text-white" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
              color="gray"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Sending...</span>
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
          <div className="text-center">
            <Link to="/sign-in" className="text-sm text-gray-300 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </form>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
