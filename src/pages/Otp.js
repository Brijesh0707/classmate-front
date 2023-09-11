import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoginContexts } from '../context/LoginContext';

const Otp = () => {
  const { setUserLogin } = useContext(LoginContexts);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    try {
      setIsVerifying(true);

      const response = await fetch('https://classmate-server.onrender.com/otp/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: id, otp }),
      });
      console.log({ email: id, otp });

      if (response.status === 201) {
        console.log('Email verification successful');
        alert('Email verification successful!');
        const data = await response.json();
        localStorage.setItem('User', JSON.stringify(data));
        const userData = JSON.parse(localStorage.getItem('User'));
        setUserLogin(true);
        if (userData && userData.branch) {
          if (userData.branch === 'bca') {
            navigate('/home-bca');
          } else if (userData.branch === 'btech') {
            navigate('/home-btech');
          }
        }
      } else {
        const data = await response.json();
        console.error('OTP verification failed:', data.message);
        alert('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('An error occurred during OTP verification. Please try again later.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className='bg-black text-white min-h-screen flex items-center justify-center'>
      <div className='bg-opacity-70 border-1 border-sky-500 p-8 rounded-lg'>
        <h1 className='text-3xl font-bold text-center mb-4'>Email Verification</h1>
        <p className='text-lg text-center mb-4'>
          An OTP has been sent to your email address. Please enter it below to verify your email.
        </p>
        <div className='flex items-center justify-center mb-4'>
          <input
            className='bg-transparent border-b-2 border-sky-500 text-white w-[120px] text-center py-2 px-2 text-lg focus:outline-none focus:border-blue-500'
            type='text'
            placeholder='Enter OTP'
            maxLength='6'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className='text-center'>
          <button
            className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none ${isVerifying ? 'cursor-not-allowed opacity-50' : ''}`}
            type='button'
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <svg
                className='animate-spin h-5 w-5 mr-3'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 8.962 0 014.157 11H0v2h4a9.956 9.956 0 012-1.709V17z'
                ></path>
              </svg>
            ) : (
              'Verify'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
