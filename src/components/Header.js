// src/components/Header.js

import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Header = ({ showLogin, handleLoginClick, handleSignupClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Pakistan Tourism
        </Typography>
        <Button
          variant={showLogin ? 'outlined' : 'contained'}
          color="inherit"
          onClick={handleSignupClick}
        >
          Sign Up
        </Button>
        <Button
          variant={showLogin ? 'contained' : 'outlined'}
          color="inherit"
          onClick={handleLoginClick}
          sx={{ ml: 2 }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
