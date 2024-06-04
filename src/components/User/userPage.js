import { Box, Button,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import backgroundImage from "../../image4.jpg"
import DashBoard from '../dashBoard';
const UserPage = () => {
const navigate= useNavigate();




  return (
    
    <Box>
      <DashBoard/>
      
    </Box>


  );
};

export default UserPage;