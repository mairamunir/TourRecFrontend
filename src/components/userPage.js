import React from 'react';

import { useNavigate } from 'react-router-dom';


const UserPage = () => {

const navigate = useNavigate();



  return (
    <div>
      <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
        <div >
          <button style={{ marginRight: '10px' }}>Hotels</button>
          <button style={{ marginRight: '10px' }}>Restaurants</button>

          <button style={{ marginRight: '10px' }} onClick={()=>navigate('/transport')}>Transports</button>

          <button style={{ marginRight: '10px' }}>Activities</button>
          <button style={{ marginRight: '10px' }}>Landmarks</button>
          <button style={{ marginRight: '10px' }} onClick={() => navigate('/city')}>Cities</button>
          <button>Guides</button>
          <button style={{ float : 'right', marginRight:'10px' ,fontSize: '15px', padding: '5px 15px' }} onClick={()=>navigate('/auth')}>Log Out</button>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h1>Welcome to your user dashboard!</h1>
        <p>This is where you can manage your tourism activities in Pakistan.</p>

      </div>
    </div>
  );
};

export default UserPage;