import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white text-sm  sm:p-2 rounded-xl shadow"
    >
      Logout
    </button>
  );
};

export default Logout;
