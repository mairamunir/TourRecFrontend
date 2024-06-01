import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComp from './Card';
import { useNavigate } from 'react-router-dom';


const UserPage = () => {
  const [cities, setCities] = useState([]);
  const token = useSelector((state) => state.user.token);
const navigate = useNavigate();

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/city/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.data) {
        setCities(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

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