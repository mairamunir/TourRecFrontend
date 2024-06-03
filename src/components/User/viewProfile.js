import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Typography, CardContent,Card } from '@mui/material';
const ViewDetails = () => {
    const [details, setDetails] = useState([]);
    const token = useSelector((state) => state.user.token);
    //console.log(token)
    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.post("http://localhost:3000/profile/viewProfile",null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.data) {
                setDetails(response.data.data);
                console.log(response.data.data);
            } else {
                toast.error(response.data.msg || 'Error fetching details');
            }
        } catch (error) {
            console.error('Error fetching details:', error);
            toast.error('Error fetching details.');
        }
    };
   
    console.log(details.email);



    return (
      
    //     <div>
    //     <h1>User Details</h1>
       
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>First Name</th>
    //                     <th>lastName</th>
    //                     <th>Email</th>
                       
    //                     <th>Province</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {
    //                     <tr key={details._id}>
    //                         <td>{details.firstName}</td>
    //                         <td>{details.lastName}</td>
    //                         <td>{details.email}</td>
    //                         <td>{details.province}</td>
    //                     </tr>
    //                 }
    //             </tbody>
    //         </table>
       
    // </div>
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
    <Card style={{ maxWidth: 400 }}>
        <CardContent>
            {/* <Typography variant="h5" component="div" gutterBottom>
                User Details
            </Typography> */}
            {details.firstName ? (
                <>
                    <Typography variant="body1">
                        <strong>First Name:</strong> {details.firstName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Last Name:</strong> {details.lastName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {details.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Province:</strong> {details.province}
                    </Typography>
                </>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No details available.
                </Typography>
            )}
        </CardContent>
    </Card>
</div>
        );
    };
    



export default ViewDetails;