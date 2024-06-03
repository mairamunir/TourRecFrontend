import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './User/dropDown';

const NavigationBar = () => {
const navigate = useNavigate();



  return (
    <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/hotel')}>Hotels</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/restaurant')}>Restaurants</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/transport')}>Transports</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/activity')}>Activities</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/landmark')}>Landmarks</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/city')}>Cities</button>
      <button style={{ marginRight: '10px' }} onClick={() => navigate('/guide')}>Guides</button>
      <div style={{ float: 'right', marginRight: '10px', fontSize: '15px', padding: '5px 15px' }} >
      <DropdownMenu />
      </div>
    </div>
  );
};

export default NavigationBar;
