import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('https://classmate-server.onrender.com/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        alert('Registration successful');
        navigate('/');
      } else {
        const data = await response.json();
        console.log('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] flex items-center justify-center bg-black'>
      <div className='bg-opacity-70 border-solid border-2 border-sky-500 rounded-lg p-8'>
        <h1 className='text-white text-2xl mb-4 text-center'>ClassMate Chats</h1>
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
          <div className='mb-4'>
            <label className='block text-white text-sm font-bold mb-2' htmlFor='branch'>
              Branch
            </label>
            <select
              className='bg-slate-800 rounded-lg w-full py-2 px-3 text-white focus:outline-none focus:border-blue-500'
              id='branch'
              name='branch'
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value='' disabled>Select Branch</option>
              <option value='bca'>BCA</option>
              <option value='btech'>BTECH</option>
            </select>
          </div>
          <div className='text-center'>
            <button
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none ${isSubmitting ? 'cursor-not-allowed' : ''}`}
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
                'Register'
              )}
            </button>
            <br />
            <Link className='text-blue-300' to='/'>
              Login Here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
