import React, { useState } from 'react';
import { Box, Button, Typography,Paper } from '@mui/material';
import Login from './login';
import SignUp from './signup';
import ButtonAppBar from './ButtonAppBar';

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
    {/* <Typography variant="h4" mb={4}>
      Welcome to Pakistan Tourism!!
    </Typography> */}
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



// import React, { useState } from 'react';
// import { Box, Typography ,CssBaseline,Container} from '@mui/material';
// import Login from './login'
// import SignUp from './signup';
// import Header from './Header';
// // import Container from '@mui/material/CssBaseline';
// // import CssBaseline from '@mui/material/Container';

// const AuthPage = () => {
//   const [showLogin, setShowLogin] = useState(false); // State to toggle between login and signup forms

//   const handleLoginClick = () => {
//     setShowLogin(true);
//   };

//   const handleSignupClick = () => {
//     setShowLogin(false);
//   };

//   return (
//     <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
//       <Header
//         showLogin={showLogin}
//         handleLoginClick={handleLoginClick}
//         handleSignupClick={handleSignupClick}
//       />
// <React.Fragment>
//   <CssBaseline/>
//   <Container maxWidth="sm">
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Typography variant="h4" mb={9}>
//           Welcome to Pakistan Tourism!!
//         </Typography>
//         {showLogin ? <Login /> : <SignUp />}
//       </Box>

//       </Container>
//       </React.Fragment>
//     </Box>
    
//   );
// };

// export default AuthPage;
