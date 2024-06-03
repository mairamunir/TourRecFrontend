import ViewDetails from "../User/viewProfile";
import RegisterAdmin from "./registerAdmin";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import DashBoard from "../dashBoard";
const SuperAdminPage = () => {
    const navigate = useNavigate();
    return (
      <Box sx={{ marginBottom: 2}}>
         <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#015656' }}>
          Welcome SuperAdmin!
        </Typography>
        <Button 
          onClick={() => navigate('/registerAdmin')} 
          sx={{ 
            backgroundColor: '#7AA59F', 
            color: '#fff', 
            padding: '5px 10px', 
            textAlign: 'center',
            '&:hover': {
              backgroundColor: '#5e8c82'
            },
            marginBottom: 2,
            
          }}
          variant="contained"
        > Add Admin</Button>

<Button 
          onClick={() => navigate('/viewAllUsers')} 
          sx={{ 
            backgroundColor: '#7AA59F', 
            color: '#fff', 
            padding: '5px 10px', 
            textAlign: 'center',
            '&:hover': {
              backgroundColor: '#5e8c82'
            },
            marginBottom: 2, marginLeft: 2
            
          }}
          variant="contained"
        >View Users</Button>
        
       
       

<DashBoard/>
    </Box>
    )
}

export default SuperAdminPage;