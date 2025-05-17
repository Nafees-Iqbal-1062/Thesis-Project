import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Cookies from 'js-cookie';

const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userEmail = Cookies.get('userEmail');
      const requestBody = {
        otp: otp,
        userEmail: userEmail,
      };

      const res = await fetch('/api/auth/otpverification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        navigate(`/reset-password`);
      } else {
        const data = await res.json();
        setErrorMessage(data.status);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setOTP(e.target.value.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
      <div className="bg-[#1f1f1f] w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">OTP Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="otp" value="OTP" className="text-white" />
            <TextInput
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
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
                <span className="pl-3">Verifying...</span>
              </>
            ) : (
              'Verify OTP'
            )}
          </Button>
          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-gray-300 hover:underline">
              Back to Forgot Password
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

export default OTPVerification;
