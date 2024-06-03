import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const UserPage = () => {
const navigate= useNavigate();




  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h1>Welcome to your user dashboard!</h1>
        <p>This is where you can manage your tourism activities in Pakistan.</p>
       <button onClick={()=>navigate('/viewProfile')}>view profile</button>
      </div>
      
    </div>
  );
};

export default UserPage;