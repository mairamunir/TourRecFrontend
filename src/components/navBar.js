import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user.reducer';

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth'); 
  };

  return (
    <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/hotel')}>Hotels</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/restaurant')}>Restaurants</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/transport')}>Transports</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/activity')}>Activities</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/landmark')}>Landmarks</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/city')}>Cities</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/guide')}>Guides</button>
      <button style={{ float: 'right', marginRight: '10px', fontSize: '15px', padding: '5px 15px' }} onClick={handleLogout}>Log Out</button>
      <button onClick={()=> navigate('/user')}>User Page</button>
    </div>
  );
};

export default NavigationBar;