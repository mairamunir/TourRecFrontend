import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/user.reducer';

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Adjust the path to your login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutComponent;
