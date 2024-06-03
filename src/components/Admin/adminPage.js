import { Button,Box,ButtonGroup,Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../navBar";
import DashBoard from "../dashBoard";
import { useSelector } from "react-redux";
import { MarginTwoTone } from "@mui/icons-material";
const AdminPage = () => {
const roles = useSelector((state)=>state.user.roles);
    const navigate=useNavigate();
    return (
<Box >  
    {/* <Typography variant="h5" sx={{ marginLeft: 2,fontWeight: 'bold'}}>
        Welcome {roles.province ? `${roles.province} Admin` : 'Admin'}!
      </Typography>

<Button sx={{ backgroundColor: '#7AA59F', padding: '10px', textAlign: 'center', float: "right" , marginBottom: 20}}>Admin Actions</Button> */}
 <Box sx={{ marginBottom: 2}}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#015656' }}>
          Welcome {roles.province ? `${roles.province} Admin` : 'Admin'}!
        </Typography>
        <Button 
          onClick={() => navigate('/adminActions')} 
          sx={{ 
            backgroundColor: '#7AA59F', 
            color: '#fff', 
            padding: '10px 20px', 
            textAlign: 'center',
            '&:hover': {
              backgroundColor: '#5e8c82'
            },
            marginBottom: 2,
            
          }}
          variant="contained"
        >
          Admin Actions
        </Button>
      </Box>
   <DashBoard/>

 

    {/* <Box  sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        paddingTop: '10vh',
      }}
    >
        <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 4 }}>Admin Functions</Typography>
    <Paper  elevation={4} 
        sx={{
          p: 3, // padding
          width: '80%',  
          maxWidth: '400px', 
          textAlign: 'center', 
          backgroundColor: '#E9F3F2',
        }}>
    
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

<Button variant="contained" sx={{backgroundColor : '#7AA59F', marginBottom: 2,  width: '100%','&:hover':{
        backgroundColor : '#02564E',
      }}} onClick={()=>navigate('/addHotel')}>Add Hotel</Button>

    
    </Paper>
  </Box> */}

  </Box>  
    )
}

export default AdminPage;