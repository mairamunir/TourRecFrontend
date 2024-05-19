import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Login from './login';
import SignUp from './signup';


const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false); // State to toggle between login and signup forms

  const handleLoginClick = () => {
    setShowLogin(true); 
  };

  const handleSignupClick = () => {
    setShowLogin(false); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    > 
   
    <Typography variant="h4" mb={9}>
      Welcome to Pakistan Tourism!!
    </Typography>
    
      <Box mb={2}>
        <Button variant={showLogin ? 'outlined' : 'contained'} color="primary" onClick={handleSignupClick}>
          Sign Up
        </Button>
        <Button variant={showLogin ? 'contained' : 'outlined'} color="primary" onClick={handleLoginClick} sx={{ ml: 2 }}>
          Login
        </Button>
      </Box>
      {showLogin ? <Login /> : <SignUp />}
    </Box>
  );
};

export default AuthPage;
