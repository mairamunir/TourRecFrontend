import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx = {{backgroundColor : '#7AA59F'}}>
        <Toolbar>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign:'center', color: "white", fontWeight: "bold"}}>
            Pakistan Tourism
          </Typography>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
