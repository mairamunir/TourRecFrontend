

 import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowBackIos, TableRestaurant } from '@mui/icons-material';
import { Box, Chip, Paper , Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
const ViewAllUsers = () => { 

    
    const [details, setDetails] = useState([]);
    const token = useSelector((state) => state.user.token);
const navigate= useNavigate();
    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3000/superAdmin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.data) {
                setDetails(response.data.data);
            } else {
                toast.error(response.data.msg || 'Error fetching users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users.');
        }
    };

   
    const deleteUser = async (email) => {
        try {
            const userToDelete = details.find(detail => detail.email === email);
            if (!userToDelete) {
                toast.error('User not found');
                return;
            }
            const userConfirmed = window.confirm(`Are you sure you want to delete the user with email: ${email}?`);
    if (!userConfirmed) {
        return;
    }
            const userId = userToDelete._id;
            
            const response = await axios.delete("http://localhost:3000/superAdmin/deleteUser", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    email: email
                }
            });
            if (response.status === 200) {
                toast.success('User deleted successfully');
                setDetails(details.filter(detail => detail._id !== userId));
            } else {
                toast.error(response.data.msg || 'Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user.');
        }
    };

    return (
        <Box  sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5
          }}
        >
            <Paper  elevation={4}
        sx={{
          p: 3,
          width: "80%",
          maxWidth: "50%",
          textAlign: "center",
          backgroundColor: "#E9F3F2",
          
        }}>

      
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <ArrowBackIos onClick={()=>navigate('/userPage')} sx={{cursor: 'pointer',float: "left", marginTop:2, marginLeft:2, marginBottom: 2 }}/>
    <Typography variant="body1" sx={{ marginLeft: 1 }}>Back to Home Page</Typography>
    </Box>

          
    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        USER DETAILS
      </Typography>
          <TableContainer component={Paper}> 
            {details.length > 0 ? (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Province</TableCell>
                                <TableCell>Admin</TableCell> 
                                <TableCell></TableCell>                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {details.map(detail => (
                            <TableRow key={detail.id}>
                                <TableCell>{detail.firstName}</TableCell>
                                <TableCell>{detail.lastName}</TableCell>
                                
                                <TableCell>{detail.email}</TableCell>
                                <TableCell>{detail.province}</TableCell>
                                <TableCell>{detail.admin ? detail.province : 'No'}</TableCell>
                                <TableCell>
                                <button onClick={() => deleteUser(detail.email)}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No details available.</p>
            )}
</TableContainer> 
</Paper>
</Box>   
    );
};

export default ViewAllUsers;