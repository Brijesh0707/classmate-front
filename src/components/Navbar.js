import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ login }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [branch, setBranch] = useState(localStorage.getItem('branch'));

  useEffect(() => {
    setBranch(localStorage.getItem('branch'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('branch');
    window.location.reload();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">ClassMate Chats</h1>
        <div className="hidden md:flex space-x-4 no-underline">
          {login ? (
            <>
              <Link to="/about" className="text-white no-underline">
                About us
              </Link>
              <button
                className="text-white no-underline bg-red-600 w-[70px] h-[30px] pt-1 text-center"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (<>
            <Link
              to="/"
              className="text-white no-underline bg-red-600 w-[70px] h-[30px] pt-1 text-center"
            >
              Login
            </Link>
            <Link to="/about" className="text-white no-underline">
                About us
              </Link>
              </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Open Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden text-center py-4">
          {login ? (
            <>
              <Link to="/about" className="text-white no-underline">
                About us
              </Link>
              <button
                className="text-white no-underline bg-red-600 w-[70px] h-[30px] pt-1 text-center"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (<>
            <Link to="/" className="block text-white py-2 no-underline">
              Login
            </Link>
            <Link to="/about" className="text-white no-underline">
                About us
              </Link>
              </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
