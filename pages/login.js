import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter()

  const login = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        const { token } = result;
        localStorage.setItem('token', token); // Store token in localStorage
        toast.success('Login successful');
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}`); // Redirect to the host after successful login
        }, 1000);
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while logging in');
    }
  };
  


  const generateOTP = async () => {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sent: true }),
      });
      const result = await response.json();
      if (response.ok) {
        setOtpSent(true);
        toast.success('OTP sent to your email');
      } else {
        toast.error(result.message || 'OTP generation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while generating OTP');
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsOtpVerified(true);
        toast.success('OTP verified successfully');
      } else {
        setIsOtpVerified(false);
        toast.error(result.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while verifying OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
            {isOtpVerified && (
              <div className="flex justify-between space-x-2">
                <button
                  type="button"
                  onClick={login}
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Login
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={generateOTP}
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
            >
              {otpSent ? 'Resend OTP' : 'Generate OTP'}
            </button>
            <button
              type="button"
              onClick={verifyOTP}
              className="w-full px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
