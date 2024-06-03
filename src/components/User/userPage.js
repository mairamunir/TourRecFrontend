import { Box, Button,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import backgroundImage from "../../image4.jpg"
import DashBoard from '../dashBoard';
const UserPage = () => {
const navigate= useNavigate();




  return (
    // <Box>
      
    // <Box  sx={{
    //     backgroundImage: `url(${backgroundImage})`, // Apply the background image
    //     backgroundSize: 'cover', // Cover the container horizontally
    //     backgroundPosition: 'center', // Center the background image horizontally
    //     minHeight: '50vh', // Ensure the container covers the entire viewport vertically
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    // </Box>
    // <Typography variant="h6" sx={{ marginLeft: 2,fontWeight: 'bold'}}>PLAN YOUR NEXT ADVENTURE WITH US!</Typography>
    // </Box>
    <Box>
      <DashBoard/>
      
    </Box>


  );
};

export default UserPage;