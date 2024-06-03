import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Typography, CardContent, Card, Box, Avatar } from '@mui/material';
import { ArrowBackIos } from "@mui/icons-material";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(firstName, lastName) {
  const fullName = `${firstName} ${lastName}`;
  return {
    sx: {
      bgcolor: "#C5AA97",
      width: 56,
      height: 56,
      fontSize: 24,
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}

const ViewDetails = () => {
  const [details, setDetails] = useState({});
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.post("http://localhost:3000/profile/viewProfile", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data) {
        setDetails(response.data.data);
      } else {
        toast.error(response.data.msg || 'Error fetching details');
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      toast.error('Error fetching details.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 4 ,backgroundColor:'#C0D8DA' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          {details.firstName && details.lastName && (
            <Avatar {...stringAvatar(details.firstName, details.lastName)} />
          )}
        </Box>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#015656', textAlign: 'center' }}>
            MY PROFILE!
          </Typography>
          {details.firstName ? (
            <>
              <Typography sx={{ color: '#015656' }} variant="body1">
                <strong>First Name:</strong> {details.firstName}
              </Typography>
              <Typography sx={{ color: '#015656' }} variant="body1">
                <strong>Last Name:</strong> {details.lastName}
              </Typography>
              <Typography sx={{ color: '#015656' }} variant="body1">
                <strong>Email:</strong> {details.email}
              </Typography>
              <Typography sx={{ color: '#015656' }} variant="body1">
                <strong>Province:</strong> {details.province}
              </Typography>
            </>
          ) : (
            <Typography sx={{ color: '#015656' }} variant="body2" color="textSecondary">
              No details available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewDetails;



// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import CardComponent from './CardUniversal';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Typography, CardContent,Card, Box } from '@mui/material';
// const ViewDetails = () => {
//     const [details, setDetails] = useState([]);
//     const token = useSelector((state) => state.user.token);
//     //console.log(token)
//     useEffect(() => {
//         fetchDetails();
//     }, []);

//     const fetchDetails = async () => {
//         try {
//             const response = await axios.post("http://localhost:3000/profile/viewProfile",null, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (response.data.data) {
//                 setDetails(response.data.data);
//                 console.log(response.data.data);
//             } else {
//                 toast.error(response.data.msg || 'Error fetching details');
//             }
//         } catch (error) {
//             console.error('Error fetching details:', error);
//             toast.error('Error fetching details.');
//         }
//     };
   
//     console.log(details.email);



//     return (
    
//     <Box  sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100vh',
//             backgroundColor: '#f0f4f8',
//           }}>
            
//     <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
//     <Card style={{ maxWidth: 400 }}>
//         <CardContent>
//         <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#015656' }}>
//           MY PROFILE!
//         </Typography>
//             {details.firstName ? (
//                 <>
//                     <Typography sx={{color: '#015656'}} variant="body1">
//                         <strong>First Name:</strong> {details.firstName}
//                     </Typography>
//                     <Typography sx={{color: '#015656'}} variant="body1">
//                         <strong>Last Name:</strong> {details.lastName}
//                     </Typography>
//                     <Typography sx={{color: '#015656'}} variant="body1">
//                         <strong>Email:</strong> {details.email}
//                     </Typography>
//                     <Typography sx={{color: '#015656'}} variant="body1">
//                         <strong>Province:</strong> {details.province}
//                     </Typography>
//                 </>
//             ) : (
//                 <Typography sx={{color: '#015656'}} variant="body2" color="textSecondary">
//                     No details available.
//                 </Typography>
//             )}
//          </CardContent>
//          </Card>
//         </div>
//         </Box>


//         );
//     };
    



// export default ViewDetails;