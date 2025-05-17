import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Cookies from 'js-cookie';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMessage('Password field is required');
      return;
    }
    setLoading(true);
    const userEmail = Cookies.get('userEmail');
    try {
      const res = await fetch('/api/auth/resetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, userEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message);
        navigate('/sign-in');
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
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="bg-[#1f1f1f] w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="password" value="Password" className="text-white" />
            <TextInput
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
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
                <span className="pl-3">Resetting...</span>
              </>
            ) : (
              'Reset Password'
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
        {successMessage && (
          <Alert className="mt-5" color="success">
            {successMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
