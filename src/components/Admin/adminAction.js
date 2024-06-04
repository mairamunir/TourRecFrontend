import { Button,Box,ButtonGroup,Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
const AdminActions = () => {

    const navigate=useNavigate();
    return (
<Box >  

    <Box  sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        paddingTop: '10vh',
      }}
    >
        
    <Paper  elevation={4} 
        sx={{
          p: 3, // padding
          width: '80%',  
          maxWidth: '400px', 
          textAlign: 'center', 
          backgroundColor: '#E9F3F2',
        }}>

    
<ArrowBackIos onClick={()=>navigate('/adminPage')} sx={{cursor: 'pointer',float: "left" }}/>
<Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 4 }}>Admin Actions</Typography>
      <Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2,  width: '100%','&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addLandmark')}>Add Landmark</Button>

      <Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2, width: '100%', '&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addCity')}>Add City</Button>

      <Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2,  width: '100%','&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addGuide')}>Add Guide</Button>

      <Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2, width: '100%', '&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addTransport')}>Add Transport</Button>

<Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2, width: '100%', '&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addRestaurant')}>Add Restaurant</Button>

<Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2, width: '100%', '&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addActivity')}>Add Activity</Button>

<Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2,  width: '100%','&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addHotel')}>Add Hotel</Button>

    
    </Paper>
  </Box>

  </Box>  
    )
}

export default AdminActions;