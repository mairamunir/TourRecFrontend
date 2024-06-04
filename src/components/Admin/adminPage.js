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
</Box>  
    )
}

export default AdminPage;