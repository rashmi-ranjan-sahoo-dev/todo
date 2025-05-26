import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Remove token (or any user data)
    localStorage.removeItem('token');

    // ✅ Optionally clear everything:
    // localStorage.clear();

    // ✅ Redirect to signin page
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white p-2 rounded-xl shadow"
    >
      Logout
    </button>
  );
};

export default Logout;
