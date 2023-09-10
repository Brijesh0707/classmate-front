import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

 
  const branch = localStorage.getItem('branch');

  useEffect(() => {
   
    if (branch) {
      if (branch === 'bca') {
        navigate('/home-bca');
      } else if (branch === 'btech') {
        navigate('/home-btech');
      } else {
        navigate('/');
      }
    }
  }, [branch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch('https://classmate-server.onrender.com/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Email sent successfully');
        alert('OTP has been sent to your email. Please check your spam folder.');
        setIsSubmitting(false);

        
        const data = await response.json();

     
        localStorage.setItem('branch', data.branch);

        navigate(`/otp/${formData.email}`);
      } else {
        const data = await response.json();
        console.error('Email sending failed:', data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error during email sending:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] flex items-center justify-center bg-black'>
      <div className='bg-opacity-70 border-solid border-2 border-sky-500 rounded-lg p-8'>
        <h1 className='text-white text-center text-2xl mb-4'>ClassMate Chats</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-white text-sm font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              className='bg-slate-800 rounded-lg w-full py-2 px-3 text-white focus:outline-none focus:border-blue-500'
              id='name'
              type='text'
              placeholder='Your Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-white text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <input
              className='bg-slate-800 rounded-lg w-full py-2 px-3 text-white focus:outline-none focus:border-blue-500'
              id='email'
              type='email'
              placeholder='Your Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='text-center'>
            <button
              className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none'
              type='submit'
              disabled={isSubmitting} 
            >
              Submit
            </button>
            <br />
            <p className='mt-3 text-white'>
              If you have no account
              <Link to='/register' className='text-blue-300'>
                Register Here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
