import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

const Register = () => {
  const naviagate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
  });

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
      const response = await fetch('https://classmate-server.onrender.com/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        alert('Registration successful');
        naviagate("/");
      } else {
        const data = await response.json();
        console.log('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
              className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none'
              type='submit'
            >
              Register
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
