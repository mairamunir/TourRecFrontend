import React, { useState } from 'react';
import { Box, Button, Typography,Paper } from '@mui/material';
import Login from './login';
import SignUp from './signup';
import ButtonAppBar from '../User/ButtonAppBar';
import { useNavigate } from 'react-router-dom';
const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false); // State to toggle between login and signup forms
const navigate=useNavigate();

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
    
    <Box mb={2}>
    <Button 
  variant={showLogin ? 'outlined' : 'contained'} 
  color="primary" 
  onClick={handleSignupClick} 
  sx={{ 
    backgroundColor: showLogin ? 'transparent' : '#7AA59F', 
    color: showLogin ? '#7AA59F' : 'white', 
    borderColor: '#7AA59F', 
  }}
> Sign Up
        </Button>
        
        <Button variant={showLogin ? 'contained' : 'outlined'} color="primary" onClick={handleLoginClick} sx={{   backgroundColor: showLogin ? '#7AA59F' : 'transparent', 
    color: showLogin ? 'white' : '#7AA59F', 
    borderColor: '#7AA59F',
    ml: 2}}>
          Login
        </Button>
      </Box>



     <Paper
        elevation={4} 
        sx={{
          p: 3, // padding
          width: '80%', // width
          maxWidth: '25%', // maximum width
          textAlign: 'center', // Center content horizontally
          backgroundColor: '#E9F3F2',
        }}>
      {showLogin ? <Login /> : <SignUp />}
      
      </Paper>
      
    </Box>
  );
};

export default AuthPage;

